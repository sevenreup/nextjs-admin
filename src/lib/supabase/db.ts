import * as postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

// TODO: The reloads are creating new connections to the database. This is not ideal for production. We should use a connection pool instead.
const client = postgres.default(process.env.DATABASE_URL ?? "", {
  prepare: false,
  idle_timeout: 5,
});
export const db = drizzle(client);
