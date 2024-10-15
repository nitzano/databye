import { Chance } from 'chance';
import { BaseAnonymizer } from '../base/base-anonymizer.js';
import { type ProviderType } from '../base/types.js';
import { type FakeOptions } from './fake-options.js';
import { FakeProvider } from './types.js';

const chance = new Chance();

export class FakeAnonymizer extends BaseAnonymizer {
	name: ProviderType = 'fake';

	constructor(private readonly options: FakeOptions) {
		super();
	}

	anonymizeString(value: string): string {
		switch (this.options.provider) {
			case FakeProvider.First: {
				return chance.first();
			}

			case FakeProvider.Last: {
				return chance.last();
			}

			case FakeProvider.Word: {
				return chance.word();
			}

			case FakeProvider.Name: {
				return chance.name();
			}

			case FakeProvider.Animal: {
				return chance.animal();
			}

			case FakeProvider.Email: {
				return chance.email();
			}

			default: {
				break;
			}
		}

		return value;
	}

	anonymizeNumber(value: number): number {
		switch (this.options.fakeValue) {
			case 'age': {
				return chance.age();
			}

			default: {
				break;
			}
		}

		return value;
	}
}
