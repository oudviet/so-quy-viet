# DATABASE SCHEMA - SỔ QUỸ VIỆT

## 📋 OVERVIEW

Database cho ứng dụng quản lý chi tiêu theo phương pháp Kakeibo Việt hóa.

**Tech Stack Gợi ý:**
- **Backend:** Node.js + Prisma ORM
- **Database:** PostgreSQL (production) / SQLite (dev)
- **Alternative:** Supabase (open source Firebase)

---

## 🗂️ ENTITY RELATIONSHIP DIAGRAM (ERD)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   users     │────<│  expenses   │>────│ categories  │
└─────────────┘     └─────────────┘     └─────────────┘
       │
       │
       V
┌─────────────┐     ┌─────────────┐
│  budgets    │────<│ budget_items│
└─────────────┘     └─────────────┘
```

---

## 📊 TABLES

### 1. users - Người dùng

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    avatar_url VARCHAR(500),
    currency VARCHAR(3) DEFAULT 'VND',
    timezone VARCHAR(50) DEFAULT 'Asia/Ho_Chi_Minh',
    language VARCHAR(10) DEFAULT 'vi',

    -- Settings
    monthly_budget DECIMAL(15,2) DEFAULT 0,
    budget_alert_enabled BOOLEAN DEFAULT true,
    budget_alert_threshold DECIMAL(5,2) DEFAULT 80.0,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP,

    -- Soft delete
    deleted_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```

**Field Mô tả:**
- `id`: UUID unique cho user
- `email`: Email đăng nhập (unique)
- `password_hash`: Hash password (bcrypt/argon2)
- `full_name`: Tên đầy đủ
- `currency`: Loại tiền (VND, USD, EUR...)
- `timezone`: Múi giờ (Asia/Ho_Chi_Minh)
- `monthly_budget`: Ngân sách hàng tháng
- `budget_alert_threshold`: % ngân sách để alert (mặc định 80%)

---

### 2. categories - Phân loại chi tiêu

```sql
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,  -- NULL = system default

    -- Kakeibo category type
    kakeibo_type VARCHAR(20) NOT NULL CHECK (kakeibo_type IN ('NEED', 'WANT', 'SHOULD', 'CAN')),

    -- Category info
    name VARCHAR(100) NOT NULL,
    name_en VARCHAR(100),
    icon VARCHAR(50),
    color VARCHAR(7) DEFAULT '#E53935',

    -- Ordering
    display_order INTEGER DEFAULT 0,

    -- System flag (cannot be deleted if true)
    is_system BOOLEAN DEFAULT false,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Soft delete
    deleted_at TIMESTAMP
);

CREATE INDEX idx_categories_user_id ON categories(user_id);
CREATE INDEX idx_categories_kakeibo_type ON categories(kakeibo_type);
```

**Kakeibo Types Mapping:**
| kakeibo_type | Việt Nam | Color (mặc định) |
|--------------|----------|------------------|
| NEED | CẦN | #E53935 (Đỏ) |
| WANT | MUỐN | #FB8C00 (Cam) |
| SHOULD | NÊN | #43A047 (Xanh lá) |
| CAN | CÓ THỂ | #1E88E5 (Xanh dương) |

