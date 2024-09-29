#!/usr/bin/env node

import process from 'node:process';
import {Command} from 'commander';
import {anonColCommand} from './commands/anon-col/anon-col-command.js';
// Import {anonDbCommand} from './commands/anon-db/anon-db-command';

const program = new Command();

program.alias('dz');
program.addCommand(anonColCommand);
// Program.addCommand(anonDbCommand);

program.parse(process.argv);
