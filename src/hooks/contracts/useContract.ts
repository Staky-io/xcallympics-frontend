import { ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { ADDRESSES } from '~/helpers/constants'
import { UserStoreContext } from '~/stores/User'
import { ChainId } from '~/types'

import {
    BMC,
    BMC__factory,
    CallService,
    CallService__factory,
    NFTBridge,
    NFTBridge__factory,
    XCallympicsNFT,
    XCallympicsNFT__factory
} from '~/types/abi'

export default function useContract(factoryName: 'NFTBridge' | 'XCallympicsNFT' | 'BMC' | 'CallService', network?: ChainId) {
    const [contract, setContract] = useState<NFTBridge | XCallympicsNFT | BMC | CallService>()
    const { userState } = useContext(UserStoreContext)

    const getFactory = (factory: string) => {
        switch (factory) {
            case 'NFTBridge':
                return NFTBridge__factory
            case 'XCallympicsNFT':
                return XCallympicsNFT__factory
            case 'BMC':
                return BMC__factory
            case 'CallService':
                return CallService__factory
            default:
                return NFTBridge__factory
        }
    }

    const getAddress = (network: ChainId, factory: string) => {
        switch (factory) {
            case 'NFTBridge':
                return ADDRESSES[network].NFT_BRIDGE
            case 'XCallympicsNFT':
                return ADDRESSES[network].RUNNER_NFT
            case 'BMC':
                return ADDRESSES[network].BMC
            case 'CallService':
                return ADDRESSES[network].XCALL
            default:
                return ADDRESSES[network].NFT_BRIDGE
        }
    }

    useEffect(() => {
        const selectedNetwork = network !== undefined ? network : parseInt(userState.chainId.toString()) as ChainId

        if (selectedNetwork != ChainId.BSC_TESTNET && selectedNetwork != ChainId.ETH_SEPOLIA) return

        const contractAddress = getAddress(selectedNetwork, factoryName)
        const factory = getFactory(factoryName)

        if (userState.signer != null) {
            setContract(factory.connect(contractAddress, userState.signer))
        } else {
            if (!window.ethereum) {
                const defaultProvider = ethers.getDefaultProvider('sepolia')
                setContract(factory.connect(contractAddress, defaultProvider))
            } else {
                const defaultProvider = new ethers.BrowserProvider(window.ethereum)
                setContract(factory.connect(contractAddress, defaultProvider))
            }

        }
    }, [factoryName, userState.provider, userState.signer, userState.chainId, network])

    return contract
}
