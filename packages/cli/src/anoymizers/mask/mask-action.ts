import { type MaskOptions } from "@databye/anonymizers";
import { createLogger } from "@databye/common";
import { type Command } from "commander";

const logger = createLogger();

export async function maskAction(this: Command) {
  const maskOptions: MaskOptions = {
    character: this.opts().character as string,
  };

  logger.debug(` ${JSON.stringify(maskOptions, null, 2)}`);
  const engineCommand = this.parent;
  if (engineCommand) {
    logger.debug(`engine = ${engineCommand.name()}`);
    const engineOptions = engineCommand?.optsWithGlobals();
    logger.debug(`engineOptions = ${JSON.stringify(engineOptions, null, 2)}`);
  }

  // extract processor

  // const connectionOptions = extractConnectionOptions(this);

  // // Build anonymizer
  // const maskAnonymizer: MaskAnonymizer = createMaskAnonymizer(maskOptions);

  // const anonymizer: Anonymizer = maskAnonymizer;
  // const isConfirmed = this.optsWithGlobals().confirm as boolean;
  // logger.debug(`isConfined CLI = ${isConfirmed}`);

  // // Anonymize column
  // const runner = new ColumnProcessorRunner(null, anonymizer);
  // const columnName = "col1";
  // await runner.processColumn(columnName, isConfirmed);
}
