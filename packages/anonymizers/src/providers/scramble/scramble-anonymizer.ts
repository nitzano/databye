import { ProviderType } from "@datazar-cli/common";
import { shuffle } from "lodash-es";
import { BaseAnonymizer } from "../base/base-anonymizer.js";

export class ScrambleAnonymizer extends BaseAnonymizer {
  name: ProviderType = ProviderType.Scramble;

  anonymizeString(value: string): string {
    return value?.length ? shuffle(value.split("")).join("") : value;
  }
}
