import { type Command } from "commander";

export function addConnectionOptions(cmd: Command): Command {
  return cmd
    .option("--table <tableName>", "Table name")
    .option("-db --database <databaseName>", "Database name")
    .option("--password <password>", "database password")
    .option("--server <serverName>", "server to connect to")
    .option("--uri <connectionString>", "Connection string")
    .option("--user <userName>", "Username to use");
}
