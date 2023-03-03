import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { ContractsContextProvider } from "@/context/ContractsContext";

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
