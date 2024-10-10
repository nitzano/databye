import { Command, createOption } from "commander";

const columnString = "-c --column <columnName>";
const columnDescription = "Column name to process";

export const columnOption = createOption(columnString, columnDescription);

export function addColumnOption(cmd: Command) {
  cmd.requiredOption(columnString, columnDescription);
}
