// Create a fake maria db
import { userFactory } from "@datazar-cli/common";
import "dotenv/config"; // eslint-disable-line import/no-unassigned-import
import knex, { type Knex } from "knex";
import process from "node:process";

const sampleTableName = "users";

async function run() {
  const connectionString = process.env.MARIADB_DB_URI;
  if (connectionString) {
    const client: Knex = knex({
      client: "mysql",
      connection: connectionString,
    });
    try {
      await client.schema.dropTableIfExists(sampleTableName);
      await client.schema.createTable(sampleTableName, (table) => {
        table.increments("id");
        table.string("firstName");
        table.string("lastName");
        table.integer("age");
        table.string("email");
      });
      // Insert random users
      await client(sampleTableName).insert(userFactory.buildList(10));
    } catch (error: unknown) {
      console.error(error);
    } finally {
      await client.destroy();
    }
  }
}

await run();
