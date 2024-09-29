import {type FakeType} from './types.js';

export type FakeOptions = {
	fakeValue: FakeType;
};

export const defaultFakeOptions: FakeOptions = {
	fakeValue: 'word',
};
