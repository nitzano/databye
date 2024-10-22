import { createLogger, type ConnectionOptions } from "@datazar-cli/common";

export type CliConnectionOptions = {
  database: string;
  password?: string;
  server?: string;
  table: string;
  uri?: string;
  user?: string;
};

const logger = createLogger();

export function extractConnectionOptions(
  cliOptions: CliConnectionOptions
): ConnectionOptions {
  logger.debug(
    `cli connection options = ${JSON.stringify(cliOptions, null, 2)}`
  );
  const { uri, database, password, server, table, user } = cliOptions;

  return {
    databaseName: database,
    password,
    serverName: server,
    tableName: table,
    connectionString: uri,
    userName: user,
  };
}
