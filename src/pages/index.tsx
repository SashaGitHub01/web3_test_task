import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Button } from "@mui/material";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Typography from "@mui/material/Typography";

const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export default function Home() {
  const { activate, active, deactivate, account } =
    useWeb3React<Web3Provider>();

  const handleActive = () => {
    activate(injectedConnector);
  };

  const handleDisconnect = () => {
    deactivate();
  };

  return (
    <div>
      {active ? (
        <div>
          <Typography variant="h6">Account: {account}</Typography>
          <Button variant="contained" color="error" onClick={handleDisconnect}>
            Disconnect
          </Button>
        </div>
      ) : (
        <Button variant="contained" onClick={handleActive}>
          Connect to Metamask
        </Button>
      )}
    </div>
  );
}
