import { Anonymizer } from '@databye/common';
import { type FakeOptions } from '../fake/fake-options.js';
import { type MaskOptions } from '../mask/mask-options.js';


export enum ProviderType {
	Mask = 'mask',
	Fake = 'fake',
	Constant = 'const',
	Scramble = 'scramble',
	Remove = 'remove'
}


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
