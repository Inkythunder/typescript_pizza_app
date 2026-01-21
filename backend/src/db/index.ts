import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from "postgres";
import * as schema from "./schema";
import {PostgresJsDatabase} from "drizzle-orm/postgres-js/driver";

export function createDefaultDb() {

  const connectionString = process.env.DB_URL!;

  const queryClient = postgres(connectionString);
  return drizzle(queryClient, {schema});
}

export type PizzaDatabase = PostgresJsDatabase<typeof schema>;