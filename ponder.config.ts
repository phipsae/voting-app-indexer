import { createConfig, factory } from "ponder";
import { parseAbiItem } from "viem";

import { ZkVotingAbi, ZkVotingFactoryAbi } from "./abis/ExampleContractAbi";

const ZK_VOTING_FACTORY_ADDRESS_MAINNET =
  "0xDD05E565B844469cb02bcCdD50f94C92aC8bBA13";
const ZK_VOTING_FACTORY_ADDRESS_BASE =
  "0xa795585dC21A768bf4b3B7e37a4b698A704f5ec8";
const START_BLOCK_MAINNET = 23376465;
const START_BLOCK_BASE = 36911098;

export default createConfig({
  chains: {
    mainnet: {
      id: 1,
      rpc: process.env.PONDER_RPC_MAINNET!,
    },
    baseSepolia: {
      id: 84532,
      rpc: process.env.PONDER_RPC_BASE_SEPOLIA!,
    },
    base: {
      id: 8453,
      rpc: process.env.PONDER_RPC_BASE!,
    },
    sepolia: {
      id: 11155111,
      rpc: process.env.PONDER_RPC_SEPOLIA!,
    },
  },
  contracts: {
    /// baseSepolia
    //   ZkVotingFactory: {
    //     chain: "baseSepolia",
    //     abi: ZkVotingFactoryAbi,
    //     address: ZK_VOTING_FACTORY_ADDRESS,
    //     startBlock: START_BLOCK,
    //   },
    //   ZkVoting: {
    //     chain: "baseSepolia",
    //     abi: ZkVotingAbi,
    //     address: factory({
    //       address: ZK_VOTING_FACTORY_ADDRESS,
    //       event: parseAbiItem(
    //         "event VotingCreated(address indexed creator, address indexed voting, string question)"
    //       ),
    //       parameter: "voting",
    //       // (Optional) scan the factory’s whole history for children:
    //       startBlock: START_BLOCK,
    //     }),

    //     startBlock: START_BLOCK,
    //   },
    // },
    /// Sepolia //////
    //   ZkVotingFactory: {
    //     chain: "sepolia",
    //     abi: ZkVotingFactoryAbi,
    //     address: ZK_VOTING_FACTORY_ADDRESS,
    //     startBlock: START_BLOCK,
    //   },
    //   ZkVoting: {
    //     chain: "sepolia",
    //     abi: ZkVotingAbi,
    //     address: factory({
    //       address: ZK_VOTING_FACTORY_ADDRESS,
    //       event: parseAbiItem(
    //         "event VotingCreated(address indexed creator, address indexed voting, string question)"
    //       ),
    //       parameter: "voting",
    //       // (Optional) scan the factory’s whole history for children:
    //       startBlock: START_BLOCK,
    //     }),

    //     startBlock: START_BLOCK,
    //   },
    // },
    ///////////////
    /// Mainnet ///
    ///////////////
    // ZkVotingFactoryMainnet: {
    //   chain: "mainnet",
    //   abi: ZkVotingFactoryAbi,
    //   address: ZK_VOTING_FACTORY_ADDRESS_MAINNET,
    //   startBlock: START_BLOCK_MAINNET,
    // },
    // ZkVotingMainnet: {
    //   chain: "mainnet",
    //   abi: ZkVotingAbi,
    //   address: factory({
    //     address: ZK_VOTING_FACTORY_ADDRESS_MAINNET,
    //     event: parseAbiItem(
    //       "event VotingCreated(address indexed creator, address indexed voting, string question)"
    //     ),
    //     parameter: "voting",
    //     // (Optional) scan the factory’s whole history for children:
    //     startBlock: START_BLOCK_MAINNET,
    //   }),

    //   startBlock: START_BLOCK_MAINNET,
    // },
    ///////////////
    /// Base ///
    ///////////////
    ZkVotingFactoryBase: {
      chain: "base",
      abi: ZkVotingFactoryAbi,
      address: ZK_VOTING_FACTORY_ADDRESS_BASE,
      startBlock: START_BLOCK_BASE,
    },
    ZkVotingBase: {
      chain: "base",
      abi: ZkVotingAbi,
      address: factory({
        address: ZK_VOTING_FACTORY_ADDRESS_BASE,
        event: parseAbiItem(
          "event VotingCreated(address indexed creator, address indexed voting, string question)"
        ),
        parameter: "voting",
        // (Optional) scan the factory’s whole history for children:
        startBlock: START_BLOCK_BASE,
      }),

      startBlock: START_BLOCK_BASE,
    },
  },
});
