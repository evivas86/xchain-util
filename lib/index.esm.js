import BigNumber from 'bignumber.js';
import { Network } from '@xchainjs/xchain-client';

/**
 * Helper to delay anything within an `async` function
 *
 * @param ms delay in milliseconds
 *
 * @example
 *
 * ```
 * const anyAsyncFunc = async () => {
 *  // do something
 *  console.log('before delay')
 *  // wait for 200ms
 *  await delay(200)
 *  // and do other things
 *  console.log('after delay')
 * }
 * ```
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Shortcut to create a BigNumber
 *
 * @param {string | number | BigNumber.Instance} value
 * @returns {BigNumber} The BigNumber interface from the given value.
 */
const bn = (value) => new BigNumber(value);
/**
 * Helper to check whether a BigNumber is valid or not
 *
 * @param {BigNumber} value
 * @returns {boolean} `true` or `false`.
 * */
const isValidBN = (value) => !value.isNaN();
/**
 * Helper to create a big number from string or number
 * If it fails to create a big number, a big number with value 0 will be returned instead
 *
 * @param {string|number|undefined} value
 * @returns {BigNumber} The BigNumber interface from the given value. If invalid one is provided, will return `0`.
 * */
const bnOrZero = (value) => {
    const b = value ? bn(value) : bn(0);
    return isValidBN(b) ? b : bn(0);
};
/**
 * Helper to validate a possible BigNumber
 * If the given value is invalid or undefined, 0 is returned as a BigNumber
 *
 * @param {BigNumber|undefined} value
 * @returns {boolean} `true` or `false`.
 */
const validBNOrZero = (value) => (value && isValidBN(value) ? value : bn(0));
/**
 * Format a BaseNumber to a string depending on given decimal places
 *
 * @param {BigNumber} value
 * @param {number} decimal The decimal place. (optional)
 * @returns {string} The formatted string from the given BigNumber and decimal place.
 * */
const formatBN = (value, decimal = 2) => value.toFormat(decimal);
/**
 * The enumuration for symbol position.
 * `before` or `after`
 */
var SymbolPosition;
(function (SymbolPosition) {
    SymbolPosition["BEFORE"] = "before";
    SymbolPosition["AFTER"] = "after";
})(SymbolPosition || (SymbolPosition = {}));
/**
 * Formats a big number value by prefixing it with `$`
 *
 * @param {BigNumber} n
 * @param {number} decimalPlaces The decimal place. (optional)
 * @param {string} symbol The currency symbol. (optional)
 * @param {position} position The symbol position. (optional)
 * @returns {string} The formatted string from the given BigNumber, decimal places, symbol and position.
 */
const formatBNCurrency = (n, decimalPlaces = 2, symbol = '$', position = SymbolPosition.BEFORE) => {
    const value = formatBN(n, decimalPlaces);
    if (position === SymbolPosition.BEFORE) {
        return `${symbol}${value}`;
    }
    return `${value}${symbol}`;
};
/**
 * Helper to get a fixed `BigNumber`
 * Returns zero `BigNumber` if `value` is invalid
 *
 * @param {number|string|BigNumber|undefined} value
 * @param {number} decimalPlaces The decimal place. (optional)
 * @returns {BigNumber} The BigNumber interface from the given value and decimal.
 * */
const fixedBN = (value, decimalPlaces = 2) => {
    const n = bn(value || 0);
    const fixedBN = isValidBN(n) ? n.toFixed(decimalPlaces) : bn(0).toFixed(decimalPlaces);
    return bn(fixedBN);
};

var Chain;
(function (Chain) {
    Chain["Binance"] = "BNB";
    Chain["Bitcoin"] = "BTC";
    Chain["Ethereum"] = "ETH";
    Chain["THORChain"] = "THOR";
    Chain["Cosmos"] = "GAIA";
    Chain["Polkadot"] = "POLKA";
    Chain["BitcoinCash"] = "BCH";
    Chain["Litecoin"] = "LTC";
    Chain["Terra"] = "TERRA";
    Chain["Doge"] = "DOGE";
})(Chain || (Chain = {}));
const BNBChain = Chain.Binance;
const BTCChain = Chain.Bitcoin;
const ETHChain = Chain.Ethereum;
const THORChain = Chain.THORChain;
const CosmosChain = Chain.Cosmos;
const PolkadotChain = Chain.Polkadot;
const BCHChain = Chain.BitcoinCash;
const LTCChain = Chain.Litecoin;
const TerraChain = Chain.Terra;
const DOGEChain = Chain.Doge;
/**
 * Type guard to check whether string  is based on type `Chain`
 *
 * @param {string} c The chain string.
 * @returns {boolean} `true` or `false`
 */
