import { KnexProcessor } from "@databye/knex-processor";
import knex, { type Knex } from "knex";

export class SQLiteProcessor extends KnexProcessor {
  /**
   * Build the mariadb client
   *
   * @return {*}  {Knex}
   * @memberof MariaDatabaseProcessor
   */
  buildClient(): Knex {
    if (!this.connectionOptions.connectionString) {
      throw new Error("connection string or file name are required");
    }

    return knex({
      client: "sqlite3",
      useNullAsDefault: true,
      connection: {
        filename:
          this.connectionOptions.file ||
          this.connectionOptions.connectionString,
      },
    });
  }
}
