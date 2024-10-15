import { FakeSource } from "@databye/anonymizers";
import { Command, Option } from "commander";

export function createFakeCommand(): Command {
    return new Command("fake")
        .description("Fill with a fake value")
        .addOption(
            new Option('--source --provider <source>', 'Fake Provider').default(FakeSource.Word).choices(Object.values(FakeSource))
        )
}