# Paper Prototype - Sổ Quỹ Việt

**Mục tiêu:** Test concept Kakeibo TRƯỚC khi code
**Thời gian testing:** 40 phút/user (15 phút x 2 screens + 10 phút debrief)

---

## 🎯 TESTING OBJECTIVES

### Concept Validation
- Users hiểu 4 phân loại CẦN-MUỐN-NÊN-CÓ THỈ không?
- Phân loại có phù hợp với mental model không?

### Flow Validation
- Ghi chép expense có tự nhiên không?
- Có friction points nào không?

### Value Validation
- Daily summary có hữu ích không?
- Insight có actionable không?

---

## 📱 SCREEN 1: QUICK CAPTURE

### Layout (Text-based Mockup)

```
┌─────────────────────────────────────┐
│     SỔ QUỸ VIỆT          [≡] [?]   │
├─────────────────────────────────────┤
│                                     │
│  Ghi chép chi tiêu                  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Số tiền                     │   │
│  │ 50,000 đ                    │   │
│  └─────────────────────────────┘   │
│                                     │
│  Loại chi tiêu là gì?              │
│                                     │
│  ┌─────────┐  ┌─────────┐          │
│  │  CẦN   │  │  MUỐN   │          │
│  │  🟢    │  │  🟡    │          │
│  └─────────┘  └─────────┘          │
│                                     │
│  ┌─────────┐  ┌─────────┐          │
│  │  NÊN   │  │ CÓ THỂ  │          │
│  │  🟠    │  │  🔵    │          │
│  └─────────┘  └─────────┘          │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Mô tả (không bắt buộc)     │   │
│  │ Cafe buổi sáng              │   │
│  └─────────────────────────────┘   │
│                                     │
│         [  LƯU NGAY  ]             │
│                                     │
└─────────────────────────────────────┘
```

### Component Details

#### Header
- **Left:** "SỔ QUỸ VIỆT" logo/text
- **Right:** Menu button [≡] + Help button [?]

#### Số tiền Input
- Large text input
- Currency format tự động (50,000 đ)
- Placeholder: "0"
- Keypad number-only khi tap

#### 4 Phân Kakeibo (Grid 2x2)

| Button | Color | Label | Description |
|--------|-------|-------|-------------|
| CẦN | 🟢 Green | Survival | Ăn, nhà, đi lại, thuốc |
| MUỐN | 🟡 Yellow | Desire | Cafe, shopping, giải trí |
| NÊN | 🟠 Orange | Growth | Học, sách, quà tặng |
| CÓ THỂ | 🔵 Blue | Unexpected | Hỏng hóc, cơ hội, bất ngờ |

**Interaction:**
- Tap để select (highlight border)
- Only ONE can be selected
- Selected = thicker border + slight scale up

#### Mô tả Input (Optional)
- Text input
- Placeholder: "Ví dụ: Cafe buổi sáng"
- Có thể skip

#### Action Button
- **[LƯU NGAY]** - Primary CTA
- Active only khi: số tiền > 0 AND loại đã chọn
- On tap: Success message "Đã lưu!" + Clear form

---

## 📱 SCREEN 2: DAILY SUMMARY

### Layout (Text-based Mockup)

```
┌─────────────────────────────────────┐
│     SỔ QUỲ VIỆT          [≡] [≡]   │
├─────────────────────────────────────┤
│                                     │
│  Hôm nay, 20 Tháng 1                │
│                                     │
│  Tổng: 250,000 đ                    │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🟢 CẦN     100,000 đ (40%) │   │
│  │  Ăn trưa, xăng, gửi xe      │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🟡 MUỐN     80,000 đ (32%) │   │
│  │  Cafe, trà sữa             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🟠 NÊN      50,000 đ (20%) │   │
│  │  Sách "Psychology of Money" │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🔵 CÓ THỀ   20,000 đ (8%)  │   │
│  │  Ốp xe xe máy bị nổ        │   │
│  └─────────────────────────────┘   │
│                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                     │
│  💡 GÓC NHÌN HÔM NAY               │
│                                     │
│  Cafe chiếm 32% hôm nay (80k)      │
│  → Tháng này: ~1.6 triệu (nếu đều) │
│                                     │
│  Nếu giảm 1 ly cafe/ngày:          │
│  → Tiết kiệm 400k/tháng            │
│  → 1 năm: 4.8 triệu                │
│                                     │
│  [ THÊM GHI CHÉP ]                 │
│                                     │
└─────────────────────────────────────┘
```

