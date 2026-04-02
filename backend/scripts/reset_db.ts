import {connectToDefaultDatabase} from "../src/db/";
import {insertTestData} from "../src/db/sample_data";
import {pizzas, toppings, work_days, orders, order_items} from "../src/db/schema";

const {db, connection} = connectToDefaultDatabase()

console.log("Clearing database...");
await db.delete(order_items);
await db.delete(orders);
await db.delete(work_days);
await db.delete(toppings);
await db.delete(pizzas);

console.log("Inserting test data...");
await insertTestData(db);
console.log("Complete.");

await connection.end();
