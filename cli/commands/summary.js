/**
 * Summary Command - Daily summary with insights
 * so-quyi summary
 */

import { Command } from 'commander';
import chalk from 'chalk';
import {
  getTodaysExpenses,
  getExpensesByKakeiboType,
  getOrCreateUser,
  disconnectDatabase,
  KakeiboType,
  KakeiboLabels,
  KakeiboColors,
  ResetColor
} from '../utils/db.js';

const summaryCommand = new Command('summary');

summaryCommand
  .description('Xem tổng hợp chi tiêu')
  .option('-d, --date <date>', 'Ngày cụ thể (YYYY-MM-DD)')
  .action(async (options) => {
    try {
      // Get or create user
      const user = await getOrCreateUser();
      const userId = user.id;

      // Get today's expenses
      const expenses = await getTodaysExpenses(userId);

      // Get grouped by type
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const grouped = await getExpensesByKakeiboType(userId, today);

      // Calculate totals
      let totalAmount = 0;
      for (const type of Object.values(KakeiboType)) {
        totalAmount += grouped[type].total;
      }

      // Display header
      const now = new Date();
      const dateStr = now.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      console.log('\n' + chalk.cyan('📊 Sổ Quỹ Việt'));
      console.log(chalk.gray(dateStr));
      console.log('');
      console.log(chalk.white.bold(`Tổng: ${formatMoney(totalAmount)}`));
      console.log('');

      // Display 4 Kakeibo types
      for (const type of Object.values(KakeiboType)) {
        const data = grouped[type];
        const color = KakeiboColors[type];
        const label = KakeiboLabels[type];
        const amount = data.total;

        if (amount > 0) {
          const percent = totalAmount > 0 ? ((amount / totalAmount) * 100).toFixed(0) : 0;

          console.log(`${color}●${ResetColor} ${chalk.bold(label)} ${chalk.gray(formatMoney(amount))} ${chalk.gray(`(${percent}%)`)}`);

          // Show individual expenses
          for (const expense of data.expenses) {
            const time = new Date(expense.occurredAt).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
            });
            console.log(chalk.gray(`   ${time} - ${expense.title}`));
          }
          console.log('');
        }
      }

      // Show insights
      if (totalAmount > 0) {
        showInsights(grouped, totalAmount);
      } else {
        console.log(chalk.gray('Chưa có chi tiêu hôm nay.\n'));
      }

      await disconnectDatabase();
    } catch (error) {
      console.error(chalk.red(`\n❌ Lỗi: ${error.message}\n`));
      process.exit(1);
    }
  });

/**
 * Show insights based on spending patterns
 */
function showInsights(grouped, totalAmount) {
  console.log(chalk.cyan('💡 Góc Nhìn Hôm Nay\n'));

  // Find largest category
  let largestType = null;
  let largestAmount = 0;

  for (const type of Object.values(KakeiboType)) {
    if (grouped[type].total > largestAmount) {
      largestAmount = grouped[type].total;
      largestType = type;
    }
  }

  if (largestType && largestAmount > 0) {
    const label = KakeiboLabels[largestType];
    const percent = ((largestAmount / totalAmount) * 100).toFixed(0);
    const color = KakeiboColors[largestType];

    // Largest category insight
    console.log(`${color}${label}${ResetColor} chiếm ${chalk.bold(percent + '%')} hôm nay (${formatMoney(largestAmount)})`);

    // Monthly projection
    const monthly = largestAmount * 30;
    console.log(chalk.gray(`   → Tháng này: ~${formatMoney(monthly)} nếu đều đặn`));

    // Actionable insight based on type
    showTypeSpecificInsight(largestType, largestAmount);
    console.log('');
  }

  // NEED ratio check
  const needTotal = grouped[KakeiboType.NEED].total;
  const needPercent = totalAmount > 0 ? ((needTotal / totalAmount) * 100).toFixed(0) : 0;

  if (needTotal > 0) {
    if (needPercent < 50) {
      console.log(chalk.green('✨ CẦN dưới 50% - Tốt! Vẫn còn room cho MUỐN/NÊN\n'));
    } else {
      console.log(chalk.yellow('⚠️  CẦN chiếm ' + needPercent + '% - Cân nhắc giảm chi phí sinh hoạt\n'));
    }
  }
}

/**
 * Show type-specific insights
 */
function showTypeSpecificInsight(type, amount) {
  switch (type) {
    case KakeiboType.WANT:
      const daily = amount;
      const monthlySavings = daily * 15; // Assume can reduce 50%
      console.log(chalk.gray(`   → Nếu giảm 50%: Tiết kiệm ${formatMoney(monthlySavings)}/tháng`));
      console.log(chalk.gray(`   → 1 năm: ${formatMoney(monthlySavings * 12)}`));
      break;

    case KakeiboType.NEED:
      console.log(chalk.gray(`   → Chi phí sinh hoạt thiết yếu`));
      break;

    case KakeiboType.SHOULD:
      console.log(chalk.gray(`   → Đầu tư cho bản thân - Tiếp tục!`));
      break;

    case KakeiboType.CAN:
      console.log(chalk.gray(`   → Chi tiêu bất ngờ - Xem xét fund khẩn cấp`));
      break;
  }
}

/**
 * Format money
 */
function formatMoney(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

export default summaryCommand;
