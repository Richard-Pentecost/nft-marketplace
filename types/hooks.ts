import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract } from "ethers";
import { BrowserProvider } from "ethers";
import { SWRResponse } from "swr";

export type Web3Dependencies = {
  provider: BrowserProvider;
  contract: Contract;
  ethereum: MetaMaskInpageProvider;
};

export type CryptoHookFactory<D = any, P = any> = {
  (d: Partial<Web3Dependencies>): CryptoHandlerHook<D, P>;
};

export type CryptoHandlerHook<D = any, P = any> = (
  params: P
) => CryptoSWRResponse<D>;

export type CryptoSWRResponse<D = any> = SWRResponse<D>;

// This is one type representation of the 3 types above
// export type CryptoHookFactory<D = any, P = any> = {
//   (d: Partial<Web3Dependencies>): (params: P) => SWRResponse<D>;
// };
