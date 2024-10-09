import { type Anonymizer } from "@databye/anonymizers";
import { createLogger, type ConnectionOptions } from "@databye/common";
import { type ColumnProcessor } from "@databye/processor";
import ora from "ora";
import { createProcessor } from "./create-processor.js";
import { isUserConfirmed } from "./is-user-confirmed.js";

const logger = createLogger();

export async function processColumnHelper(
  connectionOptions: ConnectionOptions,
  anonymizer: Anonymizer,
  checkConfirm = true
) {
  const { databaseName, tableName, columnName } = connectionOptions;

  const columnProcessor: ColumnProcessor | undefined = await createProcessor(
    connectionOptions
  );

  if (columnProcessor) {
    // Check confirm
    logger.debug(`checkConfirm: ${checkConfirm}`);
    if (checkConfirm) {
      const isConfirmed: boolean = await isUserConfirmed(
        databaseName,
        tableName,
        columnName
      );
      if (!isConfirmed) return;
    }

    logger.debug("calling column processor");
    const spinner = ora("Anonymizing column").start();

    await columnProcessor.anonymizeColumn(
      {
        databaseName,
        tableName,
        columnName,
      },
      anonymizer
    );
    spinner.stop();
  } else {
    throw new Error(`could not find processor for connection string`);
  }
}
