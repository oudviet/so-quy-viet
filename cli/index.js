#!/usr/bin/env node

/**
 * Sổ Quỹ Việt - CLI Entry Point
 * Kakeibo expense tracking for Vietnamese users
 */

import { Command } from 'commander';
import initCommand from './commands/init.js';
import addCommand from './commands/add.js';
import summaryCommand from './commands/summary.js';
import listCommand from './commands/list.js';

const program = new Command();

// CLI Info
program
  .name('so-quyi')
  .description('Sổ Quỹ Việt - Quản lý chi tiêu theo phương pháp Kakeibo')
  .version('1.0.0');

// Commands
program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(summaryCommand);
program.addCommand(listCommand);

// Parse arguments
program.parse();
