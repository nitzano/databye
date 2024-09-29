import {KnexProcessor} from '@datazar/knex-processor';
import knex, {type Knex} from 'knex';

export class PostgresProcessor extends KnexProcessor {
	/**
	 * Build the client
	 *
	 * @param {string} connectionString
	 * @return {*}  {Knex}
	 * @memberof MariaDatabaseProcessor
	 */
	buildClient(): Knex {
		if (!this.connectionOptions.connectionString) {
			throw new Error('connection string is required');
		}

		return knex({
			client: 'pg',
			connection: this.connectionOptions.connectionString,
		});
	}
}
