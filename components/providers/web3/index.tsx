import { createContext, useContext, useEffect, useState } from "react";
import {
  Web3State,
  createDefaultState,
  createWeb3State,
  loadContract,
} from "./utils";
import { ethers } from "ethers";

type Props = {
  children: React.ReactNode;
};

const defaultState = createDefaultState();

const Web3Context = createContext<Web3State>(defaultState);

const Web3Provider: React.FC<Props> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(defaultState);

  useEffect(() => {
    async function initWeb3() {
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const contract = await loadContract("NftMarket", provider);

      setWeb3Api(
        createWeb3State({
          ethereum: window.ethereum,
          provider,
          contract,
          isLoading: false,
        })
      );
    }

    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks() {
  const { hooks } = useWeb3();
  return hooks;
}

export default Web3Provider;
