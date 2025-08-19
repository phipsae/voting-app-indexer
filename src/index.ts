import { ponder } from "ponder:registry";
import { leaves, votes, tally, votings } from "ponder:schema";

const idFor = (event: any) => `${event.block.hash}-${event.log.logIndex}`;

ponder.on("ZkVotingFactory:VotingCreated", async ({ event, context }) => {
  await context.db.insert(votings).values({
    address: event.args.voting.toLowerCase(), // (optional) normalize
    creator: event.args.creator.toLowerCase(),
    question: event.args.question,
    createdAtBlock: Number(event.block.number),
    txHash: event.transaction.hash,
  });
});

ponder.on("ZkVoting:NewLeaf", async ({ event, context }) => {
  const { db } = context;
  const { index, value } = event.args as { index: bigint; value: bigint };

  const votingAddress = event.log.address.toLowerCase(); // emitter

  await db.insert(leaves).values({
    id: `${event.block.hash}-${event.log.logIndex}`,
    votingAddress, // <-- new column
    index: index.toString(),
    indexNum: Number(index), // or BigInt column if you changed schema
    value: value.toString(),
    blockNumber: Number(event.block.number),
    txHash: event.transaction.hash,
  });
});

ponder.on("ZkVoting:VoteCast", async ({ event, context }) => {
  const { db } = context;
  const { nullifierHash, voter, vote, timestamp, totalYes, totalNo } =
    event.args as {
      nullifierHash: `0x${string}`;
      voter: `0x${string}`;
      vote: boolean;
      timestamp: bigint;
      totalYes: bigint;
      totalNo: bigint;
    };

  await db.insert(votes).values({
    id: idFor(event),
    nullifierHash,
    voter,
    vote,
    timestamp: Number(timestamp),
    totalYes: totalYes.toString(),
    totalNo: totalNo.toString(),
    blockNumber: Number(event.block.number),
    txHash: event.transaction.hash,
  });

  await db
    .insert(tally)
    .values({
      id: 0,
      totalYes: totalYes.toString(),
      totalNo: totalNo.toString(),
      lastUpdatedBlock: Number(event.block.number),
    })
    .onConflictDoUpdate({
      totalYes: totalYes.toString(),
      totalNo: totalNo.toString(),
      lastUpdatedBlock: Number(event.block.number),
    });
});
