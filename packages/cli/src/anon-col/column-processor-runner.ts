import { type Anonymizer } from "@databye/anonymizers";
import { BaseColumnProcessor } from "@databye/processor";
import ora from "ora";
import { checkUserConfirm } from "./helpers/check-user-confirm.js";

export class ColumnProcessorRunner {
  constructor(
    private readonly columnProcessor: BaseColumnProcessor,
    private readonly anonymizer: Anonymizer
  ) {}

  async processColumn(columnName: string, checkConfirm = true) {
    if (checkConfirm) {
      const isConfirmed: boolean = await checkUserConfirm(columnName);
      if (!isConfirmed) return;
    }

    const spinner = ora("Anonymizing column").start();
    await this.columnProcessor.anonymizeColumn(columnName, this.anonymizer);
    spinner.stop();
  }
}
