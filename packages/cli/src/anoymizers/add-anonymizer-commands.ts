import { Command } from "commander";
import { createFakeCommand } from "./fake/create-fake-command.js";
import { createMaskCommand } from "./mask/create-mask-command.js";
import { createScrambleCommand } from "./scramble/create-scramble-command.js";

export function addAnonymizerCommands(cmd: Command) {
  cmd.addCommand(createScrambleCommand());
  cmd.addCommand(createMaskCommand());
  cmd.addCommand(createFakeCommand())
}
