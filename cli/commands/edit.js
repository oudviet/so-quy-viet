/**
 * Edit Command - Edit expense
 * so-quyi edit <id>
 */

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { updateExpense, getOrCreateUser, disconnectDatabase, KakeiboType, KakeiboLabels, KakeiboColors, ResetColor, prisma } from '../utils/db.js';

const editCommand = new Command('edit');

editCommand
  .description('Sửa chi tiêu')
  .argument('[id]', 'ID chi tiêu (xem bằng: so-quyi list)')
  .option('-a, --amount <amount>', 'Số tiền mới')
  .option('-t, --type <type>', 'Loại Kakeibo mới')
  .option('-d, --description <description>', 'Mô tả mới')
  .option('-n, --notes <notes>', 'Ghi chú')
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
            message: 'Chọn chi tiêu để sửa:',
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

      // Get current expense
      const expense = await getExpenseById(id, userId);

      if (!expense) {
        console.log(chalk.red('\n❌ Không tìm thấy chi tiêu này.\n'));
        await disconnectDatabase();
        return;
      }

      // Prompt for updates
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'amount',
          message: 'Số tiền:',
          default: expense.amount.toString(),
          validate: input => !isNaN(parseFloat(input)) || 'Vui lòng nhập số',
        },
        {
          type: 'list',
          name: 'kakeiboType',
          message: 'Loại Kakeibo:',
          choices: [
            { name: `${KakeiboColors.NEED}●${ResetColor} CẦN - Survival`, value: KakeiboType.NEED },
            { name: `${KakeiboColors.WANT}●${ResetColor} MUỐN - Desire`, value: KakeiboType.WANT },
            { name: `${KakeiboColors.SHOULD}●${ResetColor} NÊN - Growth`, value: KakeiboType.SHOULD },
            { name: `${KakeiboColors.CAN}●${ResetColor} CÓ THỈ - Unexpected`, value: KakeiboType.CAN },
          ],
          default: expense.category.kakeiboType,
        },
        {
          type: 'input',
          name: 'title',
          message: 'Mô tả:',
          default: expense.title,
        },
        {
          type: 'input',
          name: 'notes',
          message: 'Ghi chú (không bắt buộc):',
          default: expense.notes || '',
        },
      ]);

      // Update expense
      const updates = {
        amount: answers.amount,
        kakeiboType: answers.kakeiboType,
        title: answers.title,
        notes: answers.notes || null,
      };

      await updateExpense(id, userId, updates);

      // Show updated expense
      const color = KakeiboColors[answers.kakeiboType];
      const label = KakeiboLabels[answers.kakeiboType];

      console.log('\n' + color + `●${ResetColor} ${label}`);
      console.log(chalk.white(`  ${answers.title}`));
      console.log(chalk.gray(`  ${formatMoney(answers.amount)}\n`));

      console.log(chalk.green('✅ Đã cập nhật!\n'));

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

export default editCommand;