### Component Details

#### Header
- **Center:** "Hôm nay, 20 Tháng 1"
- **Right:** Menu [≡] + Filter [≡]

#### Total Summary
- **Large:** "Tổng: 250,000 đ"
- Below: 4 color breakdown bars (horizontal stacked bar)

#### 4 Color Cards (Collapsible)

**Card Structure:**
```
┌─────────────────────────────┐
│ 🟢 CẦN    100,000 đ (40%)   │
│ Ăn trưa, xăng, gửi xe       │
└─────────────────────────────┘
```

**Details when expanded:**
- List individual expenses
- Time of day
- Amount each

**Interaction:**
- Tap to expand/collapse
- Swipe left to delete (with confirmation)

#### Góc Nhìn (Insight Section)

**Logic:**
1. Identify largest category
2. Project monthly if this continues
3. Show "what if" scenario

**Templates:**
- *Cafe chiếm X% (Yk) → Tháng này: ~Z triệu → Nếu giảm 1 ly/ngày: Tiết kiệm Wk/tháng*
- *Shopping chiếm X% (Yk) → Tháng này: ~Z triệu → Nếu giảm 50%: Tiết kiệm Wk/tháng*
- *CẦN chiếm X% → Dưới 50%: Tốt! Vẫn còn room cho MUỐN/NÊN*

**Tone:**
- Non-judgmental
- Data-driven
- Actionable

#### Action Button
- **[THÊM GHI CHÉP]** - Secondary CTA
- Navigate back to Screen 1

---

## 🎨 DESIGN SPECIFICATIONS

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Green (CẦN) | `#10B981` | Survival expenses |
| Yellow (MUỐN) | `#F59E0B` | Desire expenses |
| Orange (NÊN) | `#F97316` | Growth expenses |
| Blue (CÓ THỀ) | `#3B82F6` | Unexpected expenses |
| Background | `#FAFAFA` | Page background |
| Card | `#FFFFFF` | Card backgrounds |
| Text Primary | `#1F2937` | Main text |
| Text Secondary | `#6B7280` | Secondary text |

### Typography

| Element | Size | Weight |
|---------|------|--------|
| Header | 20px | 600 |
| Section Title | 16px | 600 |
| Body | 14px | 400 |
| Caption | 12px | 400 |
| Number (Large) | 32px | 600 |

### Spacing

- **Padding:** 16px (screen edges)
- **Gap:** 12px (between cards)
- **Corner Radius:** 8px (cards), 4px (buttons)

---

## 📋 USER SCENARIOS

### Scenario 1: Morning Coffee
```
User vừa mua cafe 50k
→ Mở app
→ Input: 50,000
→ Tap: 🟡 MUỐN
→ Input: "Cafe sáng"
→ Tap: LƯU NGAY
→ Success: "Đã lưu!"
```

### Scenario 2: Lunch Break
```
User ăn trưa 70k
→ Mở app
→ Input: 70,000
→ Tap: 🟢 CẦN
→ Input: "Cơm trưa"
→ Tap: LƯU NGAY
→ Success: "Đã lưu!"
```

### Scenario 3: Evening Reflection
```
User về nhà, muốn xem hôm nay tiêu gì
→ Mở app
→ Xem Daily Summary
→ Thấy: Cafe chiếm 32%
→ Insight: "Nếu giảm 1 ly/ngày = 400k/tháng"
→ Decides: Mai sẽ hạn chế cafe
```

