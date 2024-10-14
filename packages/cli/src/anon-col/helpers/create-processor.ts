import {
  ConnectionOptions,
  EngineType,
  FileOptions,
  createLogger,
} from "@databye/common";
import { CSVProcessor } from "@databye/csv";
import { MariaDatabaseProcessor } from "@databye/mariadb";
import { MongoProcessor } from "@databye/mongo";
import { MsSqlProcessor } from "@databye/mssql";
import { PostgresProcessor } from "@databye/postgres";
import { BaseColumnProcessor } from "@databye/processor";
import { SQLiteProcessor } from "@databye/sqlite";
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
      const connectionsOptions = options as ConnectionOptions;
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
