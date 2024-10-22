import { createLogger } from "@datazar-cli/common";
import { KnexProcessor } from "@datazar-cli/knex-processor";
import knex, { type Knex } from "knex";

const logger = createLogger();

export class MsSqlProcessor extends KnexProcessor {
  /**
   * Build the client
   *
   * @return {*}  {Knex}
   * @memberof MariaDatabaseProcessor
   */
  buildClient(): Knex {
    logger.debug(
      `mssql connection options = ${JSON.stringify(
        this.connectionOptions,
        null,
        2
      )}`
    );
    const { userName, password, serverName, databaseName } =
      this.connectionOptions;

    return knex({
      client: "mssql",
      connection: {
        user: userName,
        password,
        server: serverName,
        database: databaseName,
      },
    });
  }
}
