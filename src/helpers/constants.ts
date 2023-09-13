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
        RUNNER_NFT: '0xad1b0c2931E359a1c935F191449A2b6199DFE413',
        NFT_BRIDGE: '0x8707E2338Cd756df6B494488D8560af801EB6c2B'
    },
    [ChainId.ETH_SEPOLIA]: {
        BMCM: '0x9fb595461023f9A920B276A4b289972c4aFF114F',
        BMCS: '0xEe94cBA4C4d138fb4de1F4bcfA1CEeF062eE8251',
        BMC: '0x63ca9B73De32F1ECBF285b710D4371a2aE1aC1ED',
        BMV: '0x1592F432Dde573341BaFe14d5FAbe4A299b2E721',
        XCALL: '0x694C1f5Fb4b81e730428490a1cE3dE6e32428637',
        RUNNER_NFT: '0x08f41Fc446Ff192C7493afe4a2e7456527893339',
        NFT_BRIDGE: '0x36e0C34056E83A7A3761b6e9D49C1F2E6fDc69Ae'
    }
}
