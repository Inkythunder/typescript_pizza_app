import express from "express";
import cors from "cors";
import 'dotenv/config';
import {createRoutes} from "./routes";
import {PizzaDatabase} from "./db";

export function createApp(db: PizzaDatabase) {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/', createRoutes(db));

  return app;
}