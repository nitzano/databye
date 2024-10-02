import { type Anonymizer, type ColumnType } from "@databye/anonymizers";
import { type ColumnInfo } from "./types/column-info.js";

export type ColumnProcessor = {
  getColumnType(columnInfo: ColumnInfo): Promise<ColumnType | undefined>;

  processColumn(
    columnInfo: ColumnInfo,
    columnType: ColumnType,
    anonymizer: Anonymizer
  ): Promise<void>;
};
