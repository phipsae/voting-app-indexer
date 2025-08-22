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
      address: "0x78d26E650cD682AF83D102dC92EFA431ac2044d3",
      startBlock: 30058093,
    },
    ZkVoting: {
      chain: "baseSepolia",
      abi: ZkVotingAbi,
      address: factory({
        address: "0x78d26E650cD682AF83D102dC92EFA431ac2044d3",
        event: parseAbiItem(
          "event VotingCreated(address indexed creator, address indexed voting, string question)"
        ),
        parameter: "voting",
        // (Optional) scan the factory’s whole history for children:
        startBlock: 30058093,
      }),

      startBlock: 30058093,
    },
  },
});
