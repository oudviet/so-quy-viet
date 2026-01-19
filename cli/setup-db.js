/**
 * Setup database for CLI
 * Quick setup using Prisma db push
 */

import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database path
const DB_DIR = path.join(process.env.HOME || process.env.USERPROFILE, '.so-quyi');
const DB_PATH = path.join(DB_DIR, 'data.db');

// Ensure DB directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

console.log('📦 Đang tạo database...');

// Create Prisma client for CLI
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${DB_PATH}`,
    },
  },
});

// Kakeibo types enum
const KakeiboType = {
  NEED: 'NEED',
  WANT: 'WANT',
  SHOULD: 'SHOULD',
  CAN: 'CAN',
};

async function setup() {
  try {
    // Check if database already initialized
    const existingCategories = await prisma.category.count().catch(() => 0);

    if (existingCategories > 0) {
      console.log('✅ Database đã có sẵn!\n');
      await prisma.$disconnect();
      return;
    }

    // Create default system categories
    console.log('Đang tạo phân loại Kakeibo...');

    await prisma.category.createMany({
      data: [
        // NEED (CẦN) - Survival expenses
        { kakeiboType: KakeiboType.NEED, name: 'Ăn uống', nameEn: 'Food', icon: '🍚', color: '#10B981', isSystem: true, displayOrder: 1 },
        { kakeiboType: KakeiboType.NEED, name: 'Nhà ở', nameEn: 'Housing', icon: '🏠', color: '#10B981', isSystem: true, displayOrder: 2 },
        { kakeiboType: KakeiboType.NEED, name: 'Đi lại', nameEn: 'Transport', icon: '🚗', color: '#10B981', isSystem: true, displayOrder: 3 },
        { kakeiboType: KakeiboType.NEED, name: 'Y tế', nameEn: 'Healthcare', icon: '💊', color: '#10B981', isSystem: true, displayOrder: 4 },
        { kakeiboType: KakeiboType.NEED, name: 'Hóa đơn', nameEn: 'Bills', icon: '📄', color: '#10B981', isSystem: true, displayOrder: 5 },

        // WANT (MUỐN) - Desire expenses
        { kakeiboType: KakeiboType.WANT, name: 'Cafe', nameEn: 'Coffee', icon: '☕', color: '#F59E0B', isSystem: true, displayOrder: 10 },
        { kakeiboType: KakeiboType.WANT, name: 'Trà sữa', nameEn: 'Bubble Tea', icon: '🧋', color: '#F59E0B', isSystem: true, displayOrder: 11 },
        { kakeiboType: KakeiboType.WANT, name: 'Shopping', nameEn: 'Shopping', icon: '🛍️', color: '#F59E0B', isSystem: true, displayOrder: 12 },
        { kakeiboType: KakeiboType.WANT, name: 'Giải trí', nameEn: 'Entertainment', icon: '🎬', color: '#F59E0B', isSystem: true, displayOrder: 13 },
        { kakeiboType: KakeiboType.WANT, name: 'Ăn hàng', nameEn: 'Dining Out', icon: '🍜', color: '#F59E0B', isSystem: true, displayOrder: 14 },

        // SHOULD (NÊN) - Growth expenses
        { kakeiboType: KakeiboType.SHOULD, name: 'Sách', nameEn: 'Books', icon: '📚', color: '#F97316', isSystem: true, displayOrder: 20 },
        { kakeiboType: KakeiboType.SHOULD, name: 'Khóa học', nameEn: 'Courses', icon: '🎓', color: '#F97316', isSystem: true, displayOrder: 21 },
        { kakeiboType: KakeiboType.SHOULD, name: 'Quà tặng', nameEn: 'Gifts', icon: '🎁', color: '#F97316', isSystem: true, displayOrder: 22 },
        { kakeiboType: KakeiboType.SHOULD, name: 'Từ thiện', nameEn: 'Charity', icon: '❤️', color: '#F97316', isSystem: true, displayOrder: 23 },

        // CAN (CÓ THỈ) - Unexpected expenses
        { kakeiboType: KakeiboType.CAN, name: 'Sửa chữa', nameEn: 'Repairs', icon: '🔧', color: '#3B82F6', isSystem: true, displayOrder: 30 },
        { kakeiboType: KakeiboType.CAN, name: 'Hỏng hóc', nameEn: 'Breakage', icon: '💔', color: '#3B82F6', isSystem: true, displayOrder: 31 },
        { kakeiboType: KakeiboType.CAN, name: 'Cơ hội', nameEn: 'Opportunity', icon: '⭐', color: '#3B82F6', isSystem: true, displayOrder: 32 },
        { kakeiboType: KakeiboType.CAN, name: 'Khác', nameEn: 'Other', icon: '📦', color: '#3B82F6', isSystem: true, displayOrder: 33 },
      ],
    });

    console.log('✅ Đã tạo phân loại Kakeibo!');
    console.log(`📍 Database: ${DB_PATH}\n`);

    await prisma.$disconnect();
  } catch (error) {
    // If tables don't exist, we need to create them first
    if (error.message.includes('does not exist')) {
      console.log('⚠️  Database chưa có tables.');
      console.log('📝 Chạy lệnh sau để tạo tables:');
      console.log(`   DATABASE_URL="file:${DB_PATH}" npx prisma db push\n`);
    } else {
      console.error('❌ Lỗi:', error.message);
    }
    await prisma.$disconnect();
    process.exit(1);
  }
}

setup();
