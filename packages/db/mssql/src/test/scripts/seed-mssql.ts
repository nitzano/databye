// Create a fake pg db
import {seedKnexDatabase} from '@datazar/knex-processor';
import 'dotenv/config'; // eslint-disable-line import/no-unassigned-import
import knex, {type Knex} from 'knex';
import process from 'node:process';

async function run() {
	const client: Knex = knex({
		client: 'mssql',
		connection: {
			user: 'sa',
			password: process.env.MSSQL_SA_PASSWORD,
			server: 'localhost',
			database: 'test',
			port: 1433,
		},
	});

	try {
		await seedKnexDatabase(client);
	} catch (error: unknown) {
		console.error(error);
	} finally {
		await client.destroy();
	}
}

await run();