**System Default Categories:**
```sql
-- CẦN (NEED)
INSERT INTO categories (id, user_id, kakeibo_type, name, icon, color, is_system) VALUES
    ('cat-001', NULL, 'NEED', 'Ăn uống', '🍚', '#E53935', true),
    ('cat-002', NULL, 'NEED', 'Điện nước', '⚡', '#E53935', true),
    ('cat-003', NULL, 'NEED', 'Nhà ở', '🏠', '#E53935', true),
    ('cat-004', NULL, 'NEED', 'Di chuyển', '🚗', '#E53935', true),
    ('cat-005', NULL, 'NEED', 'Y tế', '💊', '#E53935', true);

-- MUỐN (WANT)
INSERT INTO categories (id, user_id, kakeibo_type, name, icon, color, is_system) VALUES
    ('cat-101', NULL, 'WANT', 'Cafe trà sữa', '🧋', '#FB8C00', true),
    ('cat-102', NULL, 'WANT', 'Quần áo', '👕', '#FB8C00', true),
    ('cat-103', NULL, 'WANT', 'Mỹ phẩm', '💄', '#FB8C00', true),
    ('cat-104', NULL, 'WANT', 'Giải trí', '🎬', '#FB8C00', true),
    ('cat-105', NULL, 'WANT', 'Điện tử', '📱', '#FB8C00', true),
    ('cat-106', NULL, 'WANT', 'Du lịch', '✈️', '#FB8C00', true);

-- NÊN (SHOULD)
INSERT INTO categories (id, user_id, kakeibo_type, name, icon, color, is_system) VALUES
    ('cat-201', NULL, 'SHOULD', 'Học tập', '📚', '#43A047', true),
    ('cat-202', NULL, 'SHOULD', 'Sức khỏe', '💪', '#43A047', true),
    ('cat-203', NULL, 'SHOULD', 'Quà tặng', '🎁', '#43A047', true),
    ('cat-204', NULL, 'SHOULD', 'Gia đình', '👨‍👩‍👧‍👦', '#43A047', true),
    ('cat-205', NULL, 'SHOULD', 'Từ thiện', '❤️', '#43A047', true);

-- CÓ THỂ (CAN)
INSERT INTO categories (id, user_id, kakeibo_type, name, icon, color, is_system) VALUES
    ('cat-301', NULL, 'CAN', 'Mua sắm bốc đồng', '🛒', '#1E88E5', true),
    ('cat-302', NULL, 'CAN', 'Đồ ăn lãng phí', '🗑️', '#1E88E5', true),
    ('cat-303', NULL, 'CAN', 'Thuê bao vô dụng', '📱', '#1E88E5', true),
    ('cat-304', NULL, 'CAN', 'Phí quá hạn', '⏰', '#1E88E5', true);
```

---

### 3. expenses - Chi tiêu

```sql
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,

    -- Amount
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'VND',

    -- Description
    title VARCHAR(200) NOT NULL,
    notes TEXT,
    tags TEXT[],  -- Array of tags: '{tet, liarri,}'

    -- Location (optional)
    location_name VARCHAR(100),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),

    -- Evidence
    receipt_url VARCHAR(500),

    -- Timestamps
    occurred_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- When expense happened
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,              -- When recorded
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Soft delete
    deleted_at TIMESTAMP
);

CREATE INDEX idx_expenses_user_id ON expenses(user_id);
CREATE INDEX idx_expenses_category_id ON expenses(category_id);
CREATE INDEX idx_expenses_occurred_at ON expenses(occurred_at DESC);
CREATE INDEX idx_expenses_user_occurred ON expenses(user_id, occurred_at DESC);
CREATE INDEX idx_expenses_tags ON expenses USING GIN(tags);
```

**Field Mô tả:**
- `occurred_at`: Thời gian chi tiêu thật (khác với created_at)
- `tags`: Array tags cho filtering (ví dụ: `{tet, liarri, quan-he}`)
- `receipt_url`: Link ảnh hóa đơn (lưu trữ trên S3/Cloudinary)

---

### 4. budgets - Ngân sách

```sql
CREATE TABLE budgets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Budget period
    name VARCHAR(100) NOT NULL,
    period_type VARCHAR(20) NOT NULL CHECK (period_type IN ('WEEKLY', 'MONTHLY', 'TET', 'CUSTOM')),
    start_date DATE NOT NULL,
    end_date DATE,

    -- Budget amounts by Kakeibo type
    need_amount DECIMAL(15,2) DEFAULT 0,
    want_amount DECIMAL(15,2) DEFAULT 0,
    should_amount DECIMAL(15,2) DEFAULT 0,
    can_amount DECIMAL(15,2) DEFAULT 0,

    -- Status
    is_active BOOLEAN DEFAULT true,
    is_completed BOOLEAN DEFAULT false,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Soft delete
    deleted_at TIMESTAMP
);

CREATE INDEX idx_budgets_user_id ON budgets(user_id);
CREATE INDEX idx_budgets_period ON budgets(start_date, end_date);
CREATE INDEX idx_budgets_active ON budgets(user_id, is_active);
```

