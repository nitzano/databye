import { type Command } from "commander";

export function addConnectionOptions(cmd: Command): Command {
  return cmd
    .requiredOption("-t --table <tableName>", "Table name")
    .requiredOption("-col --column <columnName>", "Column name")
    .option("-db --database <databaseName>", "Database name")
    .option("-pass --password <password>", "database password")
    .option("-srv --server <serverName>", "server to connect to")
    .option("-u --uri <connectionString>", "Connection string")
    .option("-f --file <filePath>", "DB File path")
    .option("-usr --user <userName>", "Username to use");
}