const isChain = (c) => Object.values(Chain).includes(c);
/**
 * Convert chain to string.
 *
 * @param {Chain} chainId.
 * @returns {string} The string based on the given chain type.
 */
const chainToString = Object.assign((chainId) => {
    if (!(chainId in chainToString))
        return 'unknown chain';
    return chainToString[chainId];
}, {
    [Chain.THORChain]: 'Thorchain',
    [Chain.Bitcoin]: 'Bitcoin',
    [Chain.BitcoinCash]: 'Bitcoin Cash',
    [Chain.Litecoin]: 'Litecoin',
    [Chain.Ethereum]: 'Ethereum',
    [Chain.Binance]: 'Binance Chain',
    [Chain.Cosmos]: 'Cosmos',
    [Chain.Polkadot]: 'Polkadot',
    [Chain.Terra]: 'Terra',
    [Chain.Doge]: 'Dogecoin',
});

/**
 * Removes leading / trailing zeros from a string of numbers
 * (1) Regex to remove trailing zeros https://stackoverflow.com/a/53397618/2032698
 * (2) Regex to remove leading zeros https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch06s06.html
 *
 * @param {string} value
 * @returns {string} The result after removing trailing zeros.
 */
const trimZeros = (value) => value
    // (1) remove trailing zeros
    .replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1')
    // (2) remove leading zeros
    .replace(/\b0*([1-9][0-9]*|0)\b/, '$1');

var Denomination;
(function (Denomination) {
    /**
     * values for asset amounts in base units (no decimal)
     */
    Denomination["Base"] = "BASE";
    /**
     * values of asset amounts (w/ decimal)
     */
    Denomination["Asset"] = "ASSET";
})(Denomination || (Denomination = {}));

/**
 * Guard to check whether value is a BigNumber.Value or not
 *
 * @param {unknown} v
 * @returns {boolean} `true` or `false`.
 * */
const isBigNumberValue = (v) => typeof v === 'string' || typeof v === 'number' || v instanceof BigNumber;
/**
 * Default number of asset decimals
 * For history reason and by starting the project on Binance chain assets, it's 8 decimal.
 *
 * For example:
 * ```
 * RUNE has a maximum of 8 digits of decimal
 * 0.00000001 RUNE == 1 ð (tor)
 * ```
 * */
const ASSET_DECIMAL = 8;
/**
 * Factory to create values of assets (e.g. RUNE)
 *
 * @param {string|number|BigNumber|undefined} value - The asset amount, If the value is undefined, AssetAmount with value `0` will be returned.
 * @param {number} decimal The decimal places. (optional)
 * @returns {AssetAmount} The asset amount from the given value and decimal.
 *
 **/
const assetAmount = (value, decimal = ASSET_DECIMAL) => {
    const amount = fixedBN(value, decimal);
    return {
        type: Denomination.Asset,
        amount: () => amount,
        plus: (v, d = decimal) => assetAmount(amount.plus(isBigNumberValue(v) ? v : v.amount()), d),
        minus: (v, d = decimal) => assetAmount(amount.minus(isBigNumberValue(v) ? v : v.amount()), d),
        times: (v, d = decimal) => assetAmount(amount.times(isBigNumberValue(v) ? v : v.amount()), d),
        div: (v, d = decimal) => assetAmount(amount.div(isBigNumberValue(v) ? v : v.amount()), d),
        lt: (v) => amount.lt(isBigNumberValue(v) ? v : v.amount()),
        lte: (v) => amount.lte(isBigNumberValue(v) ? v : v.amount()),
        gt: (v) => amount.gt(isBigNumberValue(v) ? v : v.amount()),
        gte: (v) => amount.gte(isBigNumberValue(v) ? v : v.amount()),
        eq: (v) => amount.eq(isBigNumberValue(v) ? v : v.amount()),
        decimal,
    };
};
/**
 * Factory to create base amounts (e.g. tor)
 *
 * @param {string|number|BigNumber|undefined} value - The base amount, If the value is undefined, BaseAmount with value `0` will be returned.
 * @param {number} decimal The decimal places of its associated AssetAmount. (optional)
 * @returns {BaseAmount} The base amount from the given value and decimal.
 **/
