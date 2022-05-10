import { Network } from '@xchainjs/xchain-client';
import { Chain } from './chain';
import { InboundDetail, ServerInboundDetail } from './types';
export declare const getMimirDetails: (network?: Network) => Promise<any>;
export declare const getAllInboundDetails: (network?: Network) => Promise<Array<ServerInboundDetail>>;
export declare const getInboundDetails: (chain: Chain, network?: Network) => Promise<InboundDetail>;
