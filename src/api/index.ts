import { db } from "ponder:api";
import schema from "ponder:schema";
import { Hono } from "hono";
import { client, graphql } from "ponder";
import { and, eq } from "ponder";

const app = new Hono();

app.use("/sql/*", client({ db, schema }));

app.use("/", graphql({ db, schema }));
app.use("/graphql", graphql({ db, schema }));

// Custom endpoint to check if a user is on the allowlist
app.get("/allowlist/:network/:votingAddress/:userAddress", async (c) => {
  const { network, votingAddress, userAddress } = c.req.param();

  if (!["base", "mainnet"].includes(network)) {
    return c.json({ error: "Invalid network. Use 'base' or 'mainnet'" }, 400);
  }

  try {
    const table = network === "base" ? schema.baseVoters : schema.mainnetVoters;

    const result = await db
      .select()
      .from(table)
      .where(
        and(
          eq(table.votingAddress, votingAddress.toLowerCase()),
          eq(table.voter, userAddress.toLowerCase())
        )
      )
      .limit(1);

    return c.json({
      isOnAllowlist: result.length > 0,
      voter: result[0] || null,
    });
  } catch (error) {
    return c.json({ error: "Database query failed" }, 500);
  }
});

export default app;
