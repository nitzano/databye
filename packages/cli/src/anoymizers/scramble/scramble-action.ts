import {
  createScrambleAnonymizer,
  ScrambleAnonymizer,
} from "@databye/anonymizers";
import { type Command } from "commander";
import { runAnonymizerCommand } from "../run-anonymizer-command.js";

export async function scrambleAction(this: Command) {
  // const connectionOptions = extractConnectionOptions(this);

  // // Build anonymizer
  const scrambleAnonymizer: ScrambleAnonymizer = createScrambleAnonymizer();
  await runAnonymizerCommand(this.parent!, scrambleAnonymizer);
}
