import { Anonymizer, createLogger, EngineType, ProviderType } from "@databye/common";
import chalk from "chalk";
import { Command } from "commander";
import { ColumnProcessorRunner } from "../anon-col/column-processor-runner.js";
import { createProcessor } from "../anon-col/helpers/create-processor.js";

const { cyanBright } = chalk

const logger = createLogger();

const anonymizerToIcon: Record<ProviderType, string | undefined> = {
  [ProviderType.Constant]: '🖋️',
  [ProviderType.Fake]: '🍀',
  [ProviderType.Mask]: '🎭',
  [ProviderType.Remove]: '🧽',
  [ProviderType.Scramble]: '🔀',
}


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
  // logger.info(`using ${chalk.cyan("🍀 fake")} anonymizer`)
  logger.info(`Anonymizing ${chalk.green(columnName)} column with ${chalk.green(engineType)} engine`);
  logger.info(`Using ${anonymizerToIcon[anonymizer.name]} ${chalk.magenta(anonymizer.name)} anonymizer`)
  await runner.processColumn(columnName, isConfirmed);
}
