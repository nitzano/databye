import chalk from "chalk";
import Enquirer from "enquirer";

const { prompt } = Enquirer;

// Cyan
const color = chalk.yellowBright;

export async function checkUserConfirm(): Promise<boolean> {
  try {
    let confirmMessage = `${color("Run command")}?`;

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
