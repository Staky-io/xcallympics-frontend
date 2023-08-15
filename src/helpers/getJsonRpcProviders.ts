import { ethers } from 'ethers'
import { NETWORKS } from './constants'
import { ChainId } from '~/types'

export default function getJsonRpcProviders() {
    const providers = {} as { [Property in ChainId]: ethers.JsonRpcProvider }

    Object.keys(ChainId)
        .filter((v) => !isNaN(Number(v)))
        .map((id) => {
            providers[id as unknown as ChainId] = new ethers.JsonRpcProvider(NETWORKS[id].rpcUrls[0])
        })

    return providers
}
