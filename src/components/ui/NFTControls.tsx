import { ethers } from 'ethers'
import { useState, useEffect, useContext } from 'react'
import { Button, Dropdown, Text } from '~/components/common'
import { getBTPAddress, getContractAddress } from '~/helpers'
import { NETWORKS } from '~/helpers/constants'
import { useContract, useEvent, useXCallFee } from '~/hooks/contracts'
import { UserStoreContext } from '~/stores/User'
import { BTPId, ChainId } from '~/types'
import { CallService, NFTBridge, XCallympicsNFT } from '~/types/abi'

type NFTControlsProps = {
    selectedNFT: bigint;
}

export default function NFTControls(props: NFTControlsProps) {
    const { selectedNFT } = props
    const { userState, switchChain, connectWallet } = useContext(UserStoreContext)

    const [isReady, setIsReady] = useState<boolean>(false)
    const [destionationChain, setDestionationChain] = useState<BTPId>('' as BTPId)
    const [destinationChainId, setDestinationChainId] = useState<bigint>(0n)
    const [gasFee, setGasFee] = useState<bigint>(0n)
    const [originChain, setOriginChain] = useState<bigint>(0n)
    const [isTokenApproved, setIsTokenApproved] = useState<boolean>(false)
    const [waitingTxSerialNumber, setWaitingTxSerialNumber] = useState<bigint>(0n)
    const [isCallWaitingForBridge, setIsCallWaitingForBridge] = useState<boolean>(false)

    const xcallFee = useXCallFee({ destionationChain, destinationChainId })

    const NFTBridgeContract = useContract('NFTBridge') as NFTBridge
    const CallServiceContract = useContract('CallService') as CallService
    const XCallympicsNFTContract = useContract('XCallympicsNFT') as XCallympicsNFT

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
            const approveTx = await XCallympicsNFTContract.approve(getContractAddress(Number(originChain), 'NFTBridge'), selectedNFT)
            await approveTx.wait()
            setIsTokenApproved(true)
        } catch (e) {
            console.error(e)
            setIsTokenApproved(false)
        }
    }

    const transferNFT = async () => {
        try {
            const to = getBTPAddress(destionationChain, userState.address)
            const transferTx = await NFTBridgeContract.bridgeNFToChain(to, selectedNFT, {
                value: xcallFee
            })
            await transferTx.wait()
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (
            destionationChain.length === 0
            || destinationChainId === 0n
            || !NFTBridgeContract
            || !XCallympicsNFTContract
            || selectedNFT === 0n
            || !selectedNFT
            || userState.provider === null
            || !xcallFee
            || xcallFee === 0n
        ) {
            setIsReady(false)
        } else {
            setIsReady(true)
        }
    }, [
        NFTBridgeContract,
        XCallympicsNFTContract,
        destinationChainId,
        destionationChain.length,
        selectedNFT,
        userState.provider,
        xcallFee
    ])

    useEffect(() => {
        const getGasFee = async () => {
            try {
                if (!isReady || !userState.provider || !isTokenApproved) {
                    setGasFee(0n)
                } else {
                    const to = getBTPAddress(destionationChain, userState.address)
                    const feeData = await userState.provider.getFeeData()

                    const functionFee = await NFTBridgeContract.bridgeNFToChain.estimateGas(to, selectedNFT, {
                        value: xcallFee,
                        gasPrice: feeData.gasPrice
                    })

                    if (feeData.gasPrice) {
                        setGasFee(functionFee * feeData.gasPrice)
                    } else {
                        setGasFee(0n)
                    }
                }
            } catch (e) {
                console.error(e)
                setGasFee(0n)
            }
        }

        getGasFee()
    }, [
        isReady,
        NFTBridgeContract,
        destionationChain,
        destinationChainId,
        userState.provider,
        userState.address,
        selectedNFT,
        xcallFee,
        isTokenApproved
    ])

    useEffect(() => {
        const checkApproval = async () => {
            try {
                if (!isReady) {
                    setIsTokenApproved(false)
                } else {
                    const approvedAddress = await XCallympicsNFTContract.getApproved(selectedNFT)
                    setIsTokenApproved(approvedAddress === getContractAddress(Number(originChain), 'NFTBridge'))
                }
            } catch (e) {
                console.error(e)
                setIsTokenApproved(false)
            }
        }

        checkApproval()
    }, [isReady, userState.address, XCallympicsNFTContract, selectedNFT, originChain])

    useEvent('NFTBridge', NFTBridgeContract?.filters['MessageSent(address,uint256,bytes)'], async (data: ethers.ContractEventPayload) => {
        console.log('MessageSent event', data)

        if (data.args[0].toLowerCase() !== userState.address.toLowerCase()) return
        setIsCallWaitingForBridge(true)
        setWaitingTxSerialNumber(data.args[1])
    })

    useEvent('CallService', CallServiceContract?.filters['CallMessage(string,string,uint256,uint256)'], async (data: ethers.ContractEventPayload) => {
        console.log('CallMessage event', data)
        if (data.args[2] !== waitingTxSerialNumber) return
        setIsCallWaitingForBridge(false)
    }, Number(destinationChainId))

    // useEvent('CallService', CallServiceContract?.filters['CallExecuted(bytes32,uint256,bytes)'], async (data: ethers.ContractEventPayload) => {
    //     console.log('CallExecuted event', data)
    //     if (data.args[1] !== waitingTxSerialNumber) return
    //     setIsCallWaitingForBridge(false)
    // })

    if (isCallWaitingForBridge) {
        return (
            <div className='text-center'>
                <Text>Waiting for the XCall message to be received on the other chain.</Text>
                <Text>do not close this window !</Text>
            </div>
        )
    } else if (!isCallWaitingForBridge && waitingTxSerialNumber !== 0n) {
        return (
            <div className='text-center'>
                <Text>XCall received with id {Number(waitingTxSerialNumber)} !</Text>
                <Button
                    className='w-full mt-10'
                    centered
                >
                    Execute call
                </Button>
            </div>
        )
    } else {
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
                        {originChain !== 0n ? (
                            <Text>{`${ethers.formatEther(xcallFee)} ${NETWORKS[originChain.toString()].nativeCurrency.symbol}`}</Text>
                        ) : '--'}
                    </div>

                    <div className='w-full my-6 flex-row justify-between items-center inline-flex'>
                        <Text>Gas fee</Text>
                        {originChain !== 0n && gasFee !== 0n ? (
                            <Text>{`${ethers.formatEther(gasFee)} ${NETWORKS[originChain.toString()].nativeCurrency.symbol}`}</Text>
                        ) : '--'}
                    </div>

                    <div className='bg-grey w-full h-1 my-10'></div>

                    <div className='w-full flex-row justify-between items-center inline-flex'>
                        <Text>Total fees</Text>
                        {originChain !== 0n ? (
                            <Text>{`${ethers.formatEther(xcallFee + gasFee)} ${NETWORKS[originChain.toString()].nativeCurrency.symbol}`}</Text>
                        ) : '--'}
                    </div>

                    {(!isTokenApproved && userState.isLoggedIn && selectedNFT !== 0n && selectedNFT !== undefined && destinationChainId !== 0n) && (
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
                            disabled={destinationChainId === 0n || !isTokenApproved || selectedNFT === 0n || selectedNFT === undefined}
                            onClick={() => transferNFT()}
                            centered
                        >
                            {destinationChainId === 0n ? 'Select destination chain' : `Transfer to ${NETWORKS[destinationChainId.toString()].chainName}`}
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
}
