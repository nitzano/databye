import { defaultMaskOptions } from "@databye/anonymizers";
import { Command } from "commander";
import { maskAction } from "./mask-action.js";

export const maskCommand = new Command("mask");

maskCommand
  .description("mask a single column")
  .option(
    "-c --character <char>",
    "Character to mask with",
    defaultMaskOptions.character
  )
  .action(maskAction);
