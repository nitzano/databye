import {createLogger, EngineType} from '@datazar/common';
import {ConnectionString} from 'connection-string';

const logger = createLogger();

export function getProcessorEngineFromUri(
	connectionString: string,
): EngineType | undefined {
	if (connectionString) {
		const {protocol} = new ConnectionString(connectionString);
		if (protocol) {
			logger.debug(`protocol = ${protocol}`);
			switch (protocol) {
				case 'postgresql': {
					return EngineType.PostGres;
				}

				case 'mongodb': {
					return EngineType.Mongo;
				}

				case 'mariadb': {
					return EngineType.MariaDB;
				}

				case 'mysql': {
					return EngineType.MySQL;
				}

				default: {
					break;
				}
			}
		}
	}

	return undefined;
}
