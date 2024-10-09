import chalk from "chalk";
import Enquirer from "enquirer";

const { prompt } = Enquirer;

// Cyan
const color = chalk.cyan;

export async function checkUserConfirm(column: string): Promise<boolean> {
  try {
    let confirmMessage = `Are you sure you want to anonymize column "${color(
      column
    )}"`;

    const answer = await prompt<{ run: boolean }>({
      type: "confirm",
      name: "run",
      message: confirmMessage,
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
