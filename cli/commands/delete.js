/**
 * Delete Command - Delete expense
 * so-quyi delete <id>
 */

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { deleteExpense, getOrCreateUser, disconnectDatabase, KakeiboLabels, KakeiboColors, ResetColor, prisma } from '../utils/db.js';

const deleteCommand = new Command('delete');

deleteCommand
  .description('Xóa chi tiêu')
  .argument('[id]', 'ID chi tiêu (xem bằng: so-quyi list)')
  .option('-y, --yes', 'Xác nhận luôn không hỏi')
  .action(async (id, options) => {
    try {
      const user = await getOrCreateUser();
      const userId = user.id;

      // If no ID provided, show recent expenses and prompt
      if (!id) {
        const expenses = await prisma.expense.findMany({
          where: { userId },
          include: { category: true },
          orderBy: { occurredAt: 'desc' },
          take: 10,
        });

        if (expenses.length === 0) {
          console.log(chalk.gray('\nChưa có chi tiêu nào.\n'));
          await disconnectDatabase();
          return;
        }

        console.log(chalk.cyan('\n📝 Chi tiêu gần đây\n'));

        const choices = expenses.map(exp => {
          const type = exp.category.kakeiboType;
          const color = KakeiboColors[type];
          const label = KakeiboLabels[type];
          const amount = formatMoney(exp.amount);
          const date = new Date(exp.occurredAt).toLocaleDateString('vi-VN', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          return {
            name: `${color}●${ResetColor} ${label} ${chalk.gray(date)} - ${exp.title} (${amount})`,
            value: exp.id,
          };
        });

        choices.push({ name: chalk.gray('← Hủy'), value: 'cancel' });

        const answer = await inquirer.prompt([
          {
            type: 'list',
            name: 'expenseId',
            message: 'Chọn chi tiêu để xóa:',
            choices,
          },
        ]);

        if (answer.expenseId === 'cancel') {
          console.log(chalk.gray('\nĐã hủy.\n'));
          await disconnectDatabase();
          return;
        }

        id = answer.expenseId;
      }

      // Confirm deletion unless --yes flag
      if (!options.yes) {
        const expense = await getExpenseById(id, userId);

        if (!expense) {
          console.log(chalk.red('\n❌ Không tìm thấy chi tiêu này.\n'));
          await disconnectDatabase();
          return;
        }

        const type = expense.category.kakeiboType;
        const color = KakeiboColors[type];
        const label = KakeiboLabels[type];

        console.log('\n' + color + `●${ResetColor} ${label}`);
        console.log(chalk.white(`  ${expense.title}`));
        console.log(chalk.gray(`  ${formatMoney(expense.amount)}\n`));

        const confirm = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'delete',
            message: 'Chắc chắn xóa?',
            default: false,
          },
        ]);

        if (!confirm.delete) {
          console.log(chalk.gray('\nĐã hủy.\n'));
          await disconnectDatabase();
          return;
        }
      }

      // Delete expense
      await deleteExpense(id, userId);

      console.log(chalk.green('\n✅ Đã xóa!\n'));

      await disconnectDatabase();
    } catch (error) {
      console.error(chalk.red(`\n❌ Lỗi: ${error.message}\n`));
      await disconnectDatabase();
      process.exit(1);
    }
  });

/**
 * Get expense by ID
 */
async function getExpenseById(id, userId) {
  const { prisma } = await import('../utils/db.js');

  return await prisma.expense.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      category: true,
    },
  });
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

export default deleteCommand;
