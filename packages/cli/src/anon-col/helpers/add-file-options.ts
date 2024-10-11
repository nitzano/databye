import { type Command } from "commander";

export function addFileOptions(cmd: Command) {
  cmd.requiredOption("-f --file <filePath>", "File path");
}
