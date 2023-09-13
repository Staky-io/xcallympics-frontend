import { ethers } from 'ethers'

import BMCAbi from '~/abis/BMC.json'
import CallServiceAbi from '~/abis/CallService.json'
import NFTBridgeAbi from '~/abis/NFTBridge.json'
import XCallympicsNFTAbi from '~/abis/XCallympicsNFT.json'

export default function getContractInterface(factory: string) {
    switch (factory) {
        case 'NFTBridge':
            return new ethers.utils.Interface(NFTBridgeAbi)
        case 'XCallympicsNFT':
            return new ethers.utils.Interface(XCallympicsNFTAbi)
        case 'BMC':
            return new ethers.utils.Interface(BMCAbi)
        case 'CallService':
            return new ethers.utils.Interface(CallServiceAbi)
        default:
            return new ethers.utils.Interface(NFTBridgeAbi)
    }
}
