import { Command } from "commander";

export function addColumnOption(cmd: Command) {
  cmd.requiredOption("--column <columnName>", "Column name to process");
}
