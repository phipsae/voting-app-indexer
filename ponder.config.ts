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
      address: "0x20170De392C8E8b101C4284E4798E5245D5Bc66f",
      startBlock: 30056488,
    },
    ZkVoting: {
      chain: "baseSepolia",
      abi: ZkVotingAbi,
      address: factory({
        address: "0x20170De392C8E8b101C4284E4798E5245D5Bc66f",
        event: parseAbiItem(
          "event VotingCreated(address indexed creator, address indexed voting, string question)"
        ),
        parameter: "voting",
        // (Optional) scan the factory’s whole history for children:
        startBlock: 30056488,
      }),

      startBlock: 30056488,
    },
  },
});
