import {
  EngineType,
  createLogger,
  type ConnectionOptions,
} from "@databye/common";
import { MariaDatabaseProcessor } from "@databye/mariadb";
import { MsSqlProcessor } from "@databye/mssql";
import { PostgresProcessor } from "@databye/postgres";
import { type ColumnProcessor } from "@databye/processor";
import { SQLiteProcessor } from "@databye/sqlite";
import { getProcessorEngineFromUri } from "../../utils/get-processor-engine-from-uri.js";

const logger = createLogger();

export async function createProcessor(
  connectionOptions: ConnectionOptions
): Promise<ColumnProcessor | undefined> {
  // Parse the engine
  const { connectionString, engine: connectionEngine } = connectionOptions;
  let engine: EngineType | undefined;

  if (connectionEngine) {
    engine = connectionEngine;
  } else if (connectionString) {
    logger.debug("detecting engine from connection uri");
    engine = getProcessorEngineFromUri(connectionString);
  } else {
    throw new Error("could not detect engine source");
  }

  logger.debug(`engine = ${engine}`);
  let columnProcessor: ColumnProcessor | undefined;
  if (engine) {
    switch (engine) {
      case EngineType.Mongo: {
        // logger.debug("creating mongo processor");
        // if (!connectionString) throw new Error("invalid connection string uri");
        // columnProcessor = new MongoProcessor(connectionString);
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
  }

  return columnProcessor;
}
