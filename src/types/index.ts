export enum ChainId {
    ETH_SEPOLIA = 11155111,
    BSC_TESTNET = 97
}

export enum BTPId {
    ETH_SEPOLIA = '0xaa36a7.eth2',
    BSC_TESTNET = '0x61.bsc'
}

export type NetworkItem = {
    chainId: bigint;
    chainName: string;
    btpID: string;
    rpcUrls: string[];
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    blockExplorerUrls: string[];
}

export type NetworkList = {
    [key: string]: NetworkItem;
}

export type AddressesList = {
    [key: string]: {
        [key: string]: string
    }
}
