import { Anonymizer } from "@databye/anonymizers";
import { Command } from "commander";
import { runColumnAnonymizerAction } from "./run-anonymizer-command.js";


export async function createAnonymizerAction(anonymizer: Anonymizer) {
    async function action(this: Command) {
        await runColumnAnonymizerAction(this.parent!, anonymizer);
    }
    return action

}
