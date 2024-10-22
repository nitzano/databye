import {
  createFakeAnonymizer,
  FakeAnonymizer,
  FakeOptions,
  FakeSource,
} from "@datazar-cli/anonymizers";
import { createLogger } from "@datazar-cli/common";
import { type Command } from "commander";
import { runAnonymizeColumnAction } from "../run-anonymize-column-action.js";

const logger = createLogger();

export async function fakeAction(this: Command) {
  const fakeOptions: FakeOptions = {
    source: this.args[0] as FakeSource,
  };

  const fakeAnonymizer: FakeAnonymizer = createFakeAnonymizer(fakeOptions);
  await runAnonymizeColumnAction(this.parent!, fakeAnonymizer);
}
