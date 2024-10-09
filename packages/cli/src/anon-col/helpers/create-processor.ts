import { ConnectionOptions, EngineType, createLogger } from "@databye/common";
import { MariaDatabaseProcessor } from "@databye/mariadb";
import { MongoProcessor } from "@databye/mongo";
import { MsSqlProcessor } from "@databye/mssql";
import { PostgresProcessor } from "@databye/postgres";
import { BaseColumnProcessor } from "@databye/processor";
import { SQLiteProcessor } from "@databye/sqlite";

const logger = createLogger();

export async function createProcessor(
  engineType: EngineType,
  options: unknown
): Promise<BaseColumnProcessor> {
  logger.debug(`engine = ${engineType}`);
  let columnProcessor: BaseColumnProcessor | undefined;
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
      break;
    }

    case EngineType.PostGres: {
      logger.debug("creating postgress processor");
      columnProcessor = new PostgresProcessor(connectionOptions);
      break;
    }

    case EngineType.MariaDB:
    case EngineType.MySQL: {
      logger.debug("creating mariadb processor");
      columnProcessor = new MariaDatabaseProcessor(connectionOptions);
      break;
    }

    case EngineType.MSSQL: {
      logger.debug("creating mssql processor");
      columnProcessor = new MsSqlProcessor(connectionOptions);
      break;
    }

    case EngineType.SQLite: {
      logger.debug("creating sqlite processor");
      columnProcessor = new SQLiteProcessor(connectionOptions);
      break;
    }

    case EngineType.CSV: {
      // logger.debug("creating csv processor");
      // if (!connectionOptions.filePath) {
      //   throw new Error("invalid file path");
      // }
      // columnProcessor = new CSVProcessor(connectionOptions.filePath);
      break;
    }
  }

  return columnProcessor;
}
