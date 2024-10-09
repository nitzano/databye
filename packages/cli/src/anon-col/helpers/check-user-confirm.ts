import chalk from "chalk";
import Enquirer from "enquirer";

const { prompt } = Enquirer;

// Cyan
const color = chalk.cyan;

export async function checkUserConfirm(
  column: string,
  database?: string,
  table?: string
): Promise<boolean> {
  try {
    let confirmMessage = `Are you sure you want to anonymize column "${color(
      column
    )}"`;

    if (database && table) {
      confirmMessage += ` in "${color(database)}/${color(table)}"`;
    }

    const answer = await prompt<{ run: boolean }>({
      type: "confirm",
      name: "run",
      message: `Are you sure you want to anonymize column "${color(
        column
      )}" in "${color(database)}/${color(table)}" `,
      initial: "true",
    });
    if (answer.run) {
      return true;
    }

    return false;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("could not receive answer");
  }
}
