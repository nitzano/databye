import { FakeSource } from "@databye/anonymizers";
import { Argument, Command } from "commander";
import { fakeAction } from "./fake-action.js";

export function createFakeCommand(): Command {
  return new Command("fake")
    .description("Fill with a fake value")
    .addArgument(
      new Argument("<source>", "Fake Source")
        .default(FakeSource.Word)
        .choices(Object.values(FakeSource))
    )
    .action(fakeAction);
}
