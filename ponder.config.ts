import { createConfig, factory } from "ponder";
import { parseAbiItem } from "viem";

import { ZkVotingAbi, ZkVotingFactoryAbi } from "./abis/ExampleContractAbi";

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
      chain: "base",
      abi: ZkVotingFactoryAbi,
      address: "0x8b698d8f63f078369C067d58A4CC4B529F219CF7",
      startBlock: 34578848,
    },
    ZkVoting: {
      chain: "base",
      abi: ZkVotingAbi,
      address: factory({
        address: "0x8b698d8f63f078369C067d58A4CC4B529F219CF7",
        event: parseAbiItem(
          "event VotingCreated(address indexed creator, address indexed voting, string question)"
        ),
        parameter: "voting",
        // (Optional) scan the factory’s whole history for children:
        startBlock: 34578848,
      }),

      startBlock: 34578848,
    },
  },
});
