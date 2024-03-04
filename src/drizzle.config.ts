import { defineConfig } from "drizzle-kit";

console.log(process.env.DATABASE_URL);


export default defineConfig({
  schema: "./lib/models/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? "",
  },
  verbose: true,
  strict: true,
});
