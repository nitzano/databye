import {EngineType} from '@datazar/common';
import {Command, Option} from 'commander';
import {maskCommand} from './commands/mask/mask-command.js';
import {scrambleCommand} from './commands/scramble/scramble-command.js';
import {addConnectionOptions} from './helpers/add-connection-options.js';

export const anonColCommand: Command = new Command('anon-col');

anonColCommand
	.description('Anonymize a single column in a table')
	.addOption(
		new Option('-e --engine <engine>', 'Engine').choices(
			Object.values(EngineType),
		),
	)
	.option('--confirm', 'Confirm before running', true)
	.option('--no-confirm', 'skip confirmation')
	.addCommand(scrambleCommand)
	.addCommand(maskCommand);
// .addCommand(fakeCommand)

addConnectionOptions(anonColCommand);
