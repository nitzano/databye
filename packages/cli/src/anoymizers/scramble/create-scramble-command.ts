import { Command } from "commander";
import { scrambleAction } from "./scramble-action.js";

export function createScrambleCommand(): Command {
  return new Command("scramble")
    .description("scramble a single column")
    .action(scrambleAction);
}
