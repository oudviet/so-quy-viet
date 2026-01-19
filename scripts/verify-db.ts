import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany({
    orderBy: { displayOrder: 'asc' }
  });

  console.log('📊 KAKEIBO CATEGORIES:');
  console.log('');

  const byType = categories.reduce((acc, cat) => {
    if (!acc[cat.kakeiboType]) acc[cat.kakeiboType] = [];
    acc[cat.kakeiboType].push(cat);
    return acc;
  }, {} as Record<string, typeof categories>);

  for (const [type, cats] of Object.entries(byType)) {
    const emoji = type === 'NEED' ? '🔴' : type === 'WANT' ? '🟡' : type === 'SHOULD' ? '🟢' : '🔵';
    console.log(`${emoji} ${type}:`);
    for (const cat of cats) {
      console.log(`   ${cat.icon} ${cat.name}`);
    }
    console.log('');
  }

  console.log(`✅ Total: ${categories.length} categories`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
