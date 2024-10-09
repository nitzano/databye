import {
  createScrambleAnonymizer,
  type ScrambleAnonymizer,
} from "@databye/anonymizers";
import { type Command } from "commander";
import { extractConnectionOptions } from "../../commands/anon-col/helpers/extract-connection-options.js";
import { processColumnHelper } from "../../commands/anon-col/helpers/process-column-helper.js";

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
