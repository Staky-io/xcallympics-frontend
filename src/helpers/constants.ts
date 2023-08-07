import { AddressesList, BTPId, ChainId, NetworkList } from '~/types'

export const NETWORKS: NetworkList = {
    [ChainId.ETH_SEPOLIA]: {
        chainId: BigInt(ChainId.ETH_SEPOLIA),
        chainName: 'Sepolia',
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
        RUNNER_NFT: '0xE539EA9884f278e79aA09Fdb4D76030098EC9Fb9',
        NFT_BRIDGE: '0x4cCb7B7167950a43A5cd81Cd122059adfc39741b'
    },
    [ChainId.ETH_SEPOLIA]: {
        BMCM: '0x39FBbE3AeCbe6ED08baf16e13eFE4aA31550CaA2',
        BMCS: '0xd6298BBB8b8B8EA273C3CB470B273A1cef552Ef3',
        BMC: '0x50DD9479c45085dC64c6F0a0796040C7768f25CE',
        BMV: '0x684ba8F34f9481f7F02aCd4F143506E11AC19E3E',
        XCALL: '0x9B68bd3a04Ff138CaFfFe6D96Bc330c699F34901',
        RUNNER_NFT: '0xAe5f0330bED2f5B4d75bEb574B6F0463e715Ae01',
        NFT_BRIDGE: '0xcfc0DB1A72E9A72795A000285DD1ccfFdA4282EF'
    }
}
