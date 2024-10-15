import { Anonymizer, ColumnType, createLogger } from "@databye/common";
import { BaseColumnProcessor } from "@databye/processor";
import { MongoClient, type Db } from "mongodb";

const logger = createLogger();

export class MongoProcessor extends BaseColumnProcessor {
  constructor(
    private readonly uri: string,
    private readonly databaseName: string,
    private readonly tableName: string
  ) {
    super();
  }

  async getColumnType(columnName: string): Promise<ColumnType> {
    const client = new MongoClient(this.uri);
    try {
      const database = client.db(this.databaseName);
      const collection = database.collection(this.tableName);
      const sampleDocument = await collection.findOne(
        {},
        { projection: { [columnName]: 1 } }
      );

      const fieldName = columnName;

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
    columnName: string,
    columnType: ColumnType,
    anonymizer: Anonymizer
  ) {
    logger.debug(`mongo:processColumn ${columnName}`);
    const client = new MongoClient(this.uri);
    let database: Db;
    try {
      await client.connect();
      database = client.db(this.databaseName);

      // Process column
      await this.processCollection(
        database,
        this.tableName,
        columnName,
        columnType,
        anonymizer
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
    anonymizer: Anonymizer
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
        columnType
      );
      await collection.updateOne(
        { _id: document._id },
        { $set: { [fieldName]: anonymizedValue } }
      );
    }

    logger.debug(`mongo:processingCollection:${collectionName} - Done`);
  }
}
