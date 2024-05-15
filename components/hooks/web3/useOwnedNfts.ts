import { CryptoHookFactory } from "@/types/hooks";
import { Nft } from "@/types/nft";
import { ethers } from "ethers";
import { useCallback } from "react";
import useSWR from "swr";

type UseOwnedNftsResponse = {
  listNft: (tokenId: number, price: number) => Promise<void>;
};
type OwnedNftsHookFactory = CryptoHookFactory<Nft[], UseOwnedNftsResponse>;

export type UseOwnedNftsHook = ReturnType<OwnedNftsHookFactory>;

export const hookFactory: OwnedNftsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? "web3/useOwnedNfts" : null,
      async () => {
        const nfts = [] as Nft[];
        const coreNfts = await contract!.getOwnedNfts();

        for (const item of coreNfts) {
          const tokenURI = await contract!.tokenURI(item.tokenId);
          const metaRes = await fetch(tokenURI);
          const meta = await metaRes.json();
          nfts.push({
            price: parseFloat(ethers.formatEther(item.price)),
            tokenId: item.tokenId,
            creator: item.creator,
            isListed: item.isListed,
            meta,
          });
        }

        return nfts;
      }
    );

    const _contract = contract;
    const listNft = useCallback(
      async (tokenId: number, price: number) => {
        try {
          await _contract!.placeNftOnSale(
            tokenId,
            ethers.parseEther(price.toString()),
            {
              value: ethers.parseEther("0.025"),
            }
          );

          alert("Item has been listed!");
        } catch (e: any) {
          console.error(e.message);
        }
      },
      [_contract]
    );

    return {
      ...swr,
      listNft,
      data: data || [],
    };
  };
