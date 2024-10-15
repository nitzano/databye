import { createLogger } from '@databye/common';
import { Chance } from 'chance';
import { BaseAnonymizer } from '../base/base-anonymizer.js';
import { type ProviderType } from '../base/types.js';
import { type FakeOptions } from './fake-options.js';
import { FakeSource } from './types.js';

const logger = createLogger()

const chance = new Chance();

export class FakeAnonymizer extends BaseAnonymizer {
	name: ProviderType = 'fake';

	constructor(private readonly options: FakeOptions) {
		super();
	}

	anonymizeString(value: string): string {
		logger.debug(`fake source=${this.options.source}`)
		switch (this.options.source) {
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
		switch (this.options.source) {
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
