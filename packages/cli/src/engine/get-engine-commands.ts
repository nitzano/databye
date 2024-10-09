import { EngineType } from "@databye/common";
import { Command } from "commander";
import { addConnectionOptions } from "../commands/anon-col/helpers/add-connection-options.js";
import { addFileOptions } from "../commands/anon-col/helpers/add-file-options.js";

const databaseEngines: EngineType[] = [
  EngineType.PostGres,
  EngineType.Mongo,
  EngineType.MariaDB,
  EngineType.MSSQL,
  EngineType.MySQL,
  EngineType.SQLite,
];

const fileEngines: EngineType[] = [EngineType.CSV];

function createDatabaseCommands(): Command[] {
  const commands = Object.values(databaseEngines).map((val) => {
    let command = new Command(val);
    command = addConnectionOptions(command);
    return command;
  });
  return commands;
}

function createFileCommands(): Command[] {
  const commands = Object.values(fileEngines).map((val) => {
    let command = new Command(val);
    command = addFileOptions(command);
    return command;
  });
  return commands;
}

export function getEngineCommands(): Command[] {
  return [...createDatabaseCommands(), ...createFileCommands()];
}
