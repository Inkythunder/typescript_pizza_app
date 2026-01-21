import {Router} from 'express';
import {createApiRoutes} from "./api";
import {PizzaDatabase} from "../db";

export function createRoutes(db: PizzaDatabase) {

  const router = Router();

  router.use('/api', createApiRoutes(db));

  return router;
}