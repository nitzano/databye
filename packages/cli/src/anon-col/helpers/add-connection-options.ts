import { type Command } from "commander";

export function addConnectionOptions(cmd: Command): Command {
  return cmd
    .option("--database <databaseName>", "Database name")
    .option("--password <password>", "database password")
    .option("--server <serverName>", "server to connect to")
    .option("--table <tableName>", "Table name")
    .option("--uri <connectionString>", "Connection string")
    .option("--user <userName>", "Username to use");
}
