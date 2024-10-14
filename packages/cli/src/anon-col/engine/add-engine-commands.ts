import { createLogger, EngineType } from "@databye/common";
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
];

const logger = createLogger();

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

    addColumnOption(command);
    addFileOptions(command);

    logger.debug(
      JSON.stringify(command.options.map((opt) => opt.flags)),
      null,
      2
    );
    return command;
  });
  return commands;
}

export function addEngineCommands(cmd: Command) {
  let engineCommands = [...createDatabaseCommands(), ...createFileCommands()];

  engineCommands.forEach((cmd) => addAnonymizerCommands(cmd));

  // add commands to parent
  for (const engineCommand of engineCommands) {
    cmd.addCommand(engineCommand);
  }
}
