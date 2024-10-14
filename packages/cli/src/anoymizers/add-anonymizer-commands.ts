import { Command } from "commander";
import { getScrambleCommand } from "./scramble/scramble-command.js";

export function addAnonymizerCommands(cmd: Command) {
  const scrambleCommand = getScrambleCommand();
  cmd.addCommand(scrambleCommand);
  // .addCommand(maskCommand);
}
