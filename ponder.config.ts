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
      address: "0xaa46a6f539E26F64dd189eeeee95dCfc36198AeA",
      startBlock: 29887242,
    },
    ZkVoting: {
      chain: "baseSepolia",
      abi: ZkVotingAbi,
      address: factory({
        address: "0xaa46a6f539E26F64dd189eeeee95dCfc36198AeA",
        event: parseAbiItem(
          "event VotingCreated(address indexed creator, address indexed voting, string question)"
        ),
        parameter: "voting",
        // (Optional) scan the factory’s whole history for children:
        startBlock: 29887242,
      }),

      startBlock: 29887242,
    },
  },
});
