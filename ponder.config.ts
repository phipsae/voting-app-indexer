import { createConfig, factory } from "ponder";
import { parseAbiItem } from "viem";

import { ZkVotingAbi, ZkVotingFactoryAbi } from "./abis/ExampleContractAbi";

const ZK_VOTING_FACTORY_ADDRESS_BASE =
  "0x678043eD0f934dC07F2ed5BB7B29F49bda091f0a";
const START_BLOCK_BASE = 37529913;

export default createConfig({
  chains: {
    base: {
      id: 8453,
      rpc: process.env.PONDER_RPC_BASE!,
    },
  },
  contracts: {
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
