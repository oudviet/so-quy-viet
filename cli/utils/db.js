/**
 * Database Utilities for CLI
 * Uses Prisma Client for SQLite operations
 */

import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

// Database path
const DB_DIR = path.join(process.env.HOME || process.env.USERPROFILE, '.so-quyi');
const DB_PATH = path.join(DB_DIR, 'data.db');

// Ensure DB directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Prisma client with custom database path
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${DB_PATH}`,
    },
  },
});

// Kakeibo types enum
export const KakeiboType = {
  NEED: 'NEED',     // CẦN - Survival (food, housing, transport)
  WANT: 'WANT',     // MUỐN - Desire (coffee, shopping, entertainment)
  SHOULD: 'SHOULD', // NÊN - Growth (books, courses, gifts)
  CAN: 'CAN',       // CÓ THỂ - Unexpected (repairs, opportunities)
};

// Vietnamese labels
export const KakeiboLabels = {
  [KakeiboType.NEED]: 'CẦN',
  [KakeiboType.WANT]: 'MUỐN',
  [KakeiboType.SHOULD]: 'NÊN',
  [KakeiboType.CAN]: 'CÓ THỂ',
};

// Colors for terminal
export const KakeiboColors = {
  [KakeiboType.NEED]: '\x1b[32m',    // Green
  [KakeiboType.WANT]: '\x1b[33m',    // Yellow
  [KakeiboType.SHOULD]: '\x1b[31m',  // Orange/Red
  [KakeiboType.CAN]: '\x1b[34m',     // Blue
};

export const ResetColor = '\x1b[0m';

/**
 * Initialize database with default categories
 */
export async function initializeDatabase() {
  try {
    // Run Prisma migrations if needed
    // Note: For production, run: npx prisma migrate deploy

    // Check if we need to seed categories
    const existingCategories = await prisma.category.count();

    if (existingCategories === 0) {
      console.log('Đang tạo phân loại Kakeibo mặc định...');

      // Create default system categories
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

          // CAN (CÓ THỂ) - Unexpected expenses
          { kakeiboType: KakeiboType.CAN, name: 'Sửa chữa', nameEn: 'Repairs', icon: '🔧', color: '#3B82F6', isSystem: true, displayOrder: 30 },
          { kakeiboType: KakeiboType.CAN, name: 'Hỏng hóc', nameEn: 'Breakage', icon: '💔', color: '#3B82F6', isSystem: true, displayOrder: 31 },
          { kakeiboType: KakeiboType.CAN, name: 'Cơ hội', nameEn: 'Opportunity', icon: '⭐', color: '#3B82F6', isSystem: true, displayOrder: 32 },
          { kakeiboType: KakeiboType.CAN, name: 'Khác', nameEn: 'Other', icon: '📦', color: '#3B82F6', isSystem: true, displayOrder: 33 },
        ],
      });

      console.log('✅ Đã tạo phân loại Kakeibo mặc định!');
    }

    return true;
  } catch (error) {
    console.error('❌ Lỗi khởi tạo database:', error.message);
    throw error;
  }
}

/**
 * Get or create default user
 */
export async function getOrCreateUser(email = 'user@soquyi.local') {
  try {
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          passwordHash: 'local', // CLI user, no password
          fullName: 'Người dùng Sổ Quỹ',
          currency: 'VND',
          timezone: 'Asia/Ho_Chi_Minh',
          language: 'vi',
        },
      });
    }

    return user;
  } catch (error) {
    console.error('❌ Lỗi tạo user:', error.message);
    throw error;
  }
}

/**
 * Add expense
 */
export async function addExpense(userId, amount, kakeiboType, title, notes = '') {
  try {
    // Find category by kakeibo type (use first match)
    const category = await prisma.category.findFirst({
      where: {
        kakeiboType,
        userId: null, // System category
      },
    });

    if (!category) {
      throw new Error(`Không tìm thấy phân loại ${kakeiboType}`);
    }

    const expense = await prisma.expense.create({
      data: {
        userId,
        categoryId: category.id,
        amount: parseFloat(amount),
        title,
        notes,
        occurredAt: new Date(),
      },
    });

    return expense;
  } catch (error) {
    console.error('❌ Lỗi thêm expense:', error.message);
    throw error;
  }
}

/**
 * Get today's expenses
 */
export async function getTodaysExpenses(userId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const expenses = await prisma.expense.findMany({
    where: {
      userId,
      occurredAt: {
        gte: today,
        lt: tomorrow,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      occurredAt: 'desc',
    },
  });

  return expenses;
}

/**
 * Get expenses grouped by Kakeibo type
 */
export async function getExpensesByKakeiboType(userId, startDate, endDate = null) {
  const where = {
    userId,
    occurredAt: {
      gte: startDate,
    },
  };

  if (endDate) {
    where.occurredAt.lt = endDate;
  }

  const expenses = await prisma.expense.findMany({
    where,
    include: {
      category: true,
    },
  });

  // Group by kakeibo type
  const grouped = {
    [KakeiboType.NEED]: { expenses: [], total: 0 },
    [KakeiboType.WANT]: { expenses: [], total: 0 },
    [KakeiboType.SHOULD]: { expenses: [], total: 0 },
    [KakeiboType.CAN]: { expenses: [], total: 0 },
  };

  for (const expense of expenses) {
    const type = expense.category.kakeiboType;
    grouped[type].expenses.push(expense);
    grouped[type].total += parseFloat(expense.amount);
  }

  return grouped;
}

/**
 * Delete expense
 */
export async function deleteExpense(id, userId) {
  try {
    // Verify user owns this expense
    const expense = await prisma.expense.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!expense) {
      throw new Error('Không tìm thấy chi tiêu này');
    }

    await prisma.expense.delete({
      where: { id },
    });

    return true;
  } catch (error) {
    console.error('❌ Lỗi xóa expense:', error.message);
    throw error;
  }
}

/**
 * Update expense
 */
export async function updateExpense(id, userId, updates) {
  try {
    // Verify user owns this expense
    const expense = await prisma.expense.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!expense) {
      throw new Error('Không tìm thấy chi tiêu này');
    }

    // If updating kakeibo type, change category
    if (updates.kakeiboType) {
      const category = await prisma.category.findFirst({
        where: {
          kakeiboType: updates.kakeiboType,
          userId: null,
        },
      });

      if (!category) {
        throw new Error(`Không tìm thấy phân loại ${updates.kakeiboType}`);
      }

      updates.categoryId = category.id;
      delete updates.kakeiboType;
    }

    const updated = await prisma.expense.update({
      where: { id },
      data: updates,
    });

    return updated;
  } catch (error) {
    console.error('❌ Lỗi cập nhật expense:', error.message);
    throw error;
  }
}

/**
 * Get expenses for a date range
 */
export async function getExpensesByDateRange(userId, startDate, endDate) {
  const expenses = await prisma.expense.findMany({
    where: {
      userId,
      occurredAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      occurredAt: 'desc',
    },
  });

  return expenses;
}

/**
 * Disconnect database
 */
export async function disconnectDatabase() {
  await prisma.$disconnect();
}

export { prisma };
