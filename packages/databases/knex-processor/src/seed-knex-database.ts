// Create a fake pg db
import { userFactory } from "@databye/common";
import { type Knex } from "knex";

const sampleTableName = "users";

export async function seedKnexDatabase(knexClient: Knex) {
  try {
    await knexClient.schema.dropTableIfExists(sampleTableName);
    await knexClient.schema.createTable(sampleTableName, (table) => {
      table.increments("id");
      table.string("firstName");
      table.string("lastName");
      table.integer("age");
      table.string("email");
    });
    // Insert random users
    await knexClient(sampleTableName).insert(userFactory.buildList(10));
  } catch (error: unknown) {
    console.error(error);
  }
}
