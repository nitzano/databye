import {
	createScrambleAnonymizer,
	type ScrambleAnonymizer,
} from '@datazar/anonymizers';
import {type Command} from 'commander';
import {extractConnectionOptions} from '../../helpers/extract-connection-options.js';
import {processColumnHelper} from '../../helpers/process-column-helper.js';

export async function scrambleAction(this: Command) {
	const connectionOptions = extractConnectionOptions(this);

	// Build anonymizer
	const scrambleAnonymizer: ScrambleAnonymizer = createScrambleAnonymizer();

	// Anonymize column
	await processColumnHelper(
		connectionOptions,
		scrambleAnonymizer,
		this.optsWithGlobals().confirm as boolean,
	);
}
