import { ChainId } from '~/types'
import { ADDRESSES } from './constants'

export default function getContractAddress(network: ChainId, factory: string) {
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
