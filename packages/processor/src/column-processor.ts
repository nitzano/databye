import { Anonymizer, ColumnType } from "@datazar-cli/common";

export type ColumnProcessor = {
  getColumnType(columnName: string): Promise<ColumnType | undefined>;

  processColumn(
    columnName: string,
    columnType: ColumnType,
    anonymizer: Anonymizer
  ): Promise<void>;
};
