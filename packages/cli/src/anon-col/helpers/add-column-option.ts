import { Command } from "commander";

export function addColumnOption(cmd: Command) {
  cmd.requiredOption("--col <name>", "Column name to process");
}
