// Simple backend server for Sổ Quỹ Việt
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// Use a consistent demo user ID
const DEMO_USER_ID = 'demo-user-123';

app.use(cors());
app.use(express.json());

// API Routes

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { userId: null },
      orderBy: { displayOrder: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Create expense
app.post('/api/expenses', async (req, res) => {
  try {
    const { amount, title, categoryId, notes, tags, occurredAt } = req.body;

    console.log('Creating expense:', { amount, title, categoryId, notes });

    // Validate required fields
    if (!amount || !title || !categoryId) {
      return res.status(400).json({ error: 'Missing required fields: amount, title, categoryId' });
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    const expense = await prisma.expense.create({
      data: {
        userId: DEMO_USER_ID,
        amount: parseFloat(amount),
        title,
        categoryId,
        notes,
        tags: tags || null,
        occurredAt: occurredAt ? new Date(occurredAt) : new Date(),
      },
      include: {
        category: true
      }
    });

    console.log('Created expense:', expense);
    res.json(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Failed to create expense', details: error.message });
  }
});

// Get expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    const expenses = await prisma.expense.findMany({
      where: { userId: DEMO_USER_ID },
      include: {
        category: true
      },
      orderBy: { occurredAt: 'desc' },
      take: parseInt(limit as string)
    });

    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Get Kakeibo summary
app.get('/api/summary', async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: DEMO_USER_ID },
      include: { category: true }
    });

    const summary = {
      NEED: { amount: 0, count: 0, color: '#E53935' },
      WANT: { amount: 0, count: 0, color: '#FB8C00' },
      SHOULD: { amount: 0, count: 0, color: '#43A047' },
      CAN: { amount: 0, count: 0, color: '#1E88E5' }
    };

    for (const expense of expenses) {
      const type = expense.category.kakeiboType;
      if (summary[type]) {
        summary[type].amount += parseFloat(expense.amount.toString());
        summary[type].count++;
      }
    }

    res.json(summary);
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

// Debug: List all expenses
app.get('/api/debug/expenses', async (req, res) => {
  try {
    const allExpenses = await prisma.expense.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    res.json({ count: allExpenses.length, expenses: allExpenses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/`);
  console.log(`🔍 Demo User ID: ${DEMO_USER_ID}`);
});
