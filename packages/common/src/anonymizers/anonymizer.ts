import { ColumnType } from "./column-type.js";
import { ProviderType } from "./provider-type.js";

export type Anonymizer = {
    name: ProviderType,
    anonymizeString?: (value: string) => string;
    anonymizeNumber?: (value: number) => number;
    anonymizeBoolean?: (value: boolean) => boolean;
    anonymize: (value: any, columnType?: ColumnType) => any
};