import { Command } from "commander";
import { createMaskCommand } from "./mask/create-mask-command.js";
import { createScrambleCommand } from "./scramble/create-scramble-command.js";

export function addAnonymizerCommands(cmd: Command) {
  const scrambleCommand = createScrambleCommand();
  const maskCommand = createMaskCommand();
  cmd.addCommand(scrambleCommand);
  cmd.addCommand(maskCommand);
}
