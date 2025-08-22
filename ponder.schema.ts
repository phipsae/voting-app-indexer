// schema.ts
import { onchainTable, index } from "ponder";

export const votings = onchainTable("voting", (t) => ({
  address: t.text().primaryKey(),
  creator: t.text().notNull(),
  question: t.text().notNull(),
  createdAtBlock: t.integer().notNull(),
  txHash: t.text().notNull(),
}));

export const leaves = onchainTable(
  "leaves",
  (t) => ({
    id: t.text().primaryKey(),
    votingAddress: t.text().notNull(), // <-- add this
    index: t.text().notNull(),
    indexNum: t.integer().notNull(), // switch to t.bigint() if indices can be large
    value: t.text().notNull(),
    blockNumber: t.integer().notNull(),
    txHash: t.text().notNull(),
  }),
  (t) => ({
    byVoting: index("leaves_voting_idx").on(t.votingAddress),
    byVotingIndex: index("leaves_voting_index_idx").on(
      t.votingAddress,
      t.indexNum
    ),
  })
);

export const votes = onchainTable(
  "votes",
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
    byNullifierHash: index("votes_nullifier_idx").on(t.nullifierHash),
    byVoter: index("votes_voter_idx").on(t.voter),
  })
);

export const tally = onchainTable("tally", (t) => ({
  id: t.integer().primaryKey(), // single row id=0
  totalYes: t.text().notNull(),
  totalNo: t.text().notNull(),
  lastUpdatedBlock: t.integer().notNull(),
}));

export const voters = onchainTable(
  "voters",
  (t) => ({
    id: t.text().primaryKey(),
    votingAddress: t.text().notNull(),
    voter: t.text().notNull(),
    blockNumber: t.integer().notNull(),
    txHash: t.text().notNull(),
  }),
  (t) => ({
    byVoting: index("voters_voting_idx").on(t.votingAddress),
    byVoter: index("voters_voter_idx").on(t.voter),
    byVotingVoter: index("voters_voting_voter_idx").on(
      t.votingAddress,
      t.voter
    ),
  })
);
