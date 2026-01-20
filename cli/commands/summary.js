/**
 * Summary Command - Daily/Weekly/Monthly summary with insights
 * so-quyi summary [--week] [--month]
 */

import { Command } from 'commander';
import chalk from 'chalk';
import {
  getTodaysExpenses,
  getExpensesByKakeiboType,
  getExpensesByDateRange,
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
  .option('-w, --week', 'Xem tổng hợp tuần này')
  .option('-m, --month', 'Xem tổng hợp tháng này')
  .option('-d, --date <date>', 'Ngày cụ thể (YYYY-MM-DD)')
  .action(async (options) => {
    try {
      // Get or create user
      const user = await getOrCreateUser();
      const userId = user.id;

      let startDate, endDate, title, showIndividualExpenses;

      // Determine date range based on options
      if (options.week) {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Sunday
        const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to Monday
        startDate = new Date(now.setDate(diff));
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date();
        title = 'Tuần này';
        showIndividualExpenses = false; // Too many for weekly
      } else if (options.month) {
        const now = new Date();
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date();
        title = 'Tháng ' + (now.getMonth() + 1);
        showIndividualExpenses = false;
      } else {
        // Daily (default)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        startDate = today;
        endDate = new Date();
        title = 'Hôm nay';
        showIndividualExpenses = true;
      }

      // Get expenses for the period
      const expenses = await getExpensesByDateRange(userId, startDate, endDate);

      // Get grouped by type
      const grouped = await getExpensesByKakeiboType(userId, startDate, endDate);

      // Calculate totals
      let totalAmount = 0;
      let totalCount = 0;
      for (const type of Object.values(KakeiboType)) {
        totalAmount += grouped[type].total;
        totalCount += grouped[type].expenses.length;
      }

      // Display header
      let dateStr;
      if (options.week) {
        const weekStart = startDate.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' });
        const weekEnd = endDate.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' });
        dateStr = `Tuần này (${weekStart} - ${weekEnd})`;
      } else if (options.month) {
        dateStr = endDate.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });
      } else {
        dateStr = endDate.toLocaleDateString('vi-VN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }

      console.log('\n' + chalk.cyan('📊 Sổ Quỹ Việt'));
      console.log(chalk.gray(dateStr));
      console.log('');
      console.log(chalk.white.bold(`Tổng: ${formatMoney(totalAmount)}`) + chalk.gray(` (${totalCount} khoản)\n`));

      // Display 4 Kakeibo types
      for (const type of Object.values(KakeiboType)) {
        const data = grouped[type];
        const color = KakeiboColors[type];
        const label = KakeiboLabels[type];
        const amount = data.total;
        const count = data.expenses.length;

        if (amount > 0) {
          const percent = totalAmount > 0 ? ((amount / totalAmount) * 100).toFixed(0) : 0;

          console.log(`${color}●${ResetColor} ${chalk.bold(label)} ${chalk.gray(formatMoney(amount))} ${chalk.gray(`(${percent}%)`)} ${chalk.gray(`(${count} khoản)`)}`);

          // Show individual expenses only for daily view
          if (showIndividualExpenses && count <= 10) {
            for (const expense of data.expenses) {
              const time = new Date(expense.occurredAt).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
              });
              console.log(chalk.gray(`   ${time} - ${expense.title}`));
            }
          }
          console.log('');
        }
      }

      // Show insights
      if (totalAmount > 0) {
        showInsights(grouped, totalAmount, options.week || options.month);
      } else {
        console.log(chalk.gray(`Chưa có chi tiêu ${title.toLowerCase()}.\n`));
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
function showInsights(grouped, totalAmount, isPeriod) {
  const periodLabel = isPeriod ? 'kỳ này' : 'hôm nay';
  console.log(chalk.cyan(`💡 Góc Nhìn ${periodLabel}\n`));

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
    console.log(`${color}${label}${ResetColor} chiếm ${chalk.bold(percent + '%')} ${periodLabel} (${formatMoney(largestAmount)})`);

    // Monthly projection (only for daily/weekly)
    if (!isPeriod) {
      const monthly = largestAmount * 30;
      console.log(chalk.gray(`   → Tháng này: ~${formatMoney(monthly)} nếu đều đặn`));
    }

    // Actionable insight based on type
    showTypeSpecificInsight(largestType, largestAmount, isPeriod);
    console.log('');
  }

  // NEED ratio check
  const needTotal = grouped[KakeiboType.NEED].total;
  const needPercent = totalAmount > 0 ? ((needTotal / totalAmount) * 100).toFixed(0) : 0;

  if (needTotal > 0) {
    if (needPercent < 50) {
      console.log(chalk.green(`✨ CẦN dưới 50% - Tốt! Vẫn còn room cho MUỐN/NÊN\n`));
    } else {
      console.log(chalk.yellow(`⚠️  CẦN chiếm ${needPercent}% - Cân nhắc giảm chi phí sinh hoạt\n`));
    }
  }

  // Weekly/monthly averages
  if (isPeriod) {
    const dailyAvg = totalAmount / 30; // Approximate
    console.log(chalk.gray(`📈 Trung bình: ~${formatMoney(dailyAvg)}/ngày\n`));
  }
}

/**
 * Show type-specific insights
 */
function showTypeSpecificInsight(type, amount, isPeriod) {
  switch (type) {
    case KakeiboType.WANT:
      if (isPeriod) {
        const monthlySavings = amount * 0.5; // Assume can reduce 50%
        console.log(chalk.gray(`   → Nếu giảm 50%: Tiết kiệm ${formatMoney(monthlySavings)}/kỳ`));
      } else {
        const daily = amount;
        const monthlySavings = daily * 15; // Assume can reduce 50%
        console.log(chalk.gray(`   → Nếu giảm 50%: Tiết kiệm ${formatMoney(monthlySavings)}/tháng`));
        console.log(chalk.gray(`   → 1 năm: ${formatMoney(monthlySavings * 12)}`));
      }
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
