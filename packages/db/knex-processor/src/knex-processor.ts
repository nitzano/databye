import { ColumnType, type Anonymizer } from "@databye/anonymizers";
import { createLogger, type ConnectionOptions } from "@databye/common";
import { DataBaseProcessor } from "@databye/processor";
import { type Knex } from "knex";

const logger = createLogger();

export abstract class KnexProcessor extends DataBaseProcessor {
  constructor(protected readonly connectionOptions: ConnectionOptions) {
    super();
  }

  /**
   * Get column type by sampling a value from one the columns using Knex
   *
   * @param {ColumnInfo} columnInfo
   * @return {*}  {Promise<ColumnType>}
   * @memberof KnexProcessor
   */
  async getColumnType(columnName: string): Promise<ColumnType> {
    const client: Knex = this.buildClient();
    try {
      const { tableName } = this.connectionOptions;

      const rows = await client(tableName)
        .select(columnName)
        .whereNotNull(columnName)
        .limit(1);

      if (rows.length === 0) {
        logger.error("could not detect column type");
        throw new Error(
          `No data found in column ${columnName} of table ${tableName}`
        );
      }

      const columnType = this.getColumnTypeByValue(rows[0][columnName]);
      if (columnType) {
        logger.debug(`column type for column ${columnName} = ${columnType}`);
        return columnType;
      }

      logger.warn("could not detect column type");
      return ColumnType.Unknown;
    } finally {
      if (client) {
        await client.destroy();
      }
    }
  }

  /**
   * Process a column (document)
   *
   * @param {ColumnConfig} columnConfig
   * @memberof MongoProcessor
   */
  async processColumn(
    columnName: string,
    columnType: ColumnType,
    anonymizer: Anonymizer
  ) {
    const client: Knex = this.buildClient();
    const { tableName, databaseName } = this.connectionOptions;

    logger.debug(`processing column`);
    try {
      await this.updateColumn(
        client,
        tableName,
        columnName,
        columnType,
        anonymizer,
        databaseName
      );
    } finally {
      await client.destroy();
    }
  }

  async updateColumn(
    client: Knex,
    tableName: string,
    columnName: string,
    columnType: ColumnType,
    anonymizer: Anonymizer,
    _databaseName?: string
  ) {
    logger.debug(`processing column`);
    // TODO: update in bulk
    logger.debug(`processing column: ${tableName}.${columnName}`);

    const rows = await client(tableName).select([
      `id`,
      `${columnName} as ${columnName}`,
    ]);
    logger.debug(`rows = ${JSON.stringify(rows, null, 2)}`);

    await Promise.all(
      rows.map(async ({ id, [columnName]: col }) => {
        const rowId: string = id as string;

        const anonymizedValue: unknown = anonymizer.anonymize(
          col,
          columnType
        ) as string;
        if (!client) return;

        await client(tableName)
          .where({ id: rowId })
          .update({ [columnName]: anonymizedValue });
      })
    );
  }

  abstract buildClient(): Knex;
}
