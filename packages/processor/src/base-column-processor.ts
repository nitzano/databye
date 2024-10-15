import { type Anonymizer } from "@databye/anonymizers";
import { ColumnType, createLogger } from "@databye/common";
import { type ColumnProcessor } from "./column-processor.js";

const logger = createLogger();

// BaseColumnProcessor
export abstract class BaseColumnProcessor implements ColumnProcessor {
  async anonymizeColumn(columnName: string, anonymizer: Anonymizer) {
    const columnType = await this.getColumnType(columnName);
    logger.debug(`columnType = ${columnType}`);
    if (columnType) {
      await this.processColumn(columnName, columnType, anonymizer);
    }
  }

  async getColumnType(_columnName: string): Promise<ColumnType> {
    return ColumnType.Unknown;
  }
  abstract processColumn(
    columnName: string,
    columnType: ColumnType,
    anonymizer: Anonymizer
  ): Promise<void>;

  /**
   * Get column type by sample value
   *
   * @protected
   * @param {unknown} sampleValue
   * @return {*}  {ColumnType}
   * @memberof DataBaseProcessor
   */
  protected getColumnTypeByValue(sampleValue: unknown): ColumnType {
    if (!sampleValue) throw new Error("no sample value supplied");

    const sampleType = typeof sampleValue;
    switch (sampleType) {
      case "string": {
        return ColumnType.String;
      }

      case "number": {
        return ColumnType.Number;
      }

      case "boolean": {
        return ColumnType.Number;
      }

      default: {
        return ColumnType.Unknown;
      }
    }
  }
}
