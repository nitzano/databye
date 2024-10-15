import { Chance } from 'chance';
import { BaseAnonymizer } from '../base/base-anonymizer.js';
import { type ProviderType } from '../base/types.js';
import { type FakeOptions } from './fake-options.js';
import { FakeSource } from './types.js';

const chance = new Chance();

export class FakeAnonymizer extends BaseAnonymizer {
	name: ProviderType = 'fake';

	constructor(private readonly options: FakeOptions) {
		super();
	}

	anonymizeString(value: string): string {
		switch (this.options.provider) {
			case FakeSource.First: {
				return chance.first();
			}

			case FakeSource.Last: {
				return chance.last();
			}

			case FakeSource.Word: {
				return chance.word();
			}

			case FakeSource.Name: {
				return chance.name();
			}

			case FakeSource.Animal: {
				return chance.animal();
			}

			case FakeSource.Email: {
				return chance.email();
			}

			default: {
				break;
			}
		}

		return value;
	}

	anonymizeNumber(value: number): number {
		switch (this.options.provider) {
			case FakeSource.Age: {
				return chance.age();
			}

			default: {
				break;
			}
		}

		return value;
	}
}
