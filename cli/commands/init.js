/**
 * Init Command - Initialize Sổ Quỹ Việt
 * Setup database and default user
 */

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { initializeDatabase, getOrCreateUser, disconnectDatabase } from '../utils/db.js';

const initCommand = new Command('init');

initCommand
  .description('Khởi tạo Sổ Quỹ Việt')
  .action(async () => {
    console.log(chalk.cyan('\n🚀 Khởi tạo Sổ Quỹ Việt...\n'));

    try {
      // Step 1: Initialize database
      console.log(chalk.yellow('📦 Bước 1: Khởi tạo database...'));
      await initializeDatabase();
      console.log(chalk.green('✅ Database đã sẵn sàng!\n'));

      // Step 2: Create user
      console.log(chalk.yellow('👤 Bước 2: Tạo người dùng...'));

      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'fullName',
          message: 'Tên của bạn:',
          default: 'Người dùng Sổ Quỹ',
        },
        {
          type: 'input',
          name: 'email',
          message: 'Email (để identificaton):',
          default: 'user@soquyi.local',
        },
      ]);

      const user = await getOrCreateUser(answers.email);

      // Update user info
      if (answers.fullName !== 'Người dùng Sổ Quỹ') {
        // Note: In real implementation, update user fullName
        console.log(chalk.gray(`   → Xin chào ${answers.fullName}!`));
      }

      console.log(chalk.green('✅ Đã tạo người dùng!\n'));

      // Step 3: Done
      console.log(chalk.cyan('🎉 Hoàn tất!\n'));
      console.log(chalk.white('Sổ Quỹ Việt đã sẵn sàng!'));
      console.log(chalk.gray('Thử lệnh:'));
      console.log(chalk.gray('  so-quyi add 50000 MUỐN "Cafe sáng"'));
      console.log(chalk.gray('  so-quyi summary\n'));

      await disconnectDatabase();
    } catch (error) {
      console.error(chalk.red(`\n❌ Lỗi: ${error.message}\n`));
      process.exit(1);
    }
  });

export default initCommand;
