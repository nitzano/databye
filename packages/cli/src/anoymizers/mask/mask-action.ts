import {
  createMaskAnonymizer,
  type Anonymizer,
  type MaskAnonymizer,
  type MaskOptions,
} from "@databye/anonymizers";
import { createLogger } from "@databye/common";
import { type Command } from "commander";
import { ColumnProcessorRunner } from "../../anon-col/column-processor-runner.js";
import { extractConnectionOptions } from "../../anon-col/helpers/extract-connection-options.js";

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
  const runner = new ColumnProcessorRunner(null, anonymizer, isConfirmed);
  await runner.processColumn(connectionOptions, anonymizer);
}
