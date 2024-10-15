import { Anonymizer, createLogger, EngineType } from "@databye/common";
import chalk from "chalk";
import { Command } from "commander";
import { ColumnProcessorRunner } from "../anon-col/column-processor-runner.js";
import { createProcessor } from "../anon-col/helpers/create-processor.js";

const { cyanBright } = chalk

const logger = createLogger();

export async function runAnonymizeColumnAction(
  engineCommand: Command,
  anonymizer: Anonymizer
) {
  const engineType = engineCommand.name() as EngineType;
  const engineOptions = engineCommand?.optsWithGlobals();
  const columnProcessor = createProcessor(engineType, engineOptions);
  const runner = new ColumnProcessorRunner(columnProcessor, anonymizer);
  const isConfirmed = engineCommand.optsWithGlobals().confirm as boolean;
  const columnName = engineCommand.optsWithGlobals().column as string;
  logger.info(`Anonymizing column ${cyanBright(columnName)} with ${cyanBright(engineType)} engine`);
  await runner.processColumn(columnName, isConfirmed);
}
