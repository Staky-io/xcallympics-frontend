'use client'

import { useContext } from 'react'
import { Button, Dropdown, Heading } from '~/components/common'
import { IconNotFound } from '~/components/icons'
import { ComponentContainer, Header, PageContainer } from '~/components/ui'
import { UserStoreContext } from '~/stores/User'
import { ChainId } from '~/types'

export default function Home() {
    const { userState, disconnect, switchChain, connectWallet } = useContext(UserStoreContext)

    return (
        <main>
            <Header />
            <PageContainer className='flex flex-row justify-center items-start gap-48 mt-128'>
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
                        placeholder='Choose destination chain'
                        selected={userState.chainId}
                        options={[
                            { label: 'BSC Testnet', value: BigInt(ChainId.BSC_TESTNET) },
                            { label: 'Ethereum Sepolia', value: BigInt(ChainId.ETH_SEPOLIA) }
                        ]}
                        onChange={(value) => switchChain(value as bigint)}
                    />
                </ComponentContainer>

                <ComponentContainer className='flex flex-col justify-center items-center min-h-604'>
                    <Heading level={3} className='mb-32 text-grey-secondary font-bold'>404</Heading>
                    <IconNotFound className='w-64 h-64' />
                </ComponentContainer>
            </PageContainer>
        </main>
    )
}
