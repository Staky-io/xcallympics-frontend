'use client'

import { useState, useContext } from 'react'
import { Button, Dropdown, Text } from '~/components/common'
import { ComponentContainer, Header, NFTDisplay, PageContainer } from '~/components/ui'
import { UserStoreContext } from '~/stores/User'
import { BTPId, ChainId } from '~/types'

export default function Home() {
    const { userState, switchChain } = useContext(UserStoreContext)
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
                <ComponentContainer className='min-h-604 h-full flex flex-col justify-around'>
                    <div>
                        <Text>Origin blockchain</Text>
                        <Dropdown
                            className='mt-10 w-full'
                            placeholder='Origin chain'
                            selected={userState.isLoggedIn ? userState.chainId : originChain}
                            options={[
                                { label: 'BSC Testnet', value: BigInt(ChainId.BSC_TESTNET) },
                                { label: 'Ethereum Sepolia', value: BigInt(ChainId.ETH_SEPOLIA) }
                            ]}
                            onChange={(value) => changeOriginChain(value as bigint)}
                        />
                        <Text className='mt-16'>Destination blockchain</Text>
                        <Dropdown
                            className='my-10 w-full'
                            placeholder='Destination chain'
                            selected={destionationChain}
                            options={[
                                { label: 'BSC Testnet', value: BTPId.BSC_TESTNET },
                                { label: 'Ethereum Sepolia', value: BTPId.ETH_SEPOLIA }
                            ]}
                            onChange={(value) => changeDestinationChain(value as BTPId)}
                        />
                    </div>

                    <div>
                        <div className='w-full my-6 flex-row justify-between items-center inline-flex'>
                            <Text>BTP fee</Text>
                            <Text>0.1 ETH</Text>
                        </div>

                        <div className='w-full my-6 flex-row justify-between items-center inline-flex'>
                            <Text>Gas fee</Text>
                            <Text>0.1 ETH</Text>
                        </div>

                        <div className='bg-grey w-full h-1 my-10'></div>

                        <div className='w-full flex-row justify-between items-center inline-flex'>
                            <Text>Total fees</Text>
                            <Text>0.1 ETH</Text>
                        </div>

                        <Button center={true} className='w-full mt-20'>
                            Transfer to BSC
                        </Button>
                    </div>
                </ComponentContainer>

                <ComponentContainer className='flex flex-col justify-center items-center min-h-604'>
                    <NFTDisplay onClick={(nftid) => console.log(nftid)} />
                </ComponentContainer>
            </PageContainer>
        </main>
    )
}
