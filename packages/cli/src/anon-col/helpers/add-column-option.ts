import { Command } from "commander";

export function addColumnOption(cmd: Command) {
  cmd.requiredOption("--col <columnName>", "Column name to process");
}
