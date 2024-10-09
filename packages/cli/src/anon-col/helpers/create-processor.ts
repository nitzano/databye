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
      const connectionsOptions = options as ConnectionOptions;
      return new PostgresProcessor(connectionsOptions);
    }

    case EngineType.MariaDB:
    case EngineType.MySQL: {
      logger.debug("creating mariadb processor");
      const connectionsOptions = options as ConnectionOptions;
      return new MariaDatabaseProcessor(connectionsOptions);
    }

    case EngineType.MSSQL: {
      logger.debug("creating mssql processor");
      const connectionsOptions = options as ConnectionOptions;
      return new MsSqlProcessor(connectionsOptions);
    }

    case EngineType.SQLite: {
      logger.debug("creating sqlite processor");
      const connectionsOptions = options as ConnectionOptions;
      return new SQLiteProcessor(connectionsOptions);
    }

    case EngineType.CSV: {
      logger.debug("creating csv processor");
      const fileOptions = options as FileOptions;
      return new CSVProcessor(fileOptions.filePath);
    }
  }
}
