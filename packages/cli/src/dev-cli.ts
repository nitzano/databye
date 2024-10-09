#!/usr/bin/env node

import { Command } from "commander";
export const program = new Command();

import { anonColCommand } from "@databye/cli";
program.addCommand(anonColCommand);
program.parse(process.argv);
