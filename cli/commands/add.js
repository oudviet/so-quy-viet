/**
 * Add Command - Add expense
 * so-quyi add <amount> <type> <description>
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { addExpense, getOrCreateUser, disconnectDatabase, KakeiboType, KakeiboLabels, KakeiboColors, ResetColor } from '../utils/db.js';

const addCommand = new Command('add');

addCommand
  .description('Thêm chi tiêu mới')
  .argument('<amount>', 'Số tiền (ví dụ: 50000)')
  .argument('<type>', 'Loại Kakeibo: CẦN, MUỐN, NÊN, CÓ_THỈ (hoặc NEED, WANT, SHOULD, CAN)')
  .argument('<description>', 'Mô tả chi tiêu')
  .option('-n, --notes <notes>', 'Ghi chú thêm')
  .action(async (amount, type, description, options) => {
    try {
      // Normalize type
      const normalizedType = normalizeType(type);

      if (!normalizedType) {
        console.error(chalk.red('❌ Loại không hợp lệ!'));
        console.error(chalk.gray('   Dùng: CẦN, MUỐN, NÊN, CÓ_THỈ'));
        console.error(chalk.gray('   Hoặc: NEED, WANT, SHOULD, CAN\n'));
        process.exit(1);
      }

      // Get or create user
      const user = await getOrCreateUser();
      const userId = user.id;

      // Add expense
      const expense = await addExpense(userId, amount, normalizedType, description, options.notes || '');

      // Display success
      const color = KakeiboColors[normalizedType];
      const label = KakeiboLabels[normalizedType];

      console.log('\n' + color + `●${ResetColor} ${label}`);
      console.log(chalk.white(`  ${description}`));
      console.log(chalk.gray(`  ${formatMoney(amount)}\n`));

      console.log(chalk.green('✅ Đã lưu!\n'));

      await disconnectDatabase();
    } catch (error) {
      console.error(chalk.red(`\n❌ Lỗi: ${error.message}\n`));
      process.exit(1);
    }
  });

/**
 * Normalize Kakeibo type input
 */
function normalizeType(input) {
  const upper = input.toUpperCase().replace(' ', '_');

  // Vietnamese to English mapping
  const mapping = {
    'CẦN': KakeiboType.NEED,
    'MUỐN': KakeiboType.WANT,
    'NÊN': KakeiboType.SHOULD,
    'CÓ_THỈ': KakeiboType.CAN,
    'CÓ_THỂ': KakeiboType.CAN,
  };

  return mapping[upper] || Object.values(KakeiboType).find(t => t === upper);
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

export default addCommand;
