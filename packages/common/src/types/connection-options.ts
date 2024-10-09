// @todo: rename to DatabaseOptions
export type ConnectionOptions = {
  connectionString?: string;
  databaseName: string;
  filePath?: string;
  password?: string;
  serverName?: string;
  tableName: string;
  userName?: string;
};
