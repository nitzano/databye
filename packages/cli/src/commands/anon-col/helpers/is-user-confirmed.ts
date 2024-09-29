import chalk from 'chalk';
import Enquirer from 'enquirer';

const {prompt} = Enquirer;

// Cyan
const color = chalk.cyan;

export async function isUserConfirmed(
	database: string,
	table: string,
	column: string,
): Promise<boolean> {
	try {
		const answer = await prompt<{run: boolean}>({
			type: 'confirm',
			name: 'run',
			message: `Are you sure you want to anonymize column "${color(
				column,
			)}" in "${color(database)}/${color(table)}" `,
			initial: 'true',
		});
		if (answer.run) {
			return true;
		}

		return false;
	} catch (error: unknown) {
		console.error(error);
		throw new Error('could not receive answer');
	}
}
