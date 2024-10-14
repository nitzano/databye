import { Command } from "commander";

export function addColumnOption(cmd: Command) {
  cmd.requiredOption("-col --column <columnName>", "Column name to process");
}
