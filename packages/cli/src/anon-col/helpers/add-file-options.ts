import { type Command } from "commander";

export function addFileOptions(cmd: Command): Command {
  return cmd.requiredOption("-f --file <filePath>", "File path");
}
