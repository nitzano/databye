import {ColumnType} from './column-type.js';
import {type ProviderType} from './types.js';

export abstract class BaseAnonymizer {
	abstract name: ProviderType;

	anonymizeString?(value: string): string;
	anonymizeNumber?(value: number): number;
	anonymizeBoolean?(value: boolean): boolean;

	anonymize(value: any, columnType?: ColumnType): any {
		switch (columnType) {
			case ColumnType.String: {
				if (this.anonymizeString) {
					return this.anonymizeString(value as string);
				}

				break;
			}

			case ColumnType.Number: {
				if (this.anonymizeNumber) {
					return this.anonymizeNumber(value as number);
				}

				break;
			}

			case ColumnType.Boolean: {
				if (this.anonymizeBoolean) {
					return this.anonymizeBoolean(value as boolean);
				}

				break;
			}

			default: {
				throw new Error('could not detect column type');
			}
		}
	}
}
