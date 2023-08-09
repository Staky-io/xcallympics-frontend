import { formatEther } from 'ethers'
import { useState, useEffect, useContext } from 'react'
import { Button, Dropdown, Text } from '~/components/common'
import { getBTPAddress } from '~/helpers'
import { ADDRESSES, NETWORKS } from '~/helpers/constants'
import { useContract, useXCallFee } from '~/hooks/contracts'
import { UserStoreContext } from '~/stores/User'
import { BTPId, ChainId } from '~/types'
import { NFTBridge, XCallympicsNFT } from '~/types/abi'

type NFTControlsProps = {
    selectedNFT: bigint;
}

export default function NFTControls(props: NFTControlsProps) {
    const { selectedNFT } = props
    const { userState, switchChain, connectWallet } = useContext(UserStoreContext)

    const [destionationChain, setDestionationChain] = useState<BTPId>('' as BTPId)
    const [destinationChainId, setDestinationChainId] = useState<bigint>(BigInt(0))
    const [gasFee, setGasFee] = useState<bigint>(BigInt(0))
    const [originChain, setOriginChain] = useState<bigint>(BigInt(0))
    const [isTokenApproved, setIsTokenApproved] = useState<boolean>(false)

    const NFTBridgeContract = useContract('NFTBridge') as NFTBridge
    const XCallympicsNFTContract = useContract('XCallympicsNFT') as XCallympicsNFT
    const xcallFee = useXCallFee({ destionationChain, destinationChainId })

    const changeOriginChain = (ChainID: bigint) => {
        switch (ChainID) {
            case BigInt(ChainId.BSC_TESTNET):
                setDestionationChain(BTPId.ETH_SEPOLIA)
                setDestinationChainId(BigInt(ChainId.ETH_SEPOLIA))
                switchChain(BigInt(ChainId.BSC_TESTNET))
                setOriginChain(BigInt(ChainId.BSC_TESTNET))
                break
            case BigInt(ChainId.ETH_SEPOLIA):
                setDestionationChain(BTPId.BSC_TESTNET)
                setDestinationChainId(BigInt(ChainId.BSC_TESTNET))
                switchChain(BigInt(ChainId.ETH_SEPOLIA))
                setOriginChain(BigInt(ChainId.ETH_SEPOLIA))
                break
        }
    }

    const changeDestinationChain = (btpId: BTPId) => {
        switch (btpId) {
            case BTPId.BSC_TESTNET:
                setDestionationChain(BTPId.BSC_TESTNET)
                setDestinationChainId(BigInt(ChainId.BSC_TESTNET))
                switchChain(BigInt(ChainId.ETH_SEPOLIA))
                setOriginChain(BigInt(ChainId.ETH_SEPOLIA))
                break
            case BTPId.ETH_SEPOLIA:
                setDestionationChain(BTPId.ETH_SEPOLIA)
                setDestinationChainId(BigInt(ChainId.ETH_SEPOLIA))
                switchChain(BigInt(ChainId.BSC_TESTNET))
                setOriginChain(BigInt(ChainId.BSC_TESTNET))
                break
        }
    }

    const approveToken = async () => {
        try {
            const approveTx = await XCallympicsNFTContract.setApprovalForAll(ADDRESSES[parseInt(originChain.toString())].NFT_BRIDGE, true)
            await approveTx.wait()
            setIsTokenApproved(true)
        } catch (e) {
            console.error(e)
            setIsTokenApproved(false)
        }
    }

    useEffect(() => {
        const getGasFee = async () => {
            try {
                if (destionationChain.length === 0 || destinationChainId === BigInt(0) || !NFTBridgeContract || selectedNFT === BigInt(0) || !selectedNFT || userState.provider === null) {
                    setGasFee(BigInt(0))
                } else {
                    // TODO: use fixed gas price (non-approven tokens are throwing the gas estimate)
                    const to = getBTPAddress(destionationChain, ADDRESSES[destinationChainId.toString()].NFT_BRIDGE)
                    const feeData = await userState.provider.getFeeData()
                    const functionFee = await NFTBridgeContract.bridgeNFToChain.estimateGas(to, selectedNFT, {
                        value: xcallFee,
                        gasPrice: feeData.maxFeePerGas
                    })

                    if (feeData.maxFeePerGas) {
                        setGasFee(functionFee * feeData.maxFeePerGas)
                    } else {
                        setGasFee(BigInt(0))
                    }
                }
            } catch (e) {
                console.error(e)
                setGasFee(BigInt(0))
            }
        }

        getGasFee()
    }, [NFTBridgeContract, destionationChain, destinationChainId, userState.provider, selectedNFT, xcallFee])

    useEffect(() => {
        const checkApproval = async () => {
            try {
                if (!XCallympicsNFTContract) {
                    setIsTokenApproved(false)
                } else {
                    const isApproved = await XCallympicsNFTContract.isApprovedForAll(userState.address, ADDRESSES[parseInt(originChain.toString())].NFT_BRIDGE)
                    setIsTokenApproved(isApproved)
                }
            } catch (e) {
                console.error(e)
                setIsTokenApproved(false)
            }
        }

        checkApproval()
    }, [userState.address, XCallympicsNFTContract, originChain])

    return (
        <>
            <div>
                <Text>Origin blockchain</Text>
                <Dropdown
                    className='mt-10 w-full'
                    placeholder='Origin chain'
                    selected={userState.isLoggedIn ? userState.chainId : originChain}
                    options={Object.keys(NETWORKS).map(key => ({ label: NETWORKS[key].chainName, value: NETWORKS[key].chainId }))}
                    onChange={(value) => changeOriginChain(value as bigint)}
                />
                <Text className='mt-16'>Destination blockchain</Text>
                <Dropdown
                    className='my-10 w-full'
                    placeholder='Destination chain'
                    selected={destionationChain}
                    options={Object.keys(NETWORKS).map(key => ({ label: NETWORKS[key].chainName, value: NETWORKS[key].btpID }))}
                    onChange={(value) => changeDestinationChain(value as BTPId)}
                />
            </div>

            <div>
                <div className='w-full my-6 flex-row justify-between items-center inline-flex'>
                    <Text>BTP fee</Text>
                    {originChain !== BigInt(0) ? (
                        <Text>{`${formatEther(xcallFee)} ${NETWORKS[originChain.toString()].nativeCurrency.symbol}`}</Text>
                    ) : '--'}
                </div>

                <div className='w-full my-6 flex-row justify-between items-center inline-flex'>
                    <Text>Gas fee</Text>
                    {originChain !== BigInt(0) ? (
                        <Text>{`${formatEther(gasFee)} ${NETWORKS[originChain.toString()].nativeCurrency.symbol}`}</Text>
                    ) : '--'}
                </div>

                <div className='bg-grey w-full h-1 my-10'></div>

                <div className='w-full flex-row justify-between items-center inline-flex'>
                    <Text>Total fees</Text>
                    {originChain !== BigInt(0) ? (
                        <Text>{`${formatEther(xcallFee + gasFee)} ${NETWORKS[originChain.toString()].nativeCurrency.symbol}`}</Text>
                    ) : '--'}
                </div>

                {(!isTokenApproved && userState.isLoggedIn && selectedNFT !== BigInt(0) && selectedNFT !== undefined && destinationChainId !== BigInt(0)) && (
                    <Button
                        className='w-full mt-20'
                        disabled={isTokenApproved}
                        onClick={() => approveToken()}
                        centered
                    >
                        Approve NFT for transfer
                    </Button>
                )}
                {userState.isLoggedIn ? (
                    <Button
                        className='w-full mt-10'
                        disabled={destinationChainId === BigInt(0) || !isTokenApproved || selectedNFT === BigInt(0) || selectedNFT === undefined}
                        centered
                    >
                        {destinationChainId === BigInt(0) ? 'Select destination chain' : `Transfer to ${NETWORKS[destinationChainId.toString()].chainName}`}
                    </Button>
                ) : (
                    <Button
                        className='w-full mt-20'
                        centered
                        onClick={() => connectWallet()}
                    >
                            Connect wallet
                    </Button>
                )}
            </div>
        </>
    )
}
