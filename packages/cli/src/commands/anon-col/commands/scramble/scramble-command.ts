import {Command} from 'commander';
import {scrambleAction} from './scramble-action.js';

export const scrambleCommand = new Command('scramble');

scrambleCommand.description('scramble a single column').action(scrambleAction);
