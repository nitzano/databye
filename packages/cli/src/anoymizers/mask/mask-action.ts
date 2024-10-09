import {
  createMaskAnonymizer,
  MaskAnonymizer,
  type MaskOptions,
} from "@databye/anonymizers";
import { createLogger, EngineType } from "@databye/common";
import { type Command } from "commander";
import { ColumnProcessorRunner } from "../../anon-col/column-processor-runner.js";
import { createProcessor } from "../../anon-col/helpers/create-processor.js";

const logger = createLogger();

export async function maskAction(this: Command) {
  const maskOptions: MaskOptions = {
    character: this.opts().character as string,
  };

  // // Build anonymizer
  const maskAnonymizer: MaskAnonymizer = createMaskAnonymizer(maskOptions);

  logger.debug(` ${JSON.stringify(maskOptions, null, 2)}`);
  const engineCommand = this.parent;
  if (engineCommand) {
    // engineType
    const engineType = engineCommand.name() as EngineType;
    logger.debug(`engineType = ${engineType}`);
    const engineOptions = engineCommand?.optsWithGlobals();
    const columnProcessor = createProcessor(engineType, engineOptions);
    const runner = new ColumnProcessorRunner(columnProcessor, maskAnonymizer);
    const isConfirmed = this.optsWithGlobals().confirm as boolean;
    const columnName = this.optsWithGlobals().column as string;
    logger.debug(`columnName=${columnName} isConfirmed=${isConfirmed}`);
    await runner.processColumn(columnName, isConfirmed);
  }
}
