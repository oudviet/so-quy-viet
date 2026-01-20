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
import deleteCommand from './commands/delete.js';
import editCommand from './commands/edit.js';
import exportCommand from './commands/export.js';

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
program.addCommand(deleteCommand);
program.addCommand(editCommand);
program.addCommand(exportCommand);

// Parse arguments
program.parse();
