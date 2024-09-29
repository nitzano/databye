import {shuffle} from 'lodash-es';
import {BaseAnonymizer} from '../base/base-anonymizer.js';
import {type ProviderType} from '../base/types.js';

export class ScrambleAnonymizer extends BaseAnonymizer {
	name: ProviderType = 'scramble';

	anonymizeString(value: string): string {
		return value?.length ? shuffle(value.split('')).join('') : value;
	}
}
