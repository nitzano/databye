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
    if (
      !this.connectionOptions.connectionString &&
      !this.connectionOptions.filePath
    ) {
      throw new Error("connection string or file name are required");
    }

    return knex({
      client: "sqlite3", // or 'better-sqlite3'
      connection: {
        filename:
          this.connectionOptions.filePath! ??
          this.connectionOptions.connectionString!,
      },
    });
  }
}
