import React, { PropsWithChildren, useContext } from "react";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import {
  NftContract__factory,
  TestReceiverContract__factory,
} from "@/types/ethers-contracts";
import {
  NFT_CONTRACT_ADDRESS,
  TEST_CONTRACT_ADDRESS,
  TOKEN_TYPE,
} from "@/constants";
import { ethers } from "ethers";
import axios from "axios";
import { INftMetadata } from "@/types/NftMetadata.interface";
import { IEventData } from "@/types/IEventData.interface";
import { useContracts } from "@/hooks/useContracts";

export interface IContractsContext {
  fetchNftsOfAddress: (address: string) => Promise<INftMetadata[]>;
  checkTokenApproved: (tokenId: number) => Promise<string | null>;
  approveToken: (tokenId: number) => Promise<void>;
  claimToken: (tokenId: number) => Promise<void>;
  claimedHistory: () => Promise<IEventData[] | undefined>;
}

export const ContractsContext = React.createContext<IContractsContext>(
  {} as IContractsContext
);

export const useContractsContext = () => useContext(ContractsContext);

export const ContractsContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const {
    checkTokenApproved,
    fetchNftsOfAddress,
    approveToken,
    claimToken,
    claimedHistory,
  } = useContracts();

  return (
    <ContractsContext.Provider
      value={{
        checkTokenApproved,
        fetchNftsOfAddress,
        approveToken,
        claimToken,
        claimedHistory,
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};
