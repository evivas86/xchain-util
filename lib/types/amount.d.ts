import BigNumber from 'bignumber.js';
export declare enum Denomination {
    /**
     * values for asset amounts in base units (no decimal)
     */
    Base = "BASE",
    /**
     * values of asset amounts (w/ decimal)
     */
    Asset = "ASSET"
}
export declare type Amount<T> = T extends Denomination ? {
    type: T;
    amount: () => BigNumber;
    plus: (value: BigNumber.Value | Amount<T>, decimal?: number) => Amount<T>;
    minus: (value: BigNumber.Value | Amount<T>, decimal?: number) => Amount<T>;
    times: (value: BigNumber.Value | Amount<T>, decimal?: number) => Amount<T>;
    div: (value: BigNumber.Value | Amount<T>, decimal?: number) => Amount<T>;
    gt: (value: BigNumber.Value | Amount<T>) => boolean;
    gte: (value: BigNumber.Value | Amount<T>) => boolean;
    lt: (value: BigNumber.Value | Amount<T>) => boolean;
    lte: (value: BigNumber.Value | Amount<T>) => boolean;
    eq: (value: BigNumber.Value | Amount<T>) => boolean;
    decimal: number;
} : never;
export declare type BaseAmount = Amount<Denomination.Base>;
export declare type AssetAmount = Amount<Denomination.Asset>;
