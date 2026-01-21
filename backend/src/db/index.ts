import 'dotenv/config';
import {drizzle} from 'drizzle-orm/postgres-js';
import postgres, {Sql} from "postgres";
import * as schema from "./schema";
import {PostgresJsDatabase} from "drizzle-orm/postgres-js/driver";

export interface PizzaDatabaseConnection {
  db: PizzaDatabase;
  connection: Sql;
}

export function connectToDefaultDatabase(): PizzaDatabaseConnection {

  const connectionString = process.env.DB_URL!;

  const queryClient = postgres(connectionString);
  return {
    db: drizzle(queryClient, {schema}),
    connection: queryClient
  };
}

export type PizzaDatabase = PostgresJsDatabase<typeof schema>;