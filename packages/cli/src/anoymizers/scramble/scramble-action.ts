import {
  createScrambleAnonymizer,
  ScrambleAnonymizer,
} from "@databye/anonymizers";
import { type Command } from "commander";
import { runColumnAnonymizerAction } from "../run-anonymizer-command.js";

export async function scrambleAction(this: Command) {
  const scrambleAnonymizer: ScrambleAnonymizer = createScrambleAnonymizer();
  await runColumnAnonymizerAction(this.parent!, scrambleAnonymizer);
}
