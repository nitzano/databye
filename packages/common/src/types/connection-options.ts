import {type EngineType} from './engine-type.js';

export type ConnectionOptions = {
	columnName: string;
	databaseName: string;
	password?: string;
	serverName?: string;
	tableName: string;
	connectionString?: string;
	userName?: string;
	engine?: EngineType;
};
