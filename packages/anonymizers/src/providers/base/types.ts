import {type FakeOptions} from '../fake/fake-options.js';
import {type MaskOptions} from '../mask/mask-options.js';
import {type BaseAnonymizer} from './base-anonymizer.js';

export type ProviderType = 'mask' | 'fake' | 'const' | 'scramble' | 'remove';



export type BaseProvider = {
	type: ProviderType;
};

export type FakeProvider = {
	type: 'fake';
	options?: FakeOptions;
} & BaseAnonymizer;

export type MaskProvider = {
	type: 'mask';
	options?: MaskOptions;
} & BaseAnonymizer;

export type ScrambleProvider = {
	type: 'scramble';
	options: undefined;
} & BaseAnonymizer;

export type Provider = FakeProvider | MaskProvider | ScrambleProvider;