**Example Budget Data:**
```sql
-- Monthly budget for user with 15M income
INSERT INTO budgets (user_id, name, period_type, start_date,
    need_amount, want_amount, should_amount, can_amount) VALUES
    ('user-123', 'Tháng 1/2025', 'MONTHLY', '2025-01-01',
     6000000, 3000000, 4500000, 1500000);

-- Tet budget
INSERT INTO budgets (user_id, name, period_type, start_date, end_date,
    need_amount, want_amount, should_amount, can_amount) VALUES
    ('user-123', 'Tết 2025', 'TET', '2025-01-15', '2025-02-15',
     9000000, 4500000, 6750000, 2250000);
```

---

### 5. budget_items - Chi tiết ngân sách (optional)

```sql
CREATE TABLE budget_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    budget_id UUID NOT NULL REFERENCES budgets(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,

    name VARCHAR(100) NOT NULL,
    planned_amount DECIMAL(15,2) NOT NULL,
    actual_amount DECIMAL(15,2) DEFAULT 0,

    display_order INTEGER DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP
);

CREATE INDEX idx_budget_items_budget_id ON budget_items(budget_id);
```

**Use case:** breakdown ngân sách chi tiết cho từng category

---

## 🔄 VIEWS & FUNCTIONS

### View: expense_summary - Tổng hợp chi tiêu

```sql
CREATE VIEW expense_summary AS
SELECT
    user_id,
    category_id,
    c.kakeibo_type,
    DATE_TRUNC('month', occurred_at) AS month,
    SUM(amount) AS total_amount,
    COUNT(*) AS transaction_count
FROM expenses e
JOIN categories c ON e.category_id = c.id
WHERE e.deleted_at IS NULL
GROUP BY user_id, category_id, c.kakeibo_type, DATE_TRUNC('month', occurred_at);
```

### Function: get_kakeibo_summary - Tổng hợp theo 4 nhóm

```sql
CREATE OR REPLACE FUNCTION get_kakeibo_summary(
    p_user_id UUID,
    p_start_date DATE,
    p_end_date DATE
) RETURNS TABLE (
    kakeibo_type VARCHAR(20),
    total_amount DECIMAL(15,2),
    transaction_count BIGINT,
    budget_amount DECIMAL(15,2),
    percentage DECIMAL(5,2),
    remaining DECIMAL(15,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.kakeibo_type,
        COALESCE(SUM(e.amount), 0) AS total_amount,
        COALESCE(COUNT(e.id), 0) AS transaction_count,
        COALESCE(b.amount, 0) AS budget_amount,
        CASE
            WHEN b.amount > 0 THEN ROUND((COALESCE(SUM(e.amount), 0) / b.amount * 100), 2)
            ELSE 0
        END AS percentage,
        COALESCE(b.amount, 0) - COALESCE(SUM(e.amount), 0) AS remaining
    FROM categories c
    LEFT JOIN expenses e ON c.id = e.category_id
        AND e.user_id = p_user_id
        AND e.occurred_at::DATE BETWEEN p_start_date AND p_end_date
        AND e.deleted_at IS NULL
    LEFT JOIN LATERAL (
        SELECT
            CASE c.kakeibo_type
                WHEN 'NEED' THEN b.need_amount
                WHEN 'WANT' THEN b.want_amount
                WHEN 'SHOULD' THEN b.should_amount
                WHEN 'CAN' THEN b.can_amount
            END AS amount
        FROM budgets b
        WHERE b.user_id = p_user_id
            AND b.is_active = true
            AND p_start_date BETWEEN b.start_date AND COALESCE(b.end_date, b.start_date + INTERVAL '1 month')
        LIMIT 1
    ) b ON true
    WHERE c.user_id IS NULL  -- System categories only
    GROUP BY c.kakeibo_type, b.amount
    ORDER BY
        CASE c.kakeibo_type
            WHEN 'NEED' THEN 1
            WHEN 'WANT' THEN 2
            WHEN 'SHOULD' THEN 3
            WHEN 'CAN' THEN 4
        END;
END;
$$ LANGUAGE plpgsql;
```

