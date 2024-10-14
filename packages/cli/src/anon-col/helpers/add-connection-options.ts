import { type Command } from "commander";

export function addConnectionOptions(cmd: Command): Command {
  return cmd
    .option("-t --table <tableName>", "Table name")
    .option("--db --database <databaseName>", "Database name")
    .option("-p --password <password>", "database password")
    .option("--server <serverName>", "server to connect to")
    .option("--uri <connectionString>", "Connection string")
    .option("-u --user <userName>", "Username to use");
}
