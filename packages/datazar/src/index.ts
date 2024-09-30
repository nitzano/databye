#!/usr/bin/env node

import { anonColCommand } from "@datazar/cli";
import { Command } from "commander";
import process from "node:process";
// Import {anonDbCommand} from './commands/anon-db/anon-db-command';

const program = new Command().alias("dz");

program;
program.addCommand(anonColCommand);

program.parse(process.argv);
