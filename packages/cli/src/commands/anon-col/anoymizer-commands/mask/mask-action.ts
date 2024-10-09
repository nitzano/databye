import {
  createMaskAnonymizer,
  type Anonymizer,
  type MaskAnonymizer,
  type MaskOptions,
} from "@databye/anonymizers";
import { createLogger } from "@databye/common";
import { type Command } from "commander";
import { extractConnectionOptions } from "../../helpers/extract-connection-options.js";
import { processColumnHelper } from "../../helpers/process-column-helper.js";

const logger = createLogger();

export async function maskAction(this: Command) {
  const maskOptions: MaskOptions = {
    character: this.opts().character as string,
  };
  logger.debug(` ${JSON.stringify(maskOptions, null, 2)}`);
  const connectionOptions = extractConnectionOptions(this);

  // Build anonymizer
  const maskAnonymizer: MaskAnonymizer = createMaskAnonymizer(maskOptions);

  const anonymizer: Anonymizer = maskAnonymizer;
  const isConfirmed = this.optsWithGlobals().confirm as boolean;
  logger.debug(`isConfined CLI = ${isConfirmed}`);
  // Anonymize column
  await processColumnHelper(connectionOptions, anonymizer, isConfirmed);
}
