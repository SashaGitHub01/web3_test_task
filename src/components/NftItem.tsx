import { IContractsContext } from "@/pages/_app";
import { INftMetadata } from "@/types/NftMetadata.interface";
import { Typography, Paper, Box, Button } from "@mui/material";
import React, { PropsWithChildren, useEffect, useState } from "react";

interface NftItemProps
  extends INftMetadata,
    Omit<IContractsContext, "fetchNftsOfAddress" | "claimedHistory"> {}

const NftItem: React.FC<PropsWithChildren<NftItemProps>> = ({
  name,
  image,
  tokenId,
  approveToken,
  checkTokenApproved,
  claimToken,
}) => {
  const [approved, setApproved] = useState<boolean>(false);

  useEffect(() => {
    checkTokenApproved(tokenId).then((res) => setApproved(!!res));
  }, [tokenId]);

  const handleApprove = async () => {
    try {
      await approveToken(tokenId);
      console.log("first");
      setApproved(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClaim = async () => {
    try {
      await claimToken(tokenId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Typography>Name: {name}</Typography>
      <Paper sx={{ width: "200px" }}>
        <Box sx={{ height: "200px", marginBottom: "20px" }}>
          <img src={image} alt="nft" />
        </Box>
        {!!approved ? (
          <Button onClick={handleClaim} variant="contained" color="success">
            Claim NFT
          </Button>
        ) : (
          <Button onClick={handleApprove} variant="contained">
            Approve NFT
          </Button>
        )}
      </Paper>
    </div>
  );
};

export default NftItem;
