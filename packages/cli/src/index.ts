#!/usr/bin/env node

import { Command } from "commander";
export const program = new Command().alias("dz");
export * from "./commands/anon-col/anon-col-command.js";
