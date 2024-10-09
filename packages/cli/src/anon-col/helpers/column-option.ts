import { Command, Option } from "commander";

const columnString = "-col --column <columnName>";
const columnDescription = "Column name to process";

export const columnOption = new Option(columnString, columnDescription);

export function addColumnOption(cmd: Command) {
  cmd.requiredOption(columnString, columnDescription);
}
