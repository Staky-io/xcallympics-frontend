import { ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { getContractAddress, getContractFactory } from '~/helpers'
import { UserStoreContext } from '~/stores/User'
import { ChainId } from '~/types'

import {
    BMC,
    CallService,
    NFTBridge,
    XCallympicsNFT
} from '~/types/abi'

export default function useContract(factoryName: 'NFTBridge' | 'XCallympicsNFT' | 'BMC' | 'CallService', network?: ChainId) {
    const [contract, setContract] = useState<NFTBridge | XCallympicsNFT | BMC | CallService>()
    const { userState } = useContext(UserStoreContext)

    useEffect(() => {
        const selectedNetwork = network !== undefined ? network : Number(userState.chainId) as ChainId

        if (selectedNetwork != ChainId.BSC_TESTNET && selectedNetwork != ChainId.ETH_SEPOLIA) return

        const contractAddress = getContractAddress(selectedNetwork, factoryName)
        const factory = getContractFactory(factoryName)

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