const baseAmount = (value, decimal = ASSET_DECIMAL) => {
    const amount = fixedBN(value, 0);
    return {
        type: Denomination.Base,
        amount: () => amount,
        plus: (v, d = decimal) => baseAmount(amount.plus(isBigNumberValue(v) ? v : v.amount()), d),
        minus: (v, d = decimal) => baseAmount(amount.minus(isBigNumberValue(v) ? v : v.amount()), d),
        times: (v, d = decimal) => baseAmount(amount.times(isBigNumberValue(v) ? v : v.amount()), d),
        div: (v, d = decimal) => baseAmount(amount.div(isBigNumberValue(v) ? v : v.amount()).decimalPlaces(0, BigNumber.ROUND_DOWN), d),
        lt: (v) => amount.lt(isBigNumberValue(v) ? v : v.amount()),
        lte: (v) => amount.lte(isBigNumberValue(v) ? v : v.amount()),
        gt: (v) => amount.gt(isBigNumberValue(v) ? v : v.amount()),
        gte: (v) => amount.gte(isBigNumberValue(v) ? v : v.amount()),
        eq: (v) => amount.eq(isBigNumberValue(v) ? v : v.amount()),
        decimal,
    };
};
/**
 * Helper to convert values for a asset from base values (e.g. RUNE from tor)
 *
 * @param {BaseAmount} base
 * @returns {AssetAmount} The asset amount from the given base amount.
 * */
const baseToAsset = (base) => {
    const decimal = base.decimal;
    const value = base
        .amount()
        .div(Math.pow(10, decimal))
        .decimalPlaces(decimal);
    return assetAmount(value, decimal);
};
/**
 * Helper to convert asset to base values (e.g. tor -> RUNE)
 *
 * @param {AssetAmount} asset
 * @returns {BaseAmount} The base amount from the given AssetAmount.
 * */
const assetToBase = (asset) => {
    const value = asset
        .amount()
        .multipliedBy(Math.pow(10, asset.decimal))
        .integerValue();
    return baseAmount(value, asset.decimal);
};
/**
 * Guard to check whether value is an amount of asset or not
 *
 * @param {Amount<Denomination>} v
 * @returns {boolean} `true` or `false`.
 * */
const isAssetAmount = (v) => v.type === Denomination.Asset;
/**
 * Guard to check whether value is an amount of a base value or not
 *
 * @param {Amount<Denomination>} v
 * @returns {boolean} `true` or `false`.
 * */
const isBaseAmount = (v) => v.type === Denomination.Base;
/**
 * Formats an `AssetAmount` into `string` based on decimal places
 *
 * If `decimal` is not set, `amount.decimal` is used
 * Note: `trimZeros` wins over `decimal`
 *
 * @param {Params} param The asset amount format options.
 * @returns {string} The formatted asset amount string from the given options.
 */
const formatAssetAmount = ({ amount, decimal, trimZeros: trimZeros$1 = false, }) => {
    // strict check for `undefined` value as negate of 0 will return true and passed decimal value will be ignored
    const formatted = formatBN(amount.amount(), decimal === undefined ? amount.decimal : decimal);
    // Note: `trimZeros` wins over `decimal`
    return trimZeros$1 ? trimZeros(formatted) : formatted;
};
/**
 * Formats a `BaseAmount` value into a `string`
 *
 * @param {BaseAmount} amount
 * @returns {string} The formatted base amount string from the given base amount.
 */
