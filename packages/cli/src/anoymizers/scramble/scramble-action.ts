import {
  createScrambleAnonymizer,
  ScrambleAnonymizer,
} from "@databye/anonymizers";
import { type Command } from "commander";
import { runAnonymizeColumnAction } from "../run-anonymize-column-action.js";

export async function scrambleAction(this: Command) {
  const scrambleAnonymizer: ScrambleAnonymizer = createScrambleAnonymizer();
  await runAnonymizeColumnAction(this.parent!, scrambleAnonymizer);
}