---

## 📱 PRISMA SCHEMA (Alternative)

Nếu dùng Prisma ORM với Node.js:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum KakeiboType {
  NEED     // CẦN
  WANT     // MUỐN
  SHOULD   // NÊN
  CAN      // CÓ THỂ
}

enum PeriodType {
  WEEKLY
  MONTHLY
  TET
  CUSTOM
}

model User {
  id           String    @id @default(uuid())
  email        String    @unique
  passwordHash String    @map("password_hash")
  fullName     String?   @map("full_name")
  phone        String?
  avatarUrl    String?   @map("avatar_url")
  currency     String    @default("VND")
  timezone     String    @default("Asia/Ho_Chi_Minh")
  language     String    @default("vi")

  monthlyBudget        Decimal   @default(0) @map("monthly_budget")
  budgetAlertEnabled   Boolean   @default(true) @map("budget_alert_enabled")
  budgetAlertThreshold Decimal   @default(80) @map("budget_alert_threshold")

  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  lastLoginAt DateTime? @map("last_login_at")
  deletedAt   DateTime? @map("deleted_at")

  expenses   Expense[]
  budgets    Budget[]
  categories Category[]

  @@map("users")
}

model Category {
  id         String     @id @default(uuid())
  userId     String?    @map("user_id")
  user       User?      @relation(fields: [userId], references: [id], onDelete: Cascade)

  kakeiboType KakeiboType @map("kakeibo_type")
  name       String
  nameEn     String?     @map("name_en")
  icon       String?
  color      String      @default("#E53935")
  isSystem   Boolean     @default(false) @map("is_system")

  displayOrder Int       @default(0) @map("display_order")

  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  deletedAt DateTime? @map("deleted_at")

  expenses Expense[]

  @@index([userId])
  @@index([kakeiboType])
  @@map("categories")
}

model Expense {
  id          String   @id @default(uuid())
  userId      String   @map("user_id")
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  categoryId  String   @map("category_id")
  category    Category @relation(fields: [categoryId], references: [id], onDelete: Restrict)

  amount      Decimal
  currency    String   @default("VND")
  title       String
  notes       String?
  tags        String[]

  locationName String?  @map("location_name")
  latitude     Decimal?
  longitude    Decimal?

  receiptUrl   String?  @map("receipt_url")

  occurredAt  DateTime @default(now()) @map("occurred_at")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  deletedAt   DateTime? @map("deleted_at")

  @@index([userId])
  @@index([categoryId])
  @@index([occurred_at(sort: Desc)])
  @@index([userId, occurred_at(sort: Desc)])
  @@map("expenses")
}

model Budget {
  id          String     @id @default(uuid())
  userId      String     @map("user_id")
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)

  name        String
  periodType  PeriodType @map("period_type")
  startDate   DateTime   @map("start_date")
  endDate     DateTime?  @map("end_date")

  needAmount   Decimal @default(0) @map("need_amount")
  wantAmount   Decimal @default(0) @map("want_amount")
  shouldAmount Decimal @default(0) @map("should_amount")
  canAmount    Decimal @default(0) @map("can_amount")

  isActive    Boolean @default(true) @map("is_active")
  isCompleted Boolean @default(false) @map("is_completed")

  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  deletedAt DateTime? @map("deleted_at")

  items BudgetItem[]

  @@index([userId])
  @@index([startDate, endDate])
  @@index([userId, isActive])
  @@map("budgets")
}

