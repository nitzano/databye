import {
	type EngineType,
	createLogger,
	type ConnectionOptions,
} from '@datazar/common';
import {type Command} from 'commander';

type CliConnectionOptions = {
	column: string;
	database: string;
	password?: string;
	server?: string;
	uri?: string;
	table: string;
	user?: string;
	engine?: EngineType;
};

const logger = createLogger();

export function extractConnectionOptions(command: Command): ConnectionOptions {
	const cliOptions = command.optsWithGlobals<CliConnectionOptions>();
	logger.debug(
		`cli connection options = ${JSON.stringify(cliOptions, null, 2)}`,
	);
	const {uri, column, database, password, server, table, user, engine} =
		cliOptions;

	return {
		columnName: column,
		databaseName: database,
		password,
		serverName: server,
		tableName: table,
		connectionString: uri,
		userName: user,
		engine,
	};
}
