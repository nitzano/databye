import {
  EngineType,
  createLogger,
  type ConnectionOptions,
} from "@databye/common";
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
        const mongo = await import("@databye/mongo");
        if (!connectionString) throw new Error("invalid connection string uri");
        databaseProcessor = new mongo.MongoProcessor(connectionString);
        break;
      }

      case EngineType.PostGres: {
        logger.debug("creating postgress processor");
        const module = await import("@databye/postgres");
        databaseProcessor = new module.PostgresProcessor(connectionOptions);
        break;
      }

      case EngineType.MariaDB:
      case EngineType.MySQL: {
        logger.debug("creating mariadb processor");
        const module = await import("@databye/mariadb");
        databaseProcessor = new module.MariaDatabaseProcessor(
          connectionOptions
        );
        break;
      }

      case EngineType.MSSQL: {
        logger.debug("creating mssql processor");
        const module = await import("@databye/mssql");
        databaseProcessor = new module.MsSqlProcessor(connectionOptions);
        break;
      }
    }
  }

  return databaseProcessor;
}
