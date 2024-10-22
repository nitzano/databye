import { Anonymizer } from "@datazar-cli/common";
import { BaseColumnProcessor } from "@datazar-cli/processor";
import ora from "ora";
import { checkUserConfirm } from "./helpers/check-user-confirm.js";

export class ColumnProcessorRunner {
  constructor(
    private readonly columnProcessor: BaseColumnProcessor,
    private readonly anonymizer: Anonymizer
  ) {}

  async processColumn(columnName: string, checkConfirm = true) {
    if (checkConfirm) {
      const isConfirmed: boolean = await checkUserConfirm();
      if (!isConfirmed) return;
    }

    const spinner = ora("Anonymizing column").start();
    await this.columnProcessor.anonymizeColumn(columnName, this.anonymizer);
    spinner.stop();
  }
}
