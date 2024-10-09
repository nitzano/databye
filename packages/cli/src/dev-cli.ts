#!/usr/bin/env node

import { Command } from "commander";
import { anonColCommand } from "./anon-col/anon-col-command.js";
export const program = new Command();

program.addCommand(anonColCommand);
program.parse(process.argv);
