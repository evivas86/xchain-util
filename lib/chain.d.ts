export declare enum Chain {
    Binance = "BNB",
    Bitcoin = "BTC",
    Ethereum = "ETH",
    THORChain = "THOR",
    Cosmos = "GAIA",
    Polkadot = "POLKA",
    BitcoinCash = "BCH",
    Litecoin = "LTC",
    Terra = "TERRA",
    Doge = "DOGE"
}
export declare const BNBChain = Chain.Binance;
export declare const BTCChain = Chain.Bitcoin;
export declare const ETHChain = Chain.Ethereum;
export declare const THORChain = Chain.THORChain;
export declare const CosmosChain = Chain.Cosmos;
export declare const PolkadotChain = Chain.Polkadot;
export declare const BCHChain = Chain.BitcoinCash;
export declare const LTCChain = Chain.Litecoin;
export declare const TerraChain = Chain.Terra;
export declare const DOGEChain = Chain.Doge;
/**
 * Type guard to check whether string  is based on type `Chain`
 *
 * @param {string} c The chain string.
 * @returns {boolean} `true` or `false`
 */
export declare const isChain: (c: string) => c is Chain;
/**
 * Convert chain to string.
 *
 * @param {Chain} chainId.
 * @returns {string} The string based on the given chain type.
 */
export declare const chainToString: ((chainId: Chain) => string) & Record<Chain, string>;