const formatBaseAmount = (amount) => formatBN(amount.amount(), 0);
/**
 * Base "chain" asset of Binance chain.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
const AssetBNB = { chain: Chain.Binance, symbol: 'BNB', ticker: 'BNB', synth: false };
/**
 * Base "chain" asset on bitcoin main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
const AssetBTC = { chain: Chain.Bitcoin, symbol: 'BTC', ticker: 'BTC', synth: false };
/**
 * Base "chain" asset on bitcoin cash main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
const AssetBCH = { chain: Chain.BitcoinCash, symbol: 'BCH', ticker: 'BCH', synth: false };
/**
 * Base "chain" asset on litecoin main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
const AssetLTC = { chain: Chain.Litecoin, symbol: 'LTC', ticker: 'LTC', synth: false };
/**
 * Dogecoin asset
 * Based on definition in Thorchain
 * @see https://gitlab.com/thorchain/thornode/-/blob/781-add-doge-chain/common/asset.go#L24
 */
const AssetDOGE = { chain: Chain.Doge, symbol: 'DOGE', ticker: 'DOGE', synth: false };
const RUNE_TICKER = 'RUNE';
/**
 * Base "chain" asset on ethereum main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
const AssetETH = { chain: Chain.Ethereum, symbol: 'ETH', ticker: 'ETH', synth: false };
/**
 * Base "chain" asset for RUNE-67C on Binance test net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
const AssetRune67C = { chain: Chain.Binance, symbol: 'RUNE-67C', ticker: RUNE_TICKER, synth: false };
/**
 * Base "chain" asset for RUNE-B1A on Binance main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
const AssetRuneB1A = { chain: Chain.Binance, symbol: 'RUNE-B1A', ticker: RUNE_TICKER, synth: false };
/**
 * Base "chain" asset on thorchain main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
const AssetRuneNative = { chain: Chain.THORChain, symbol: RUNE_TICKER, ticker: RUNE_TICKER, synth: false };
/**
 * Base "chain" asset for RUNE on ethereum main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
const AssetRuneERC20 = {
    chain: Chain.Ethereum,
    symbol: `${RUNE_TICKER}-0x3155ba85d5f96b2d030a4966af206230e46849cb`,
    ticker: RUNE_TICKER,
    synth: false,
};
/**
 * Base "chain" asset for RUNE on ethereum main net.
 *
 * Based on definition in Thorchain `common`
 * @see https://gitlab.com/thorchain/thornode/-/blob/master/common/asset.go#L12-24
 */
const AssetRuneERC20Testnet = {
    chain: Chain.Ethereum,
    symbol: `${RUNE_TICKER}-0xd601c6A3a36721320573885A8d8420746dA3d7A0`,
    ticker: RUNE_TICKER,
    synth: false,
};
/**
 * Helper to check whether asset is valid
 *
 * @param {Asset} asset
 * @returns {boolean} `true` or `false`
 */
const isValidAsset = (asset) => !!asset.chain && !!asset.ticker && !!asset.symbol;
/**
 * Helper to check whether an asset is synth asset
 *
 * @param {Asset} asset
 * @returns {boolean} `true` or `false`
 */
const isSynthAsset = ({ synth }) => synth;
const SYNTH_DELIMITER = '/';
const NON_SYNTH_DELIMITER = '.';
/**
 * Creates an `Asset` by a given string
 *
 * This helper function expects a string with following naming convention:
 * `AAA.BBB-CCC`
 * where
 * chain: `AAA`
 * ticker (optional): `BBB`
 * symbol: `BBB-CCC` or `CCC` (if no ticker available)
 *
 * @see  https://docs.thorchain.org/developers/transaction-memos#asset-notation
 *
 * If the naming convention fails, it returns null
 *
 * @param {string} s The given string.
 * @returns {Asset|null} The asset from the given string.
 */
