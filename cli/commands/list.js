/**
 * List Command - List recent expenses
 * so-quyi list
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { getTodaysExpenses, getOrCreateUser, disconnectDatabase, KakeiboLabels, KakeiboColors, ResetColor } from '../utils/db.js';

const listCommand = new Command('list');

listCommand
  .description('Liệt kê chi tiêu gần đây')
  .option('-n, --number <number>', 'Số lượng hiển thị', '10')
  .action(async (options) => {
    try {
      // Get or create user
      const user = await getOrCreateUser();
      const userId = user.id;
      const limit = parseInt(options.number) || 10;

      // Get recent expenses
      const expenses = await getRecentExpenses(userId, limit);

      if (expenses.length === 0) {
        console.log(chalk.gray('\nChưa có chi tiêu nào.\n'));
        console.log(chalk.gray('Thử: so-quyi add 50000 MUỐN "Cafe sáng"\n'));
        await disconnectDatabase();
        return;
      }

      // Display header
      console.log('\n' + chalk.cyan('📝 Chi tiêu gần đây\n'));

      // Display expenses
      for (const expense of expenses) {
        const type = expense.category.kakeiboType;
        const color = KakeiboColors[type];
        const label = KakeiboLabels[type];

        const date = new Date(expense.occurredAt).toLocaleDateString('vi-VN', {
          month: 'short',
          day: 'numeric',
        });
        const time = new Date(expense.occurredAt).toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
        });

        console.log(`${color}●${ResetColor} ${label} ${chalk.gray(date + ' ' + time)}`);
        console.log(chalk.white(`  ${expense.title}`));
        console.log(chalk.gray(`  ${formatMoney(expense.amount)}`));
        if (expense.notes) {
          console.log(chalk.gray(`  📝 ${expense.notes}`));
        }
        console.log('');
      }

      await disconnectDatabase();
    } catch (error) {
      console.error(chalk.red(`\n❌ Lỗi: ${error.message}\n`));
      process.exit(1);
    }
  });

/**
 * Get recent expenses
 */
async function getRecentExpenses(userId, limit) {
  const { prisma } = await import('../utils/db.js');

  const expenses = await prisma.expense.findMany({
    where: { userId },
    include: { category: true },
    orderBy: { occurredAt: 'desc' },
    take: limit,
  });

  return expenses;
}

/**
 * Format money
 */
function formatMoney(amount) {
  const num = parseFloat(amount);
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(num);
}

export default listCommand;
