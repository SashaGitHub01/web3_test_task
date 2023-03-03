import { NFT_CONTRACT_ADDRESS, TEST_CONTRACT_ADDRESS } from "@/constants";
import {
  NftContract__factory,
  TestReceiverContract__factory,
} from "@/types/ethers-contracts";

export const connectNftContract = (signerOrProvider: any) => {
  const nftContract = NftContract__factory.connect(
    NFT_CONTRACT_ADDRESS,
    signerOrProvider as any
  );

  return nftContract;
};

export const connectTestContract = (signerOrProvider: any) => {
  const testContract = TestReceiverContract__factory.connect(
    TEST_CONTRACT_ADDRESS,
    signerOrProvider as any
  );

  return testContract;
};
