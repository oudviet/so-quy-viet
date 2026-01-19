import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create demo user
  const user = await prisma.user.upsert({
    where: { id: 'demo-user-123' },
    update: {},
    create: {
      id: 'demo-user-123',
      email: 'demo@soquyviet.com',
      passwordHash: 'demo123',
      fullName: 'Demo User',
      currency: 'VND',
      timezone: 'Asia/Ho_Chi_Minh',
      language: 'vi',
      monthlyBudget: 15000000,
    }
  });

  console.log('✅ Demo user created:', user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
