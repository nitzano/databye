import {
  EngineType,
  createLogger,
  type ConnectionOptions,
} from "@databye/common";
import { MariaDatabaseProcessor } from "@databye/mariadb";
import { MongoProcessor } from "@databye/mongo";
import { MsSqlProcessor } from "@databye/mssql";
import { PostgresProcessor } from "@databye/postgres";
import { type DataBaseProcessor } from "@databye/processor";
import { getProcessorEngineFromUri } from "../../../utils/get-processor-engine-from-uri.js";

const logger = createLogger();

export async function createProcessor(
  connectionOptions: ConnectionOptions
): Promise<DataBaseProcessor | undefined> {
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
  let databaseProcessor: DataBaseProcessor | undefined;
  if (engine) {
    switch (engine) {
      case EngineType.Mongo: {
        logger.debug("creating mongo processor");
        if (!connectionString) throw new Error("invalid connection string uri");
        databaseProcessor = new MongoProcessor(connectionString);
        break;
      }

      case EngineType.PostGres: {
        logger.debug("creating postgress processor");
        databaseProcessor = new PostgresProcessor(connectionOptions);
        break;
      }

      case EngineType.MariaDB:
      case EngineType.MySQL: {
        logger.debug("creating mariadb processor");
        databaseProcessor = new MariaDatabaseProcessor(connectionOptions);
        break;
      }

      case EngineType.MSSQL: {
        logger.debug("creating mssql processor");
        databaseProcessor = new MsSqlProcessor(connectionOptions);
        break;
      }
    }
  }

  return databaseProcessor;
}
