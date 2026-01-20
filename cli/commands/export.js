/**
 * Export Command - Export expenses to CSV
 * so-quyi export --csv
 */

import { Command } from 'commander';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { getExpensesByDateRange, getOrCreateUser, disconnectDatabase, KakeiboLabels, prisma } from '../utils/db.js';

const exportCommand = new Command('export');

exportCommand
  .description('Xuất dữ liệu')
  .option('-c, --csv', 'Xuất ra file CSV')
  .option('-j, --json', 'Xuất ra file JSON')
  .option('-o, --output <path>', 'Đường dẫn file xuất')
  .option('-w, --week', 'Xuất dữ liệu tuần này')
  .option('-m, --month', 'Xuất dữ liệu tháng này')
  .action(async (options) => {
    try {
      // Default to CSV if no format specified
      if (!options.csv && !options.json) {
        options.csv = true;
      }

      const user = await getOrCreateUser();
      const userId = user.id;

      // Determine date range
      let startDate, endDate, periodLabel;

      if (options.week) {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        startDate = new Date(now.setDate(diff));
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date();
        periodLabel = 'tuan';
      } else if (options.month) {
        const now = new Date();
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date();
        periodLabel = 'thang-' + (now.getMonth() + 1);
      } else {
        // Export all
        startDate = new Date(2020, 0, 1); // From beginning
        endDate = new Date();
        periodLabel = 'all';
      }

      // Get expenses
      const expenses = await getExpensesByDateRange(userId, startDate, endDate);

      if (expenses.length === 0) {
        console.log(chalk.gray('\nKhông có dữ liệu để xuất.\n'));
        await disconnectDatabase();
        return;
      }

      // Generate output filename
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const defaultFilename = `so-quyi-${periodLabel}-${dateStr}`;

      let outputPath;
      if (options.output) {
        outputPath = options.output;
      } else {
        const ext = options.csv ? 'csv' : 'json';
        outputPath = path.join(process.cwd(), `${defaultFilename}.${ext}`);
      }

      // Export based on format
      if (options.csv) {
        await exportToCSV(expenses, outputPath);
      } else if (options.json) {
        await exportToJSON(expenses, outputPath);
      }

      console.log(chalk.green(`\n✅ Đã xuất ${expenses.length} khoản ra:`));
      console.log(chalk.gray(`   ${outputPath}\n`));

      await disconnectDatabase();
    } catch (error) {
      console.error(chalk.red(`\n❌ Lỗi: ${error.message}\n`));
      await disconnectDatabase();
      process.exit(1);
    }
  });

/**
 * Export to CSV
 */
async function exportToCSV(expenses, outputPath) {
  const headers = [
    'Ngày',
    'Loại Kakeibo',
    'Số tiền',
    'Mô tả',
    'Ghi chú',
    'Phân loại',
  ];

  const rows = expenses.map(exp => {
    const type = exp.category.kakeiboType;
    const label = KakeiboLabels[type];
    const date = new Date(exp.occurredAt).toLocaleDateString('vi-VN');

    return [
      date,
      label,
      parseFloat(exp.amount).toLocaleString('vi-VN'),
      `"${exp.title.replace(/"/g, '""')}"`, // Escape quotes
      exp.notes ? `"${exp.notes.replace(/"/g, '""')}"` : '',
      `"${exp.category.name}"`,
    ].join(',');
  });

  const csv = [headers.join(','), ...rows].join('\n');

  fs.writeFileSync(outputPath, csv, 'utf-8');
}

/**
 * Export to JSON
 */
async function exportToJSON(expenses, outputPath) {
  const data = expenses.map(exp => {
    const type = exp.category.kakeiboType;
    const label = KakeiboLabels[type];

    return {
      date: new Date(exp.occurredAt).toISOString(),
      kakeibo_type: label,
      kakeibo_type_en: type,
      amount: parseFloat(exp.amount),
      title: exp.title,
      notes: exp.notes || null,
      category: exp.category.name,
      category_en: exp.category.nameEn,
    };
  });

  const json = JSON.stringify(data, null, 2);

  fs.writeFileSync(outputPath, json, 'utf-8');
}

export default exportCommand;