### Scenario 4: Unexpected Expense
```
User bị xịt lốp xe, thay 200k
→ Mở app
→ Input: 200,000
→ Tap: 🔵 CÓ THỂ
→ Input: "Thay lốp xe"
→ Tap: LƯU NGAY
→ Success: "Đã lưu!"
→ Summary thấy: CÓ THỀ chiếm 40% hôm nay
→ Understand: Hôm nay bất thường, okay
```

---

## 🧪 TESTING QUESTIONS PER SCREEN

### Screen 1: Quick Capture

**Initial Reaction (5 phút):**
1. "Bạn thấy màn hình này nói gì?"
2. "Bạn sẽ làm gì đầu tiên?"

**Task Completion (5 phút):**
3. "Hãy thử ghi chép: Cafe 50k" → Observe flow
4. "Tại sao bạn chọn loại đó?"
5. "Có gì BÓC ỨC không?"

**Follow-up (5 phút):**
6. "Bạn sẽ chọn loại nào cho: Ăn trưa 70k?"
7. "Bạn sẽ chọn loại nào cho: Mua sách 200k?"
8. "Bạn sẽ chọn loại nào cho: Ốp xe?"
9. "Có gì bạn muốn THAY ĐỔI không?"

### Screen 2: Daily Summary

**Initial Reaction (5 phút):**
1. "Bạn thấy màn hình này nói gì?"
2. "Điều đầu tiên bạn NHÌN VÀO là gì?"
3. "Bạn có THẤU HIỂU gì không?"

**Interpretation (5 phút):**
4. "Cafe chiếm 32% hôm nay - bạn nghĩ gì?"
5. "Góc Nhìn có HỮU ÍCH không? Tại sao?"
6. "Bạn sẽ làm gì VỚI thông tin này?"

**Follow-up (5 phút):**
7. "Có gì bạn muốn THÊM không?"
8. "Có gì bạn muốn BỎ không?"
9. "Điều bạn THÍCH nhất?"
10. "Điều bạn GHÉT nhất?"

---

## 📊 SUCCESS CRITERIA

### Quantitative
- [ ] 5 users tested
- [ ] >= 3 users say "I would use this"
- [ ] >= 80% understand 4 categories correctly
- [ ] <= 30 seconds to complete one entry

### Qualitative
- [ ] Identify top 3 friction points
- [ ] Clear understanding of user mental model
- [ ] Insights for refining 4 categories

---

## 📝 NOTES FOR TESTER

**DO:**
- Listen more than speak
- Ask "Tại sao bạn nghĩ vậy?"
- Take detailed notes
- Record session (if user allows)

**DON'T:**
- Don't defend the design
- Don't explain how it works (let them figure it out)
- Don't lead them to "right" answer

**IF USER ASKS "What should I choose?":**
→ "Tùy bạn, bạn nghĩ nó thuộc loại nào?"
→ "Không có đáp án đúng/sai, tôi muốn hiểu cách bạn nghĩ"

---

## 🔗 NEXT STEPS AFTER TESTING

1. **Analyze feedback** - Group by theme
2. **Identify patterns** - What works/doesn't
3. **Refine prototype** - Iterate based on top 3 issues
4. **Re-test if needed** - Validate changes

**Output:** `docs/prototype-testing-results.md`

---

## 📐 ALTERNATIVE LAYOUTS (IF NEEDED)

### Layout A: Vertical Stack (Single Column)
- 4 buttons vertically stacked instead of 2x2 grid
- For users who prefer scrolling

### Layout B: Horizontal Swipe
- 4 categories as swipeable cards
- For gesture-heavy users

### Layout C: Quick Select
- Most common categories as presets
- "Cafe" → Auto-select MUỐN
- "Ăn trưa" → Auto-select CẦN

*(Only explore if testing shows major issues with primary layout)*
