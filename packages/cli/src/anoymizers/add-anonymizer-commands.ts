import { Command } from "commander";
import { getMaskCommand } from "./mask/mask-command.js";
import { createScrambleCommand } from "./scramble/create-scramble-command.js";

export function addAnonymizerCommands(cmd: Command) {
  const scrambleCommand = createScrambleCommand();
  const maskCommand = getMaskCommand();
  cmd.addCommand(scrambleCommand);
  cmd.addCommand(maskCommand);
}
