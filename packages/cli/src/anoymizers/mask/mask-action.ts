import {
  createMaskAnonymizer,
  MaskAnonymizer,
  type MaskOptions,
} from "@datazar-cli/anonymizers";
import { type Command } from "commander";
import { runAnonymizeColumnAction } from "../run-anonymize-column-action.js";

export async function maskAction(this: Command) {
  const maskOptions: MaskOptions = {
    character: this.opts().character as string,
  };

  // // Build anonymizer
  const maskAnonymizer: MaskAnonymizer = createMaskAnonymizer(maskOptions);
  await runAnonymizeColumnAction(this.parent!, maskAnonymizer);
}
