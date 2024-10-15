import { ColumnType } from "./column-type.js";

export type Anonymizer = {
    anonymizeString?: (value: string) => string;
    anonymizeNumber?: (value: number) => number;
    anonymizeBoolean?: (value: boolean) => boolean;
    anonymize: (value: any, columnType?: ColumnType) => any
};