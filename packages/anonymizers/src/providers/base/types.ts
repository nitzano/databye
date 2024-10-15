import { Anonymizer } from '@databye/common';
import { type FakeOptions } from '../fake/fake-options.js';
import { type MaskOptions } from '../mask/mask-options.js';

export type ProviderType = 'mask' | 'fake' | 'const' | 'scramble' | 'remove';



export type BaseProvider = {
	type: ProviderType;
};

export type FakeProvider = {
	type: 'fake';
	options?: FakeOptions;
} & Anonymizer;

export type MaskProvider = {
	type: 'mask';
	options?: MaskOptions;
} & Anonymizer;

export type ScrambleProvider = {
	type: 'scramble';
	options: undefined;
} & Anonymizer;

export type Provider = FakeProvider | MaskProvider | ScrambleProvider;
