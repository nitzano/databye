import {replace} from 'lodash-es';
import {BaseAnonymizer} from '../base/base-anonymizer.js';
import {type ProviderType} from '../base/types.js';
import {defaultMaskOptions, type MaskOptions} from './mask-options.js';

export class MaskAnonymizer extends BaseAnonymizer {
	name: ProviderType = 'mask';
	private readonly options: MaskOptions;

	constructor(maskOptions?: MaskOptions) {
		super();
		this.options = maskOptions ?? defaultMaskOptions;
	}

	anonymizeString(value: string): string {
		return replace(value, /./g, this.options.character);
	}
}
