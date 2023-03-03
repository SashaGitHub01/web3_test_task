import { connectNftContract, connectTestContract } from "@/connectors";
import {
  TEST_CONTRACT_ADDRESS,
  TOKEN_TYPE,
  NFT_CONTRACT_ADDRESS,
} from "@/constants";
import { IEventData } from "@/types/IEventData.interface";
import { INftMetadata } from "@/types/NftMetadata.interface";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { ethers } from "ethers";

export const useContracts = () => {
  const { library, account } = useWeb3React<Web3Provider>();

  const fetchNftsOfAddress = async (address: string) => {
    try {
      const nfts: INftMetadata[] = [];
      const signer = library?.getSigner();

      if (!!signer) {
        const contract = connectNftContract(signer);
        const balance = await contract.balanceOf(address);

        for (let i = 0; i < Number(balance); i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(address, i);
          const tokenUri = await contract.tokenURI(tokenId);
          const { data: tokenMetadata } = await axios.get<
            Omit<INftMetadata, "tokenId">
          >(tokenUri);

          nfts.push({ ...tokenMetadata, tokenId: +tokenId });
        }
      }

      return nfts;
    } catch (err) {
      throw new Error("Approve Error");
    }
  };

  const approveToken = async (tokenId: number) => {
    try {
      const signer = library?.getSigner();

      if (!!signer && !!account) {
        const contract = connectNftContract(signer);
        await contract.approve(TEST_CONTRACT_ADDRESS, tokenId);
      }
    } catch (err) {
      throw new Error("Error");
    }
  };

  const claimToken = async (tokenId: number) => {
    try {
      const signer = library?.getSigner();

      if (!!signer && !!account) {
        const contract = connectTestContract(signer);

        await contract.claimToken(account, {
          tokenType: TOKEN_TYPE,
          collection: NFT_CONTRACT_ADDRESS,
          identifier: tokenId,
          amount: 1,
        });
      }
    } catch (err) {
      throw new Error("Error");
    }
  };

  const claimedHistory = async () => {
    try {
      const signer = library?.getSigner();

      if (!!signer && !!account) {
        const contract = connectTestContract(signer);
        const event = contract.filters.Claimed(account);
        const eventData = await contract.queryFilter(event);
        return eventData.map<IEventData>((event) => {
          return {
            from: event.args.from,
            tokenId: String(event.args.identifier),
          };
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkTokenApproved = async (tokenId: number) => {
    try {
      const signer = library?.getSigner()!;
      const contract = connectNftContract(signer);
      const approvedAddress = await contract.getApproved(tokenId);
      return approvedAddress === ethers.constants.AddressZero
        ? null
        : approvedAddress;
    } catch (err) {
      throw new Error("Error");
    }
  };

  return {
    fetchNftsOfAddress,
    approveToken,
    claimToken,
    claimedHistory,
    checkTokenApproved,
  };
};
