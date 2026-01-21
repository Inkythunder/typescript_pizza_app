import {connectToDefaultDatabase} from "../src/db/";
import {insertTestData} from "../src/db/sample_data";

const {db, connection} = connectToDefaultDatabase()

console.log("Inserting test data...");
await insertTestData(db);
console.log("Complete.");

await connection.end();

