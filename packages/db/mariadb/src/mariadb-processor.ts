import { KnexProcessor } from "@datazar-cli/knex-processor";
import knex, { type Knex } from "knex";

export class MariaDatabaseProcessor extends KnexProcessor {
  /**
   * Build the mariadb client
   *
   * @return {*}  {Knex}
   * @memberof MariaDatabaseProcessor
   */
  buildClient(): Knex {
    if (!this.connectionOptions.connectionString) {
      throw new Error("connection string is required");
    }

    return knex({
      client: "mysql",
      connection: this.connectionOptions.connectionString,
    });
  }
}
