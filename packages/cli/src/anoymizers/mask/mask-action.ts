import {
  createMaskAnonymizer,
  MaskAnonymizer,
  type MaskOptions,
} from "@databye/anonymizers";
import { createLogger } from "@databye/common";
import { type Command } from "commander";
import { runAnonymizerCommand } from "../run-anonymizer-command.js";

const logger = createLogger();

export async function maskAction(this: Command) {
  const maskOptions: MaskOptions = {
    character: this.opts().character as string,
  };

  // // Build anonymizer
  const maskAnonymizer: MaskAnonymizer = createMaskAnonymizer(maskOptions);
  await runAnonymizerCommand(this.parent!, maskAnonymizer);
}
