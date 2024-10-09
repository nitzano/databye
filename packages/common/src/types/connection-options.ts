// @todo: rename to DatabaseOptions
export type ConnectionOptions = {
  columnName: string;
  connectionString?: string;
  databaseName: string;
  filePath?: string;
  password?: string;
  serverName?: string;
  tableName: string;
  userName?: string;
};
