import { EngineType } from "@databye/common";
import { Command } from "commander";
import { addAnonymizerCommands } from "../anoymizers/add-anonymizer-commands.js";
import { addConnectionOptions } from "../commands/anon-col/helpers/add-connection-options.js";
import { addFileOptions } from "../commands/anon-col/helpers/add-file-options.js";
import { addColumnOption } from "../commands/anon-col/helpers/column-option.js";

const databaseEngines: EngineType[] = [
  EngineType.PostGres,
  EngineType.Mongo,
  EngineType.MariaDB,
  EngineType.MSSQL,
  EngineType.MySQL,
];

const fileEngines: EngineType[] = [EngineType.CSV, EngineType.SQLite];

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
    addFileOptions(command);
    addColumnOption(command);
    return command;
  });
  return commands;
}

export function addEngineCommands(cmd: Command) {
  const engineCommands = [...createDatabaseCommands(), ...createFileCommands()];

  // add anonymizer commands to all engine commands
  engineCommands.forEach((cmd) => addAnonymizerCommands(cmd));

  // add commands to parent
  for (const engineCommand of engineCommands) {
    cmd.addCommand(engineCommand);
  }
}
