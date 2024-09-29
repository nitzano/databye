import {type Command} from 'commander';

export function addConnectionOptions(cmd: Command): Command {
	return cmd
		.requiredOption('-db --database <databaseName>', 'Database name')
		.requiredOption('-col --column <columnName>', 'Column name')
		.requiredOption('-t --table <tableName>', 'Table name')
		.option('-pass --password <password>', 'database password')
		.option('-srv --server <serverName>', 'server to connect to')
		.option('-u --uri <connectionString>', 'Connection string')
		.option('-usr --user <userName>', 'Username to use');
}
