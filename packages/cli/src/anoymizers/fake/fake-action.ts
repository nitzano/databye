import {
    createFakeAnonymizer,
    FakeAnonymizer,
    FakeOptions,
    FakeSource
} from "@databye/anonymizers";
import { createLogger } from "@databye/common";
import { type Command } from "commander";
import { runAnonymizeColumnAction } from "../run-anonymize-column-action.js";

const logger = createLogger()

export async function fakeAction(this: Command) {
    const fakeOptions: FakeOptions = {
        source: this.opts().source as FakeSource,
    };

    const fakeAnonymizer: FakeAnonymizer = createFakeAnonymizer(fakeOptions);
    await runAnonymizeColumnAction(this.parent!, fakeAnonymizer);
}
