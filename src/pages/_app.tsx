import React, { PropsWithChildren, useEffect, useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Web3Provider, Provider } from "@ethersproject/providers";
import {
  NftContract,
  NftContract__factory,
} from "../../types/ethers-contracts";
import { NFT_CONTRACT_ADDRESS } from "@/constants";
import { Signer, ethers } from "ethers";

export const connectNftContract = (signerOrProvider: Signer | Provider) => {
  return NftContract__factory.connect(NFT_CONTRACT_ADDRESS, signerOrProvider);
};

export const ContractsContext = React.createContext({});

export const ContractsContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { library, account } = useWeb3React<Web3Provider>();
  const [nftContract, setNftContract] = useState<NftContract | null>(null);

  useEffect(() => {
    if (!!account && !!library?.provider) {
      const signer = new ethers.BrowserProvider(library?.provider as any)
        .getSigner()
        .then((res) => {
          const contract = connectNftContract(res);
          console.log(
            contract
              .balanceOf(res.address)
              .then((b) => console.log(b?.toString()))
          );
          setNftContract(contract);
        })
        .catch((err) => console.log("Error!"));
    }
  }, [account]);

  return (
    <ContractsContext.Provider value={{}}>{children}</ContractsContext.Provider>
  );
};

const getLibrary = (provider: any) => {
  console.log(provider);
  return new Web3Provider(provider);
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ContractsContextProvider>
        <Component {...pageProps} />
      </ContractsContextProvider>
    </Web3ReactProvider>
  );
}
