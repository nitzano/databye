import { Anonymizer } from "@databye/common";
import { Command } from "commander";
import { runAnonymizeColumnAction } from "./run-anonymize-column-action.js";


export async function createAnonymizerAction(anonymizer: Anonymizer) {
    async function action(this: Command) {
        await runAnonymizeColumnAction(this.parent!, anonymizer);
    }
    return action

}
