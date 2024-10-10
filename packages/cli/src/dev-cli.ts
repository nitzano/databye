#!/usr/bin/env node

import { Command } from "commander";
import process from "node:process";
import { anonColCommand } from "./anon-col/anon-col-command.js";

const program = new Command().alias("dbye");

program.addCommand(anonColCommand);
program.parse(process.argv);
