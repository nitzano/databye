import { type Command } from "commander";

export function addFileOptions(cmd: Command): Command {
  return cmd.option("-f --file <filePath>", "File path");
}
