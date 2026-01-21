import {createApp} from "../app";
import {PostgreSqlContainer, StartedPostgreSqlContainer} from '@testcontainers/postgresql';
import {drizzle} from 'drizzle-orm/postgres-js';
import {migrate} from 'drizzle-orm/postgres-js/migrator';
import * as schema from '../db/schema'
import {order_items, orders, pizzas, toppings} from '../db/schema'
import request from "supertest";
import postgres, {Sql} from "postgres";
import {PizzaDatabase} from "../db";

process.env.TESTCONTAINERS_RYUK_DISABLED = 'true';

let container: StartedPostgreSqlContainer;
let client: Sql<{}>;
let db: PizzaDatabase;

async function insertTestData() {

  //insert a pizza to pizzas table
  const pizzaId1 = "test_pizza_id";
  await db.insert(pizzas).values([
    {
      id: pizzaId1,
      name: 'Test Margherita',
      description: 'Classic tomato and mozzarella',
      image_url: 'https://example.com/margherita.jpg'
    }
  ]);

  //insert topping
  const toppingId = "test_topping_id";
  await db.insert(toppings).values([
    {
      id: toppingId,
      name: 'Cheese',
      description: 'More cheese'
    }
  ]);
}

async function cleanupTestData() {
  await db.delete(order_items);
  await db.delete(orders);
  await db.delete(toppings);
  await db.delete(pizzas);
}

beforeAll(async () => {
  // Start container
  container = await new PostgreSqlContainer("postgres:18.1-trixie")
    .withStartupTimeout(120000)
    .start();

  // Connect to the database
  client = postgres(container.getConnectionUri());

  // Create Drizzle instance
  db = drizzle(client, { schema });

  // Run migrations
  await migrate(db, { migrationsFolder: './drizzle' });

  console.log('Migrations complete');
}, 120000);

afterAll(async () => {
  if (client) {
    await client.end();
  }
  if (container) {
    await container.stop();
  }
}, 30000);

beforeEach(async () => {
  await cleanupTestData();
}, 30000)

describe('GET /api/pizzas', () => {

  //clean up database before each test
  beforeEach(async () => {
    await db.delete(pizzas);
  });

  it('should return all pizzas', async () => {

    await db.insert(pizzas).values([
      { id: '1', name: 'Margherita', description: "test" },
      { id: '2', name: 'Pepperoni', description: "test" },
    ]);

    const app = createApp(db);
    const response = await request(app).get('/api/pizzas');

    expect(response.status).toBe(200);

    const allPizzas = response.body.allPizzas;

    expect(allPizzas).toHaveLength(2);
    expect(allPizzas[0].name).toBe('Margherita');
  });

  it('should return an empty array when no pizzas exist', async () => {

    await cleanupTestData();

    const app = createApp(db);
    const response = await request(app).get('/api/pizzas');

    expect(response.status).toBe(200);
    expect(response.body.allPizzas).toEqual([]);
  });
});

describe('POST /api/place_order', () => {

  beforeEach(async () => {
    await cleanupTestData();
    await insertTestData();
  });

  it('should create an order successfully', async () => {
    const orderData = {
      total_price: 2599,
      customer_name: 'John Doe',
      email: 'john@example.com',
      phone: '555-1234',
      timeslot: '2024-01-15T18:00:00Z',
      order_items: [
        {
          id: 'test-item-1',
          base_pizza_id: 'test_pizza_id',
          extra_toppings: ['test_topping_id']
        }
      ]
    };

    const app = createApp(db);
    const response = await request(app)
      .post('/api/place_order')
      .send(orderData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.customer_name).toBe('John Doe');
  });
});