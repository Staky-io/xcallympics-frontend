'use client'

import { useState, useContext } from 'react'
import { Button, Dropdown } from '~/components/common'
import { ComponentContainer, Header, NFTDisplay, PageContainer } from '~/components/ui'
import { UserStoreContext } from '~/stores/User'
import { BTPId, ChainId } from '~/types'

export default function Home() {
    const { userState, disconnect, switchChain, connectWallet } = useContext(UserStoreContext)
    const [destionationChain, setDestionationChain] = useState<BTPId>(BigInt(0) as unknown as BTPId)
    const [originChain, setOriginChain] = useState<bigint>(BigInt(0))

    const changeOriginChain = (ChainID: bigint) => {
        switch (ChainID) {
            case BigInt(ChainId.BSC_TESTNET):
                setDestionationChain(BTPId.ETH_SEPOLIA)
                switchChain(BigInt(ChainId.BSC_TESTNET))
                setOriginChain(BigInt(ChainId.BSC_TESTNET))
                break
            case BigInt(ChainId.ETH_SEPOLIA):
                setDestionationChain(BTPId.BSC_TESTNET)
                switchChain(BigInt(ChainId.ETH_SEPOLIA))
                setOriginChain(BigInt(ChainId.ETH_SEPOLIA))
                break
        }
    }

    const changeDestinationChain = (btpId: BTPId) => {
        switch (btpId) {
            case BTPId.BSC_TESTNET:
                setDestionationChain(BTPId.BSC_TESTNET)
                switchChain(BigInt(ChainId.ETH_SEPOLIA))
                setOriginChain(BigInt(ChainId.ETH_SEPOLIA))
                break
            case BTPId.ETH_SEPOLIA:
                setDestionationChain(BTPId.ETH_SEPOLIA)
                switchChain(BigInt(ChainId.BSC_TESTNET))
                setOriginChain(BigInt(ChainId.BSC_TESTNET))
                break
        }
    }

    return (
        <main>
            <Header />
            <PageContainer className='flex flex-row justify-center items-start gap-48 mt-128'>
                {/* TODO: control UI + move to it's own component */}
                <ComponentContainer>
                    {userState.isLoggedIn ? (
                        <Button
                            variant='secondary'
                            onClick={disconnect}
                        >
                            {`(${userState.address.slice(0, 5)}...${userState.address.slice(userState.address.length - 6, userState.address.length - 1)}) Disconnect`}
                        </Button>
                    ) : (
                        <Button
                            variant='primary'
                            className='mr-10'
                            onClick={connectWallet}
                        >
                            Connect wallet
                        </Button>
                    )}
                    <Dropdown
                        className='mt-10 w-448'
                        label={true}
                        placeholder='Origin chain'
                        selected={userState.isLoggedIn ? userState.chainId : originChain}
                        options={[
                            { label: 'BSC Testnet', value: BigInt(ChainId.BSC_TESTNET) },
                            { label: 'Ethereum Sepolia', value: BigInt(ChainId.ETH_SEPOLIA) }
                        ]}
                        onChange={(value) => changeOriginChain(value as bigint)}
                    />
                    <Dropdown
                        label={true}
                        className='mt-10 w-448'
                        placeholder='Destination chain'
                        selected={destionationChain}
                        options={[
                            { label: 'BSC Testnet', value: BTPId.BSC_TESTNET },
                            { label: 'Ethereum Sepolia', value: BTPId.ETH_SEPOLIA }
                        ]}
                        onChange={(value) => changeDestinationChain(value as BTPId)}
                    />
                </ComponentContainer>

                <ComponentContainer className='flex flex-col justify-center items-center min-h-604'>
                    <NFTDisplay onClick={(nftid) => console.log(nftid)} />
                </ComponentContainer>
            </PageContainer>
        </main>
    )
}
