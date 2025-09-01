import { createConfig, factory } from "ponder";
import { parseAbiItem } from "viem";

import { ZkVotingAbi, ZkVotingFactoryAbi } from "./abis/ExampleContractAbi";

const ZK_VOTING_FACTORY_ADDRESS = "0x80D0c650C28C5314933901e8Ef34D7610bd9ed9E";
const START_BLOCK = 30494415;

export default createConfig({
  chains: {
    mainnet: {
      id: 1,
      rpc: process.env.PONDER_RPC_URL_1!,
    },
    baseSepolia: {
      id: 84532,
      rpc: process.env.PONDER_RPC_BASE_SEPOLIA!,
    },
    base: {
      id: 8453,
      rpc: process.env.PONDER_RPC_BASE!,
    },
  },
  contracts: {
    // ZkVoting: {
    //   chain: "baseSepolia",
    //   abi: ZkVotingAbi,
    //   address: "0x584d85D63Bc918721198078538DB3648d2f62275",
    //   startBlock: 29619310,
    // },
    ZkVotingFactory: {
      chain: "baseSepolia",
      abi: ZkVotingFactoryAbi,
      address: ZK_VOTING_FACTORY_ADDRESS,
      startBlock: START_BLOCK,
    },
    ZkVoting: {
      chain: "baseSepolia",
      abi: ZkVotingAbi,
      address: factory({
        address: ZK_VOTING_FACTORY_ADDRESS,
        event: parseAbiItem(
          "event VotingCreated(address indexed creator, address indexed voting, string question)"
        ),
        parameter: "voting",
        // (Optional) scan the factory’s whole history for children:
        startBlock: START_BLOCK,
      }),

      startBlock: START_BLOCK,
    },
  },
});
