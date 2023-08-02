'use client'

import { useEffect, createContext, PropsWithChildren } from 'react'
import { ethers } from 'ethers'
import { useImmer } from 'use-immer'
import { NETWORKS } from '~/helpers/constants'
import { ChainId } from '~/types'

type UserStoreState = {
    isLoggedIn: boolean
    address: string
    balance: bigint
    chainId: ChainId
    provider: ethers.BrowserProvider | null
    signer: ethers.JsonRpcSigner | null
    wrongNetwork: boolean
}

type UserStoreContextType = {
    userState: UserStoreState
    connectWallet: () => Promise<void>
    switchChain: (chainId: bigint) => Promise<void>
    disconnect: () => void
}

const defaultState: UserStoreState = {
    isLoggedIn: false,
    address: '',
    balance: BigInt(0),
    chainId: ChainId.BSC_TESTNET,
    provider: null,
    signer: null,
    wrongNetwork: false
}

const UserStoreContext = createContext({
    userState: defaultState
} as UserStoreContextType)

const UserStoreProvider = ({ children }: PropsWithChildren) => {
    const [userState, setUserState] = useImmer({ ...defaultState })

    const supportedChainIds = Object.keys(NETWORKS).map((n: string) => BigInt(NETWORKS[n].chainId))

    const disconnect = () => setUserState(() => defaultState)

    const loginUser = async (provider: ethers.BrowserProvider, accounts: string[]) => {
        const signer = new ethers.JsonRpcSigner(provider, accounts[0])
        const { chainId } = await provider.getNetwork()
        const balance = await provider.getBalance(accounts[0])

        setUserState((s) => {
            s.isLoggedIn = true
            s.address = accounts[0]
            s.balance = BigInt(balance)
            s.provider = provider
            s.signer = signer
            s.chainId = BigInt(chainId) as unknown as ChainId
            s.wrongNetwork = !supportedChainIds.includes(chainId)
        })
    }

    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum, 'any')
            const accounts = await provider.send('eth_requestAccounts', [])

            await loginUser(provider, accounts)

            window.ethereum.on('chainChanged', async (chainId: string) => {
                const balance = await provider.getBalance(accounts[0])

                setUserState((s) => {
                    s.balance = BigInt(balance)
                    s.chainId = BigInt(chainId) as unknown as ChainId
                    s.wrongNetwork = !supportedChainIds.includes(BigInt(chainId))
                })
            })

            window.ethereum.on('accountsChanged', async (accounts: string[]) => {
                if (accounts.length === 0) {
                    disconnect()
                    return
                }

                const balance = await provider.getBalance(accounts[0])

                setUserState((s) => {
                    s.balance = BigInt(balance)
                    s.address = accounts[0]
                })
            })
        }
    }

    const switchChain = async (chainId: bigint) => {
        if (window.ethereum) {
            try {
                const network = NETWORKS[chainId.toString()]

                const n = {
                    ...network,
                    chainId: `0x${network.chainId.toString(16)}`,
                    btpID: undefined
                }

                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [n]
                })
            } catch (switchError) {
                console.error(switchError)
            }
        }
    }

    useEffect(() => {
        const autoLoginUser = async () => {
            if (window.ethereum && !userState.isLoggedIn) {
                const provider = new ethers.BrowserProvider(window.ethereum, 'any')
                const accounts = await provider.send('eth_accounts', [])

                if (accounts.length > 0) {
                    await loginUser(provider, accounts)
                } else {
                    disconnect()
                }
            }
        }

        autoLoginUser()
    }, [])

    return (
        <UserStoreContext.Provider value={{
            userState,
            disconnect,
            connectWallet,
            switchChain
        }}>
            {children}
        </UserStoreContext.Provider>
    )
}

export {
    UserStoreContext,
    UserStoreProvider
}
