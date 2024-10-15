import { Anonymizer, ProviderType } from '@databye/common';
import { FakeAnonymizer } from '../fake/fake-anonymizer.js';
import { defaultFakeOptions, type FakeOptions } from '../fake/fake-options.js';
import { MaskAnonymizer } from '../mask/mask-anonymizer.js';
import { defaultMaskOptions, type MaskOptions } from '../mask/mask-options.js';
import { ScrambleAnonymizer } from '../scramble/scramble-anonymizer.js';

export function createMaskAnonymizer(options: MaskOptions): MaskAnonymizer {
	return new MaskAnonymizer({ ...defaultMaskOptions, ...options });
}

export function createFakeAnonymizer(options: FakeOptions): FakeAnonymizer {
	return new FakeAnonymizer({ ...defaultFakeOptions, ...options });
}

export function createScrambleAnonymizer(): ScrambleAnonymizer {
	return new ScrambleAnonymizer();
}

export function createAnonymizer(
	type: ProviderType,
	options?: unknown,
): Anonymizer {
	switch (type) {
		case 'mask': {
			return createMaskAnonymizer(options as MaskOptions);
		}

		case 'fake': {
			return createFakeAnonymizer(options as FakeOptions);
		}

		case 'scramble': {
			return createScrambleAnonymizer();
		}

		default: {
			break;
		}
	}

	throw new Error('could not match');
}
