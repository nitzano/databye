import { defaultMaskOptions } from "@databye/anonymizers";
import { Command } from "commander";
import { maskAction } from "./mask-action.js";

export function getMaskCommand(): Command {
  return new Command("mask")
    .description("mask a single column")
    .option(
      "-c --character <char>",
      "Character to mask with",
      defaultMaskOptions.character
    )
    .action(maskAction);
}
