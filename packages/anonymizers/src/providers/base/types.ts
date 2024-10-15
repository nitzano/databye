import { Anonymizer, ProviderType } from '@databye/common';
import { type FakeOptions } from '../fake/fake-options.js';
import { type MaskOptions } from '../mask/mask-options.js';



export type BaseProvider = {
	type: ProviderType;
};

export type FakeProvider = {
	type: ProviderType.Fake;
	options?: FakeOptions;
} & Anonymizer;

export type MaskProvider = {
	type: ProviderType.Mask;
	options?: MaskOptions;
} & Anonymizer;

export type ScrambleProvider = {
	type: ProviderType.Scramble;
	options: undefined;
} & Anonymizer;

export type Provider = FakeProvider | MaskProvider | ScrambleProvider;
