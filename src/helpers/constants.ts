import { AddressesList, BTPId, ChainId, NetworkList } from '~/types'

export const NETWORKS: NetworkList = {
    [ChainId.ETH_SEPOLIA]: {
        chainId: BigInt(ChainId.ETH_SEPOLIA),
        chainName: 'Ethereum Sepolia',
        btpID: BTPId.ETH_SEPOLIA,
        rpcUrls: ['https://rpc.notadegen.com/eth/sepolia'],
        nativeCurrency: {
            name: 'SepoliaETH',
            symbol: 'ETH',
            decimals: 18
        },
        blockExplorerUrls: ['https://sepolia.etherscan.io']
    },
    [ChainId.BSC_TESTNET]: {
        chainId: BigInt(ChainId.BSC_TESTNET),
        chainName: 'BSC Testnet',
        btpID: BTPId.BSC_TESTNET,
        rpcUrls: ['https://bsc-testnet.publicnode.com'],
        nativeCurrency: {
            name: 'Testnet BNB',
            symbol: 'tBNB',
            decimals: 18
        },
        blockExplorerUrls: ['https://testnet.bscscan.com']
    }
}

export const ADDRESSES: AddressesList = {
    [ChainId.BSC_TESTNET]: {
        BMCM: '0x41CD95F16f9bbF2bEB5479C00CF249A8b0A076bF',
        BMCS: '0xCC98F0736ec2ef32B8A64251BB89aF14E27043b6',
        BMC: '0x1709FB3Cd401cB86Fd30Dd3Ef0d1A0c76858C8b5',
        BMV: '0x0a42d5c21EF16aec1c31c4511EdCaA9648a9538C',
        XCALL: '0x5Ebb7aCB7bCaf7C1ADeFcF9660D39AC07d432904',
        RUNNER_NFT: '0x37c2A42899390CCbbaEE8ada08290A8F0D7902b3',
        NFT_BRIDGE: '0xA07cA8dC50B053CAAa5766706e249785F3A0c0f3'
    },
    [ChainId.ETH_SEPOLIA]: {
        BMCM: '0x9fb595461023f9A920B276A4b289972c4aFF114F',
        BMCS: '0xEe94cBA4C4d138fb4de1F4bcfA1CEeF062eE8251',
        BMC: '0x63ca9B73De32F1ECBF285b710D4371a2aE1aC1ED',
        BMV: '0x1592F432Dde573341BaFe14d5FAbe4A299b2E721',
        XCALL: '0x694C1f5Fb4b81e730428490a1cE3dE6e32428637',
        RUNNER_NFT: '0xE539EA9884f278e79aA09Fdb4D76030098EC9Fb9',
        NFT_BRIDGE: '0x4cCb7B7167950a43A5cd81Cd122059adfc39741b'
    }
}
