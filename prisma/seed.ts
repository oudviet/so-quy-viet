// Prisma Seed File for Sổ Quỹ Việt
// Run: npx prisma db seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultCategories = [
  // 🔴 CẦN - NEED
  { kakeiboType: 'NEED', name: 'Ăn uống', nameEn: 'Food', icon: '🍚', color: '#E53935', displayOrder: 1 },
  { kakeiboType: 'NEED', name: 'Điện nước', nameEn: 'Utilities', icon: '⚡', color: '#E53935', displayOrder: 2 },
  { kakeiboType: 'NEED', name: 'Nhà ở', nameEn: 'Housing', icon: '🏠', color: '#E53935', displayOrder: 3 },
  { kakeiboType: 'NEED', name: 'Di chuyển', nameEn: 'Transport', icon: '🚗', color: '#E53935', displayOrder: 4 },
  { kakeiboType: 'NEED', name: 'Y tế', nameEn: 'Healthcare', icon: '💊', color: '#E53935', displayOrder: 5 },

  // 🟡 MUỐN - WANT
  { kakeiboType: 'WANT', name: 'Cafe trà sữa', nameEn: 'Coffee & Tea', icon: '🧋', color: '#FB8C00', displayOrder: 11 },
  { kakeiboType: 'WANT', name: 'Quần áo', nameEn: 'Clothing', icon: '👕', color: '#FB8C00', displayOrder: 12 },
  { kakeiboType: 'WANT', name: 'Mỹ phẩm', nameEn: 'Cosmetics', icon: '💄', color: '#FB8C00', displayOrder: 13 },
  { kakeiboType: 'WANT', name: 'Giải trí', nameEn: 'Entertainment', icon: '🎬', color: '#FB8C00', displayOrder: 14 },
  { kakeiboType: 'WANT', name: 'Điện tử', nameEn: 'Electronics', icon: '📱', color: '#FB8C00', displayOrder: 15 },
  { kakeiboType: 'WANT', name: 'Du lịch', nameEn: 'Travel', icon: '✈️', color: '#FB8C00', displayOrder: 16 },

  // 🟢 NÊN - SHOULD
  { kakeiboType: 'SHOULD', name: 'Học tập', nameEn: 'Education', icon: '📚', color: '#43A047', displayOrder: 21 },
  { kakeiboType: 'SHOULD', name: 'Sức khỏe', nameEn: 'Fitness', icon: '💪', color: '#43A047', displayOrder: 22 },
  { kakeiboType: 'SHOULD', name: 'Quà tặng', nameEn: 'Gifts', icon: '🎁', color: '#43A047', displayOrder: 23 },
  { kakeiboType: 'SHOULD', name: 'Gia đình', nameEn: 'Family', icon: '👨‍👩‍👧‍👦', color: '#43A047', displayOrder: 24 },
  { kakeiboType: 'SHOULD', name: 'Từ thiện', nameEn: 'Charity', icon: '❤️', color: '#43A047', displayOrder: 25 },

  // 🔵 CÓ THỂ - CAN
  { kakeiboType: 'CAN', name: 'Mua sắm bốc đồng', nameEn: 'Impulse Buy', icon: '🛒', color: '#1E88E5', displayOrder: 31 },
  { kakeiboType: 'CAN', name: 'Đồ ăn lãng phí', nameEn: 'Food Waste', icon: '🗑️', color: '#1E88E5', displayOrder: 32 },
  { kakeiboType: 'CAN', name: 'Thuê bao vô dụng', nameEn: 'Unused Subs', icon: '📱', color: '#1E88E5', displayOrder: 33 },
  { kakeiboType: 'CAN', name: 'Phí quá hạn', nameEn: 'Late Fees', icon: '⏰', color: '#1E88E5', displayOrder: 34 },
];

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing system categories
  await prisma.category.deleteMany({
    where: { isSystem: true }
  });

  // Create default categories
  for (const cat of defaultCategories) {
    await prisma.category.create({
      data: {
        ...cat,
        userId: null,  // System categories belong to no user
        isSystem: true
      }
    });
  }

  console.log(`✅ Created ${defaultCategories.length} default categories`);

  // List all categories to verify
  const allCategories = await prisma.category.findMany();
  console.log(`📊 Total categories in database: ${allCategories.length}`);

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
