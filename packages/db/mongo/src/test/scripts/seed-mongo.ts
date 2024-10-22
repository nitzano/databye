// Create a fake mongo db
import {
  productFactory,
  userFactory,
  type Product,
  type User,
} from "@datazar-cli/common";
import chalk from "chalk";
import "dotenv/config"; // eslint-disable-line import/no-unassigned-import
import { MongoClient } from "mongodb";
import process from "node:process";

const usersCount = 500;
const productsCount = 500;
const { cyan } = chalk;

async function run() {
  const connectionString = process.env.MONGO_DB_URI;
  if (connectionString) {
    const client = new MongoClient(connectionString);
    try {
      await client.connect();
      const database = client.db("test");
      await database.dropDatabase();
      // User
      console.log(`creating ${cyan(usersCount)} users`);
      const users = database.collection<User>("users");
      await users.insertMany(userFactory.buildList(usersCount));
      // Products
      console.log(`creating ${cyan(productsCount)} products`);
      const products = database.collection<Product>("products");
      await products.insertMany(productFactory.buildList(productsCount));
    } catch (error: unknown) {
      console.error(error);
    } finally {
      await client.close();
    }
  }
}

await run();
