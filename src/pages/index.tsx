/* eslint-disable @next/next/no-img-element */
import { Box, Button, Divider, Paper } from "@mui/material";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useEffect, useState } from "react";
import { INftMetadata } from "@/types/NftMetadata.interface";
import NftItem from "@/components/NftItem";
import { IEventData } from "@/types/IEventData.interface";
import EventsTable from "@/components/EventsTable";
import { useContractsContext } from "@/context/ContractsContext";

const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export default function Home() {
  const [history, setHistory] = useState<IEventData[]>([]);
  const [tokens, setTokens] = useState<INftMetadata[]>([]);
  const {
    fetchNftsOfAddress,
    claimedHistory,
    checkTokenApproved,
    approveToken,
    claimToken,
  } = useContractsContext();
  const { activate, active, deactivate, account } =
    useWeb3React<Web3Provider>();

  useEffect(() => {
    if (account) {
      claimedHistory().then((res) => {
        if (res) {
          setHistory(res);
        }
      });

      fetchNftsOfAddress(account).then((res) => setTokens(res));
    } else {
      setTokens([]);
    }
  }, [account, fetchNftsOfAddress, claimedHistory]);

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
          <EventsTable items={history} />
          <div className="list">
            <Typography>Address NFT:</Typography>
            {tokens.map((token) => {
              return (
                <NftItem
                  claimToken={claimToken}
                  checkTokenApproved={checkTokenApproved}
                  approveToken={approveToken}
                  key={token.tokenId}
                  {...token}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <Button variant="contained" onClick={handleActive}>
          Connect to Metamask
        </Button>
      )}
    </div>
  );
}
