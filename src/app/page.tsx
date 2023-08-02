'use client'

import { useContext } from 'react'
import { Button, Dropdown } from '~/components/common'
import { UserStoreContext } from '~/stores/User'
import { ChainId } from '~/types'

export default function Home() {
    const { userState, disconnect, switchChain, connectWallet } = useContext(UserStoreContext)

    return (
        <main>
            <div className='w-full flex flex-row mt-128'>
                {userState.isLoggedIn ? (
                    <Button
                        variant="secondary"
                        onClick={disconnect}
                    >
                        {`(${userState.address.slice(0, 5)}...${userState.address.slice(userState.address.length - 6, userState.address.length - 1)}) Disconnect`}
                    </Button>
                ) : (
                    <Button
                        variant="primary"
                        className='mr-10'
                        onClick={connectWallet}
                    >
                        Connect wallet
                    </Button>
                )}
            </div>

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
        </main>
    )
}
