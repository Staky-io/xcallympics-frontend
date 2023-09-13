'use client'

import { useEffect, createContext, PropsWithChildren } from 'react'
import { ethers } from 'ethers'
import { useImmer } from 'use-immer'
import { NETWORKS } from '~/helpers/constants'

type UserStoreState = {
    isLoggedIn: boolean
    address: string
    balance: bigint
    chainId: bigint
    provider: ethers.providers.JsonRpcProvider | ethers.providers.BaseProvider | null
    signer: ethers.Signer | null
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
    balance: 0n,
    chainId: 0n,
    provider: null,
    signer: null,
    wrongNetwork: false
}

const UserStoreContext = createContext({
    userState: defaultState
} as UserStoreContextType)

const UserStoreProvider = ({ children }: PropsWithChildren) => {
    const [userState, setUserState] = useImmer(defaultState)

    const supportedChainIds = Object.keys(NETWORKS).map((n: string) => BigInt(NETWORKS[n].chainId))

    const disconnect = () => {
        setUserState(() => defaultState)
    }

    const loginUser = async (provider: ethers.providers.JsonRpcProvider, accounts: string[]) => {
        const signer = provider.getSigner(accounts[0])
        const { chainId } = await provider.getNetwork()
        const balance = await provider.getBalance(accounts[0])

        setUserState((s) => {
            s.isLoggedIn = true
            s.address = accounts[0]
            s.balance = balance.toBigInt()
            s.provider = provider
            s.signer = signer
            s.chainId = BigInt(chainId)
            s.wrongNetwork = !supportedChainIds.includes(BigInt(chainId))
        })
    }

    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.JsonRpcProvider(window.ethereum, 'any')
            const accounts = await provider.send('eth_requestAccounts', [])

            await loginUser(provider, accounts)
        } else {
            const provider = ethers.getDefaultProvider('sepolia')
            setUserState((s) => {
                s.provider = provider
            })
        }
    }

    const switchChain = async (chainId: bigint) => {
        if (!userState.isLoggedIn) return

        if (window.ethereum) {
            try {
                const network = NETWORKS[chainId.toString()]

                const n = {
                    ...network,
                    chainId: `0x${network.chainId.toString(16)}`,
                    btpID: undefined
                }

                window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: n.chainId }]
                }).catch((error: { code: number }) => {
                    if (error.code === 4902) {
                        return window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [n]
                        })
                    }
                })
            } catch (switchError) {
                console.error(switchError)
            }
        }
    }

    useEffect(() => {
        const autoLoginUser = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.JsonRpcProvider(window.ethereum, 'any')
                const accounts = await provider.send('eth_accounts', [])

                if (!userState.isLoggedIn && accounts.length > 0) {
                    await loginUser(provider, accounts)
                }

                window.ethereum.on('chainChanged', async (chainId: string) => {
                    setUserState((s) => {
                        s.chainId = BigInt(chainId)
                        s.wrongNetwork = !supportedChainIds.includes(BigInt(chainId))
                    })
                })

                window.ethereum.on('accountsChanged', async (accounts: string[]) => {
                    if (accounts.length === 0) {
                        disconnect()
                        return
                    }

                    const balance = await provider.getBalance(accounts[0])
                    const signer = provider.getSigner(accounts[0])
                    const { chainId } = await provider.getNetwork()

                    setUserState((s) => {
                        s.signer = signer
                        s.chainId = BigInt(chainId)
                        s.balance = balance.toBigInt()
                        s.address = accounts[0]
                    })
                })
            }

        }

        autoLoginUser()

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
