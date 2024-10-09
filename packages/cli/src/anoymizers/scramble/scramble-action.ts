import {
  createScrambleAnonymizer,
  type ScrambleAnonymizer,
} from "@databye/anonymizers";
import { type Command } from "commander";
import { processColumnHelper } from "../../anon-col/column-processor-runner.js";
import { extractConnectionOptions } from "../../anon-col/helpers/extract-connection-options.js";

export async function scrambleAction(this: Command) {
  const connectionOptions = extractConnectionOptions(this);

  // Build anonymizer
  const scrambleAnonymizer: ScrambleAnonymizer = createScrambleAnonymizer();

  // Anonymize column
  await processColumnHelper(
    connectionOptions,
    scrambleAnonymizer,
    this.optsWithGlobals().confirm as boolean
  );
}
