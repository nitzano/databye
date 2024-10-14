import { type Anonymizer, type ColumnType } from "@databye/anonymizers";

export type ColumnProcessor = {
  getColumnType(columnName: string): Promise<ColumnType | undefined>;

  processColumn(
    columnName: string,
    columnType: ColumnType,
    anonymizer: Anonymizer
  ): Promise<void>;
};
