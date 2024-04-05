import { CryptoHookFactory } from "@/types/hooks";
import useSWR from "swr";

type AccountHookFactory = CryptoHookFactory<string, string>;

export type UseAccountHook = ReturnType<AccountHookFactory>;

export const hookFactory: AccountHookFactory = (deps) => (params) => {
  const swrRes = useSWR("web3/useAccount", () => {
    console.group(deps);
    console.log(params);
    return "Test User";
  });

  return swrRes;
};
