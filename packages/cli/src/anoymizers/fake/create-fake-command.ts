import { FakeSource } from "@databye/anonymizers";
import { Command, Option } from "commander";
import { fakeAction } from "./fake-action.js";

export function createFakeCommand(): Command {
    return new Command("fake")
        .description("Fill with a fake value")
        .addOption(
            new Option('--source <source>', 'Fake Provider').default(FakeSource.Word).choices(Object.values(FakeSource))
        ).action(fakeAction)
}