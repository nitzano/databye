import { Command } from "commander";
import { maskCommand } from "./mask/mask-command.js";
import { scrambleCommand } from "./scramble/scramble-command.js";

export function addAnonymizerCommands(cmd: Command) {
  cmd.addCommand(scrambleCommand);
  cmd.addCommand(maskCommand);
}
