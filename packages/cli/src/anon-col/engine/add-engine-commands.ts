import { EngineType } from "@datazar-cli/common";
import { Command } from "commander";
import { addAnonymizerCommands } from "../../anoymizers/add-anonymizer-commands.js";
import { addColumnOption } from "../helpers/add-column-option.js";
import { addConnectionOptions } from "../helpers/add-connection-options.js";
import { addFileOptions } from "../helpers/add-file-options.js";

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
    addConnectionOptions(command);
    addColumnOption(command);
    return command;
  });
  return commands;
}

function createFileCommands(): Command[] {
  const commands = Object.values(fileEngines).map((val) => {
    let command = new Command(val);
    addColumnOption(command);
    addFileOptions(command);
    return command;
  });
  return commands;
}

export function addEngineCommands(cmd: Command) {
  let engineCommands = [...createDatabaseCommands(), ...createFileCommands()];

  engineCommands.forEach((cmd) => addAnonymizerCommands(cmd));

  return engineCommands;
}
