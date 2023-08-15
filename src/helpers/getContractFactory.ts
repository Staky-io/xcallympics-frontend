import { BMC__factory, CallService__factory, NFTBridge__factory, XCallympicsNFT__factory } from '~/types/abi'

export default function getContractFactory(factory: string) {
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
