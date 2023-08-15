import { useEffect, useContext } from 'react'
import { ethers } from 'ethers'
import { ChainId } from '~/types'
import { UserStoreContext } from '~/stores/User'
import { getContractAddress, getContractInterface, getJsonRpcProviders } from '~/helpers'

export default function useEvent(
    contractName: 'NFTBridge' | 'XCallympicsNFT' | 'BMC' | 'CallService',
    eventName: string,
    callback: (event: ethers.EventLog | ethers.Log) => void,
    network?: ChainId
) {
    const providers = getJsonRpcProviders()
    const { userState } = useContext(UserStoreContext)

    useEffect(() => {
        const selectedNetwork = network !== undefined ? network : parseInt(userState.chainId.toString()) as ChainId
        if (selectedNetwork != ChainId.BSC_TESTNET && selectedNetwork != ChainId.ETH_SEPOLIA) return

        const contractAddress = getContractAddress(selectedNetwork, contractName)
        const contractInterface = getContractInterface(contractName)
        const contract = new ethers.Contract(contractAddress, contractInterface, providers[selectedNetwork])

        contract.on(eventName, callback)

        return () => {
            contract.off(eventName, callback)
        }
    }, [
        providers,
        contractName,
        eventName,
        network,
        userState.chainId,
        callback
    ])

    return null
}