const assetFromString = (s) => {
    var _a;
    const isSynth = s.includes(SYNTH_DELIMITER);
    const delimiter = isSynth ? SYNTH_DELIMITER : NON_SYNTH_DELIMITER;
    const data = s.split(delimiter);
    if (data.length <= 1 || ((_a = data[1]) === null || _a === void 0 ? void 0 : _a.length) < 1) {
        return null;
    }
    const chain = data[0];
    // filter out not supported string of chains
    if (!chain || !isChain(chain))
        return null;
    const symbol = data[1];
    const ticker = symbol.split('-')[0];
    return { chain, symbol, ticker, synth: isSynth };
};
/**
 * Returns an `Asset` as a string using following naming convention:
 *
 * `AAA.BBB-CCC`
 * where
 * chain: `AAA`
 * ticker (optional): `BBB`
 * symbol: `BBB-CCC` or `CCC` (if no ticker available)
 * symbol (synth): `BBB/CCC` or `CCC` (if no ticker available)
 *
 * @see https://docs.thorchain.org/developers/transaction-memos#asset-notation
 *
 * @param {Asset} asset The given asset.
 * @returns {string} The string from the given asset.
 */
const assetToString = ({ chain, symbol, synth }) => {
    const delimiter = synth ? SYNTH_DELIMITER : NON_SYNTH_DELIMITER;
    return `${chain}${delimiter}${symbol}`;
};
/**
 * Currency symbols currently supported
 */
var AssetCurrencySymbol;
(function (AssetCurrencySymbol) {
    AssetCurrencySymbol["RUNE"] = "\u16B1";
    AssetCurrencySymbol["BTC"] = "\u20BF";
    AssetCurrencySymbol["SATOSHI"] = "\u26A1";
    AssetCurrencySymbol["ETH"] = "\u039E";
    AssetCurrencySymbol["USD"] = "$";
})(AssetCurrencySymbol || (AssetCurrencySymbol = {}));
/**
 * Returns currency symbols by given `Asset`
 *
 * @param {Asset} asset The given asset.
 * @returns {string} The currency symbol from the given asset.
 */
const currencySymbolByAsset = ({ ticker }) => {
    switch (true) {
        case ticker === RUNE_TICKER:
            return AssetCurrencySymbol.RUNE;
        case ticker === AssetBTC.ticker:
            return AssetCurrencySymbol.BTC;
        case ticker === AssetETH.ticker:
            return AssetCurrencySymbol.ETH;
        case ticker.includes('USD') || ticker.includes('UST'):
            return AssetCurrencySymbol.USD;
        default:
            return ticker;
    }
};
/**
 * Formats an asset amount using its currency symbol
 *
 * If `decimal` is not set, `amount.decimal` is used
 * If `asset` is not set, `$` will be used as currency symbol by default
 * `trimZeros` is `false` by default
 * Note: `trimZeros` wins over `decimal`
 *
 * @param {Params} params The asset amount currency format options.
 * @return {string} The formatted asset amount string using its currency format.
 */
const formatAssetAmountCurrency = ({ amount, asset, decimal, trimZeros: shouldTrimZeros = false, }) => {
    var _a;
    const amountFormatted = formatAssetAmount({
        amount,
        // strict check for `undefined` value as negate of 0 will return true and passed decimal value will be ignored
        decimal: decimal === undefined ? amount.decimal : decimal,
        trimZeros: shouldTrimZeros,
    });
    const ticker = (_a = asset === null || asset === void 0 ? void 0 : asset.ticker) !== null && _a !== void 0 ? _a : '';
    if (ticker) {
        // RUNE
        if (ticker === RUNE_TICKER)
            return `${AssetCurrencySymbol.RUNE} ${amountFormatted}`;
        // BTC
        let regex = new RegExp(AssetBTC.ticker, 'i');
        if (ticker.match(new RegExp(AssetBTC.ticker, 'i'))) {
            const base = assetToBase(amount);
            // format all < ₿ 0.01 in statoshi
            if (base.amount().isLessThanOrEqualTo('1000000')) {
                return `${AssetCurrencySymbol.SATOSHI} ${formatBaseAmount(base)}`;
            }
            return `${AssetCurrencySymbol.BTC} ${amountFormatted}`;
        }
        // ETH
        regex = new RegExp(AssetETH.ticker, 'i');
        if (ticker.match(regex))
            return `${AssetCurrencySymbol.ETH} ${amountFormatted}`;
        // USD
        regex = new RegExp('USD', 'i');
        if (ticker.match('USD'))
            return `${AssetCurrencySymbol.USD} ${amountFormatted}`;
        return `${amountFormatted} ${ticker}`;
    }
    return `$ ${amountFormatted}`;
};
/**
 * Formats a `BaseAmount` into a string of an `AssetAmount`
 *
 * If `decimal` is not set, `amount.decimal` is used
 * Note: `trimZeros` wins over `decimal`
 *
 * @param {Params} params The base amount currency format options.
 * @return {string} The formatted base amount string using its currency format.
 */