model BudgetItem {
  id             String  @id @default(uuid())
  budgetId       String  @map("budget_id")
  budget         Budget  @relation(fields: [budgetId], references: [id], onDelete: Cascade)

  categoryId     String? @map("category_id")
  name           String
  plannedAmount  Decimal @map("planned_amount")
  actualAmount   Decimal @default(0) @map("actual_amount")

  displayOrder   Int     @default(0) @map("display_order")

  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  deletedAt DateTime? @map("deleted_at")

  @@index([budgetId])
  @@map("budget_items")
}
```

---

## 🚀 MIGRATION EXAMPLES

### Create Database & Run Migrations

```bash
# Using Prisma
npx prisma migrate dev --name init
npx prisma migrate deploy

# Or using raw SQL
psql -U postgres -d so_quy_viet -f schema.sql
```

### Seed Initial Data

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create default categories
  const categories = [
    // CẦN
    { kakeiboType: 'NEED', name: 'Ăn uống', icon: '🍚', color: '#E53935' },
    { kakeiboType: 'NEED', name: 'Điện nước', icon: '⚡', color: '#E53935' },
    { kakeiboType: 'NEED', name: 'Nhà ở', icon: '🏠', color: '#E53935' },
    { kakeiboType: 'NEED', name: 'Di chuyển', icon: '🚗', color: '#E53935' },

    // MUỐN
    { kakeiboType: 'WANT', name: 'Cafe trà sữa', icon: '🧋', color: '#FB8C00' },
    { kakeiboType: 'WANT', name: 'Quần áo', icon: '👕', color: '#FB8C00' },
    { kakeiboType: 'WANT', name: 'Giải trí', icon: '🎬', color: '#FB8C00' },

    // NÊN
    { kakeiboType: 'SHOULD', name: 'Học tập', icon: '📚', color: '#43A047' },
    { kakeiboType: 'SHOULD', name: 'Sức khỏe', icon: '💪', color: '#43A047' },
    { kakeiboType: 'SHOULD', name: 'Quà tặng', icon: '🎁', color: '#43A047' },

    // CÓ THỂ
    { kakeiboType: 'CAN', name: 'Mua sắm bốc đồng', icon: '🛒', color: '#1E88E5' },
  ];

  for (const cat of categories) {
    await prisma.category.create({
      data: { ...cat, isSystem: true },
    });
  }

  console.log('✅ Seeded default categories');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
```

---

## 📊 QUERY EXAMPLES

### Get user's Kakeibo summary for current month

```sql
SELECT * FROM get_kakeibo_summary(
    'user-uuid-here',
    '2025-01-01',
    '2025-01-31'
);
```

**Result:**
| kakeibo_type | total_amount | transaction_count | budget_amount | percentage | remaining |
|--------------|--------------|-------------------|---------------|------------|-----------|
| NEED | 4.500.000 | 25 | 6.000.000 | 75.00 | 1.500.000 |
| WANT | 2.100.000 | 12 | 3.000.000 | 70.00 | 900.000 |
| SHOULD | 1.200.000 | 5 | 4.500.000 | 26.67 | 3.300.000 |
| CAN | 800.000 | 8 | 1.500.000 | 53.33 | 700.000 |

### Get expenses by category

```sql
SELECT
    c.name,
    c.kakeibo_type,
    SUM(e.amount) AS total
FROM expenses e
JOIN categories c ON e.category_id = c.id
WHERE e.user_id = 'user-uuid'
    AND e.occurred_at >= '2025-01-01'
GROUP BY c.name, c.kakeibo_type
ORDER BY c.kakeibo_type, total DESC;
```

---

## ✅ CHECKLIST

- [ ] Choose database: PostgreSQL / SQLite / Supabase
- [ ] Set up Prisma ORM
- [ ] Run initial migration
- [ ] Seed default categories
- [ ] Test queries
- [ ] Set up backups

---

*Tài liệu này sẽ dùng để:
1. Setup database cho development
2. Tạo API endpoints
3. Design data models cho app*
