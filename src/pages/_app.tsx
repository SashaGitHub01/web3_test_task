import React, { PropsWithChildren, useEffect } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

export const ContractsContext = React.createContext({});

export const ContractsContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ContractsContext.Provider value={{}}>{children}</ContractsContext.Provider>
  );
};

const getLibrary = (provider: any) => {
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