const formatBaseAsAssetAmount = ({ amount, decimal, trimZeros = false, }) => formatAssetAmount({ amount: baseToAsset(amount), decimal, trimZeros });
/**
 * Checks equality of two `Assets`
 * @param {Asset} a Asset one
 * @param {Asset} b Asset two
 * @return {boolean} Result of equality check
 */
const eqAsset = (a, b) => a.chain === b.chain && a.symbol === b.symbol && a.ticker === b.ticker && a.synth === b.synth;

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const axios = require('axios');
const midgardBaseUrls = {
    [Network.Testnet]: ['https://testnet.midgard.thorchain.info'],
    [Network.Mainnet]: ['https://midgard.ninerealms.com', 'https://midgard.thorswap.net'],
};
const getMimirDetails = (network = Network.Mainnet) => __awaiter(void 0, void 0, void 0, function* () {
    const path = '/v2/thorchain/mimir';
    for (const baseUrl of midgardBaseUrls[network]) {
        try {
            const { data } = yield axios.get(`${baseUrl}${path}`);
            return data;
        }
        catch (e) {
            console.error(e);
        }
    }
    throw new Error('Midgard not responding');
});
const getAllInboundDetails = (network = Network.Mainnet) => __awaiter(void 0, void 0, void 0, function* () {
    const path = '/v2/thorchain/inbound_addresses';
    for (const baseUrl of midgardBaseUrls[network]) {
        try {
            const { data } = yield axios.get(`${baseUrl}${path}`);
            return data;
        }
        catch (e) {
            console.error(e);
        }
    }
    throw new Error('Midgard not responding');
});
const getInboundDetails = (chain, network = Network.Mainnet) => __awaiter(void 0, void 0, void 0, function* () {
    const [mimirDetails, allInboundDetails] = yield Promise.all([getMimirDetails(network), getAllInboundDetails(network)]);
    const inboundDetail = allInboundDetails === null || allInboundDetails === void 0 ? void 0 : allInboundDetails.find((item) => item.chain === chain);
    const details = {
        vault: (inboundDetail === null || inboundDetail === void 0 ? void 0 : inboundDetail.address) || '',
        haltedChain: (inboundDetail === null || inboundDetail === void 0 ? void 0 : inboundDetail.halted) || !!mimirDetails[`HALT${chain}CHAIN`] || !!mimirDetails['HALTCHAINGLOBAL'],
        haltedTrading: !!mimirDetails['HALTTRADING'] || !!mimirDetails[`HALT${chain}TRADING`],
        haltedLP: !!mimirDetails['PAUSELP'] || !!mimirDetails[`PAUSELP${chain}`],
    };
    if (inboundDetail === null || inboundDetail === void 0 ? void 0 : inboundDetail.router)
        details.router = inboundDetail.router;
    return details;
});

export { AssetBCH, AssetBNB, AssetBTC, AssetCurrencySymbol, AssetDOGE, AssetETH, AssetLTC, AssetRune67C, AssetRuneB1A, AssetRuneERC20, AssetRuneERC20Testnet, AssetRuneNative, BCHChain, BNBChain, BTCChain, Chain, CosmosChain, DOGEChain, Denomination, ETHChain, LTCChain, PolkadotChain, RUNE_TICKER, THORChain, TerraChain, assetAmount, assetFromString, assetToBase, assetToString, baseAmount, baseToAsset, bn, bnOrZero, chainToString, currencySymbolByAsset, delay, eqAsset, fixedBN, formatAssetAmount, formatAssetAmountCurrency, formatBN, formatBNCurrency, formatBaseAmount, formatBaseAsAssetAmount, getAllInboundDetails, getInboundDetails, getMimirDetails, isAssetAmount, isBaseAmount, isBigNumberValue, isChain, isSynthAsset, isValidAsset, isValidBN, trimZeros, validBNOrZero };
//# sourceMappingURL=index.esm.js.map
