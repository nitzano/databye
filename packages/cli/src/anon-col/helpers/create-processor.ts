import { EngineType, FileOptions, createLogger } from "@datazar-cli/common";
import { CSVProcessor } from "@datazar-cli/csv";
import { MariaDatabaseProcessor } from "@datazar-cli/mariadb";
import { MongoProcessor } from "@datazar-cli/mongo";
import { MsSqlProcessor } from "@datazar-cli/mssql";
import { PostgresProcessor } from "@datazar-cli/postgres";
import { BaseColumnProcessor } from "@datazar-cli/processor";
import { SQLiteProcessor } from "@datazar-cli/sqlite";
import {
  CliConnectionOptions,
  extractConnectionOptions,
} from "./extract-connection-options.js";

const logger = createLogger();

export function createProcessor(
  engineType: EngineType,
  options: unknown
): BaseColumnProcessor {
  logger.debug(`engine = ${engineType}`);
  switch (engineType) {
    case EngineType.Mongo: {
      const connectionsOptions = extractConnectionOptions(
        options as CliConnectionOptions
      );
      logger.debug("creating mongo processor");
      if (!connectionsOptions.connectionString)
        throw new Error("invalid connection string uri");
      if (!connectionsOptions.databaseName) throw new Error("no db");
      if (!connectionsOptions.tableName) throw new Error("no table");
      return new MongoProcessor(
        connectionsOptions.connectionString,
        connectionsOptions.databaseName,
        connectionsOptions.tableName
      );
    }

    case EngineType.PostGres: {
      logger.debug("creating postgres processor");
      const connectionsOptions = extractConnectionOptions(
        options as CliConnectionOptions
      );

      return new PostgresProcessor(connectionsOptions);
    }

    case EngineType.MariaDB:
    case EngineType.MySQL: {
      logger.debug("creating mariadb processor");
      const connectionsOptions = extractConnectionOptions(
        options as CliConnectionOptions
      );
      return new MariaDatabaseProcessor(connectionsOptions);
    }

    case EngineType.MSSQL: {
      logger.debug("creating mssql processor");
      const connectionsOptions = extractConnectionOptions(
        options as CliConnectionOptions
      );
      return new MsSqlProcessor(connectionsOptions);
    }

    case EngineType.SQLite: {
      logger.debug("creating sqlite processor");
      logger.debug(`options = ${JSON.stringify(options, null, 2)}`);
      const connectionsOptions = extractConnectionOptions(
        options as CliConnectionOptions
      );
      logger.debug(
        `connectionsOptions = ${JSON.stringify(connectionsOptions, null, 2)}`
      );
      return new SQLiteProcessor(connectionsOptions);
    }

    case EngineType.CSV: {
      logger.debug("creating csv processor");
      logger.debug(`options = ${JSON.stringify(options, null, 2)}`);
      const fileOptions = options as FileOptions;
      return new CSVProcessor(fileOptions.file);
    }
  }
}
