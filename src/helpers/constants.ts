import { AddressesList, BTPId, ChainId, NetworkList } from '~/types'

export const NETWORKS: NetworkList = {
    [ChainId.ETH_SEPOLIA]: {
        chainId: BigInt(ChainId.ETH_SEPOLIA),
        chainName: 'Ethereum Sepolia',
        btpID: BTPId.ETH_SEPOLIA,
        rpcUrls: ['https://sepolia.infura.io/v3/'],
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
        BMCM: '0xFd82803c9b2E92C628846012c6E5016Ac380f68d',
        BMCS: '0x6AB5fB039ABbEE20bf43F84393E528015686fB04',
        BMC: '0x193eD92257E0773ccBA097e0ba4110E588eb0F1c',
        BMV: '0xFCDD2AB0D0D98c3f74db20a0913c7e3B264dF8a1',
        XCALL: '0x6193c0b12116c4963594761d859571b9950a8686',
        RUNNER_NFT: '0x10939E2985A91A9d1c09866505104f664B91a7ff',
        NFT_BRIDGE: '0xf83f73e4B10a23438B4BeA591FcFdDd7a81Ba7E3'
    },
    [ChainId.ETH_SEPOLIA]: {
        BMCM: '0x39FBbE3AeCbe6ED08baf16e13eFE4aA31550CaA2',
        BMCS: '0xd6298BBB8b8B8EA273C3CB470B273A1cef552Ef3',
        BMC: '0x50DD9479c45085dC64c6F0a0796040C7768f25CE',
        BMV: '0x684ba8F34f9481f7F02aCd4F143506E11AC19E3E',
        XCALL: '0x9B68bd3a04Ff138CaFfFe6D96Bc330c699F34901',
        RUNNER_NFT: '0x7D74651C2B0874Be7ea8111B11C277b998B569DA',
        NFT_BRIDGE: '0xD0c4b8F219DBF675Ba65c313b09898683cFB7499'
    }
}
