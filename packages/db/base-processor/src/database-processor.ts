import {ColumnType, type Anonymizer} from '@datazar/anonymizers';
import {createLogger} from '@datazar/common';
import {type ColumnProcessor} from './column-processor.js';
import {type ColumnInfo} from './types/column-info.js';

const logger = createLogger();

export abstract class DataBaseProcessor implements ColumnProcessor {
	async anonymizeColumn(columnInfo: ColumnInfo, anonymizer: Anonymizer) {
		const columnType = await this.getColumnType(columnInfo);
		logger.debug(`columnType = ${columnType}`);
		if (columnType) {
			await this.processColumn(columnInfo, columnType, anonymizer);
		}
	}

	async getColumnType(_columnInfo: ColumnInfo): Promise<ColumnType> {
		return ColumnType.Unknown;
	}
	abstract processColumn(
		columnInfo: ColumnInfo,
		columnType: ColumnType,
		anonymizer: Anonymizer,
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
		if (!sampleValue) throw new Error('no sample value supplied');

		const sampleType = typeof sampleValue;
		switch (sampleType) {
			case 'string': {
				return ColumnType.String;
			}

			case 'number': {
				return ColumnType.Number;
			}

			case 'boolean': {
				return ColumnType.Number;
			}

			default: {
				return ColumnType.Unknown;
			}
		}
	}
}
