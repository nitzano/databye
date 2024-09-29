import process from 'node:process';
import {
	createLogger as createWinstonLogger,
	format,
	transports,
	type Logger,
} from 'winston';

function isDevelopment(): boolean {
	return process.env.NODE_ENV !== 'production';
}

export function createLogger(): Logger {
	const defaultLogLevel = isDevelopment() ? 'debug' : 'info';

	const logger = createWinstonLogger({
		level: process.env.LOG_LEVEL ?? defaultLogLevel,
		format: format.combine(format.errors({stack: true}), format.cli()),
		transports: [new transports.Console()],
	});
	return logger;
}
