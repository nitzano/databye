import { createLogger, type ConnectionOptions } from "@databye/common";
import { type Command } from "commander";

type CliConnectionOptions = {
  database: string;
  password?: string;
  server?: string;
  file?: string;
  uri?: string;
  table: string;
  user?: string;
};

const logger = createLogger();

export function extractConnectionOptions(command: Command): ConnectionOptions {
  const cliOptions = command.optsWithGlobals<CliConnectionOptions>();
  logger.debug(
    `cli connection options = ${JSON.stringify(cliOptions, null, 2)}`
  );
  const { uri, database, password, server, table, user, file } = cliOptions;

  return {
    databaseName: database,
    password,
    serverName: server,
    tableName: table,
    connectionString: uri,
    userName: user,
    file,
  };
}
