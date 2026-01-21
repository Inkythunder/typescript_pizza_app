import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from "postgres";
import * as schema from "./schema";
import {PostgresJsDatabase} from "drizzle-orm/postgres-js/driver";

function buildPostgresUrl(params: {
  username: string;
  password: string;
  hostname: string;
  port?: string;
  database: string;
}) : string {

  const url = new URL("postgresql://" + params.hostname);
  url.username = params.username;
  url.password = params.password;
  url.port = params.port ?? "5432";
  url.pathname = "/" + params.database;

  return url.toString();
}

export function createDefaultDb() {

  const connectionString = buildPostgresUrl({
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    hostname: process.env.DB_HOST!,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME!
  })

  const queryClient = postgres(connectionString);
  return drizzle(queryClient, {schema});
}

export type PizzaDatabase = PostgresJsDatabase<typeof schema>;