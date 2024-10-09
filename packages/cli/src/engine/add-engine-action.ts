import { createLogger } from "@databye/common";
import { Command } from "commander";

function engineAction(this: Command) {
  const logger = createLogger();
  logger.debug("engineAction");
}

export function addEngineAction(cmd: Command) {
  cmd.action(engineAction);
}
