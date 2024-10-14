import { type Command } from "commander";

export function addFileOptions(cmd: Command) {
  cmd.requiredOption("--file <filePath>", "File path");
}
