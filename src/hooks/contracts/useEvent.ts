import { useEffect, useContext } from 'react'
import { ethers } from 'ethers'
import { ChainId } from '~/types'
import { UserStoreContext } from '~/stores/User'
import { getContractAddress, getContractInterface, getJsonRpcProviders } from '~/helpers'

export default function useEvent(
    contractName: 'NFTBridge' | 'XCallympicsNFT' | 'BMC' | 'CallService',
    eventFilter: ethers.EventFilter,
    callback: (event: ethers.Event[]) => void,
    network?: ChainId
) {
    const { userState } = useContext(UserStoreContext)

    useEffect(() => {
        const providers = getJsonRpcProviders()

        if (!eventFilter) return

        const selectedNetwork = network !== undefined ? network : Number(userState.chainId) as ChainId

        if (selectedNetwork != ChainId.BSC_TESTNET && selectedNetwork != ChainId.ETH_SEPOLIA) return

        const contractAddress = getContractAddress(selectedNetwork, contractName)
        const contractInterface = getContractInterface(contractName)
        const contract = new ethers.Contract(contractAddress, contractInterface, providers[selectedNetwork])

        contract.on({ ...eventFilter, address: contractAddress }, (...args: ethers.Event[]) => callback(args))

        return () => {
            contract.removeAllListeners(eventFilter)
        }
    }, [
        contractName,
        eventFilter,
        network,
        userState.chainId,
        callback
    ])

    return null
}
