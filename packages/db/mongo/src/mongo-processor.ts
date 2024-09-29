import {ColumnType, type Anonymizer} from '@datazar/anonymizers';
import {DataBaseProcessor, type ColumnInfo} from '@datazar/base-processor';
import {createLogger} from '@datazar/common';
import {MongoClient, type Db} from 'mongodb';

const logger = createLogger();

export class MongoProcessor extends DataBaseProcessor {
	constructor(private readonly uri: string) {
		super();
	}

	async getColumnType(columnInfo: ColumnInfo): Promise<ColumnType> {
		const client = new MongoClient(this.uri);
		try {
			const database = client.db(columnInfo.databaseName);
			const collection = database.collection(columnInfo.tableName);
			const sampleDocument = await collection.findOne(
				{},
				{projection: {[columnInfo.columnName]: 1}},
			);

			const fieldName = columnInfo.columnName;

			if (sampleDocument) {
				const columnType = this.getColumnTypeByValue(sampleDocument[fieldName]);
				return columnType;
			}

			return ColumnType.Unknown;
		} finally {
			await client.close();
		}
	}

	async processColumn(
		columnInfo: ColumnInfo,
		columnType: ColumnType,
		anonymizer: Anonymizer,
	) {
		const {databaseName, tableName, columnName} = columnInfo;
		logger.debug(`mongo:processColumn ${columnName}`);
		const client = new MongoClient(this.uri);
		let database: Db;
		try {
			await client.connect();
			database = client.db(databaseName);

			// Process column
			await this.processCollection(
				database,
				tableName,
				columnName,
				columnType,
				anonymizer,
			);
		} catch (error: unknown) {
			logger.error(error);
		} finally {
			await client.close();
		}
	}

	/**
	 * Process a column (document)
	 *
	 * @param {ColumnConfig} columnConfig
	 * @memberof MongoProcessor
	 */
	private async processCollection(
		database: Db,
		collectionName: string,
		fieldName: string,
		columnType: ColumnType,
		anonymizer: Anonymizer,
	) {
		logger.debug(`mongo:processingCollection:${collectionName}`);
		const collection = database.collection(collectionName);
		const cursor = collection.find({});
		// @todo: need to check anonymizer function exists before using it
		for await (const document of cursor) {
			const previousValue = document[fieldName];
			// Anonymize
			const anonymizedValue: any = anonymizer.anonymize(
				previousValue,
				columnType,
			);
			await collection.updateOne(
				{_id: document._id},
				{$set: {[fieldName]: anonymizedValue}},
			);
		}

		logger.debug(`mongo:processingCollection:${collectionName} - Done`);
	}
}
