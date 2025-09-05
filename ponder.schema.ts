// schema.ts - Network-First Organization
import { onchainTable, index } from "ponder";

// ===================
// MAINNET TABLES
// ===================
export const mainnetVotings = onchainTable("mainnet_votings", (t) => ({
  address: t.text().primaryKey(),
  creator: t.text().notNull(),
  question: t.text().notNull(),
  createdAtBlock: t.integer().notNull(),
  txHash: t.text().notNull(),
}));

export const mainnetLeaves = onchainTable(
  "mainnet_leaves",
  (t) => ({
    id: t.text().primaryKey(),
    votingAddress: t.text().notNull(),
    index: t.text().notNull(),
    indexNum: t.integer().notNull(),
    value: t.text().notNull(),
    blockNumber: t.integer().notNull(),
    txHash: t.text().notNull(),
  }),
  (t) => ({
    byVoting: index("mainnet_leaves_voting_idx").on(t.votingAddress),
    byVotingIndex: index("mainnet_leaves_voting_index_idx").on(
      t.votingAddress,
      t.indexNum
    ),
  })
);

export const mainnetVotes = onchainTable(
  "mainnet_votes",
  (t) => ({
    id: t.text().primaryKey(),
    nullifierHash: t.text().notNull(),
    voter: t.text().notNull(),
    vote: t.boolean().notNull(),
    timestamp: t.integer().notNull(),
    totalYes: t.text().notNull(),
    totalNo: t.text().notNull(),
    blockNumber: t.integer().notNull(),
    txHash: t.text().notNull(),
  }),
  (t) => ({
    byNullifierHash: index("mainnet_votes_nullifier_idx").on(t.nullifierHash),
    byVoter: index("mainnet_votes_voter_idx").on(t.voter),
  })
);

export const mainnetTally = onchainTable("mainnet_tally", (t) => ({
  id: t.integer().primaryKey(), // Single row with id=0
  totalYes: t.text().notNull(),
  totalNo: t.text().notNull(),
  lastUpdatedBlock: t.integer().notNull(),
}));

export const mainnetVoters = onchainTable(
  "mainnet_voters",
  (t) => ({
    id: t.text().primaryKey(),
    votingAddress: t.text().notNull(),
    voter: t.text().notNull(),
    blockNumber: t.integer().notNull(),
    txHash: t.text().notNull(),
  }),
  (t) => ({
    byVoting: index("mainnet_voters_voting_idx").on(t.votingAddress),
    byVoter: index("mainnet_voters_voter_idx").on(t.voter),
    byVotingVoter: index("mainnet_voters_voting_voter_idx").on(
      t.votingAddress,
      t.voter
    ),
  })
);

// ===================
// BASE TABLES
// ===================
export const baseVotings = onchainTable("base_votings", (t) => ({
  address: t.text().primaryKey(),
  creator: t.text().notNull(),
  question: t.text().notNull(),
  createdAtBlock: t.integer().notNull(),
  txHash: t.text().notNull(),
}));

export const baseLeaves = onchainTable(
  "base_leaves",
  (t) => ({
    id: t.text().primaryKey(),
    votingAddress: t.text().notNull(),
    index: t.text().notNull(),
    indexNum: t.integer().notNull(),
    value: t.text().notNull(),
    blockNumber: t.integer().notNull(),
    txHash: t.text().notNull(),
  }),
  (t) => ({
    byVoting: index("base_leaves_voting_idx").on(t.votingAddress),
    byVotingIndex: index("base_leaves_voting_index_idx").on(
      t.votingAddress,
      t.indexNum
    ),
  })
);

export const baseVotes = onchainTable(
  "base_votes",
  (t) => ({
    id: t.text().primaryKey(),
    nullifierHash: t.text().notNull(),
    voter: t.text().notNull(),
    vote: t.boolean().notNull(),
    timestamp: t.integer().notNull(),
    totalYes: t.text().notNull(),
    totalNo: t.text().notNull(),
    blockNumber: t.integer().notNull(),
    txHash: t.text().notNull(),
  }),
  (t) => ({
    byNullifierHash: index("base_votes_nullifier_idx").on(t.nullifierHash),
    byVoter: index("base_votes_voter_idx").on(t.voter),
  })
);

export const baseTally = onchainTable("base_tally", (t) => ({
  id: t.integer().primaryKey(), // Single row with id=0
  totalYes: t.text().notNull(),
  totalNo: t.text().notNull(),
  lastUpdatedBlock: t.integer().notNull(),
}));

export const baseVoters = onchainTable(
  "base_voters",
  (t) => ({
    id: t.text().primaryKey(),
    votingAddress: t.text().notNull(),
    voter: t.text().notNull(),
    blockNumber: t.integer().notNull(),
    txHash: t.text().notNull(),
  }),
  (t) => ({
    byVoting: index("base_voters_voting_idx").on(t.votingAddress),
    byVoter: index("base_voters_voter_idx").on(t.voter),
    byVotingVoter: index("base_voters_voting_voter_idx").on(
      t.votingAddress,
      t.voter
    ),
  })
);
