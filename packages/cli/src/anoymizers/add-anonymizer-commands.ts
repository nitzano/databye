import { Command } from "commander";
import { getMaskCommand } from "./mask/mask-command.js";
import { getScrambleCommand } from "./scramble/scramble-command.js";

export function addAnonymizerCommands(cmd: Command) {
  const scrambleCommand = getScrambleCommand();
  const maskCommand = getMaskCommand();
  cmd.addCommand(scrambleCommand);
  cmd.addCommand(maskCommand);
}
