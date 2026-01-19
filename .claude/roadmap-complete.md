# ROADMAP HOÀN CHỈNH - SỔ QUỸ VIỆT
## Strategic Development Plan 2026

---

## 🎯 VISION

**Sổ Quỹ Việt không phải là "app quản lý tài chính"**

Mà là **"Công cụ tự hiểu về hành vi tiêu tiền của mình"**

Dựa trên phương pháp **Kakeibo** (Nhật Bản, 1904), Việt hóa cho người Việt với:
- 4 phân loại đơn giản: CẦN - MUỐN - NÊN - CÓ THỂ
- Không phán xét ("bạn tiêu quá nhiều")
- Tập trung TẾT (mùa chi tiêu lớn nhất)
- Offline-first, privacy-first

---

## 🎯 TARGET SEGMENTS

### Priority Order (Go-to-market)

```
1. Segment 1: Người đi làm 25-40 tuổi (10-30tr/tháng)
   → Pain: "Không hiểu tiền đi đâu cuối tháng"
   → Solution: Quick capture + Daily summary

2. Segment 2: Gia đình trẻ (con 0-10 tuổi, 20-40tr/tháng)
   → Pain: "Áp lực Tết, shock sau Tết"
   → Solution: Tet budget planner

3. Segment 3: Kinh doanh tự do / freelancer
   → Pain: "Thu nhập không đều, lẫn lộn tiền làm ăn/tiền sinh hoạt"
   → Solution: Multi-account tracking
```

---

## 📋 PHASE 1: MVP (4-6 weeks)

### Objective
Minimum product với maximum value cho 3 segments

### Features

| Feature | Segment | Pain Point | Kakeibo Principle | Metric |
|---------|---------|------------|-------------------|--------|
| **1.1 Quick Capture** | All | "Ghi chép quá lâu" | Dừng lại và suy nghĩ | < 10s per entry |
| **1.2 4-Color Classification** | All | "Không biết phân loại" | 4 nhóm đơn giản | < 5s to classify |
| **1.3 Daily Summary** | Seg1 | "Không biết tiền đi đâu" | Nhận thức hành vi | ≥ 3 views/week |
| **1.4 Tet Budget Planner** | Seg2 | "Shock sau Tết" | Lập kế hoạch BEFORE | Setup 2 weeks before Tet |
| **1.5 Multi-Account** | Seg3 | "Lẫn lộn dòng tiền" | Phân tách trách nhiệm | ≥ 50% use it |
| **1.6 Zero-Knowledge Export** | All | "Privacy concerns" | Dữ liệu của bạn | Export 1x/month |

### Tech Stack
```
Core: Node.js CLI
Storage: Local JSON files (~/.so-quy-viet/)
Backup: Optional iCloud/Dropbox sync
Export: JSON, CSV, PDF (Phase 2)
```

### Success Criteria
```
✅ Time to record expense < 10 seconds (5x banking apps)
✅ Error rate < 5%
✅ Self-test: Founder uses 1 week without major bugs
✅ Alpha test: 5 friends/family use for 1 week
```

### Timeline
```
Week 1-2: CLI Core (init, add, list, summary)
Week 3:   4-Color Classification + learning
Week 4:   Daily/Weekly Summary
Week 5:   Tet Budget Planner
Week 6:   Multi-Account + Export
```

---

## 🔬 PHASE 2: VALIDATION (4 weeks)

### Objective
Validate với REAL USERS trước khi scale

### User Recruitment

```
Total: 30 users (10 per segment)

Segment 1 (25-40 tuổi, văn phòng):
→ Channels: LinkedIn, Facebook groups (freelance, office workers)
→ Message: "Bạn cảm thấy 'không hiểu tiền đi đâu'?"

Segment 2 (Gia đình trẻ):
→ Channels: Facebook parenting groups, Zalo mom communities
→ Message: "Chi cho con không tiếc nhưng cuối tháng lo?"

Segment 3 (Kinh doanh tự do):
→ Channels: Seller communities, freelancer groups
→ Message: "Tháng tốt 30 triệu, tháng tồi 3 triệu?"
```

### Testing Protocol

```
Week 1: Onboarding
├─ Day 1: Setup CLI or Web UI
├─ Day 2-7: Record ≥ 3 expenses/day, view daily summary
└─ Support: 1-1 via Zalo/Telegram

Week 2: Active Testing
├─ Record ≥ 20 expenses total
├─ Classify correctly ≥ 80% (self-reflected)
├─ View weekly summary
└─ Mid-week check-in, end-week survey

Week 3: Stress Test
├─ Test export features
├─ Test insights/recommendations
├─ Report bugs
└─ Deep dive interview (30 min/user)

Week 4: Retention Test
├─ Continue using (no mandatory tasks)
├─ Observe natural usage
└─ Measure DAU, retention, NPS
```

### Metrics

```
Quantitative:
→ Daily entries/user ≥ 3
→ Weekly summary views ≥ 2
→ Retention D7 ≥ 40%
→ Retention D30 ≥ 20%
→ NPS ≥ 40
→ "Better than current app" ≥ 70%

Qualitative:
→ "What do you LIKE most?" → Double down
→ "What do you HATE most?" → Fix or pivot
→ "What FRUSTRATES you?" → Emotional barrier
→ "What SURPRISES you?" → Delight moment
→ "What would you CONCLUDE without it?" → Value prop
```

### Go/No-Go Decision

```
GREEN LIGHT (Proceed to Phase 3):
✅ NPS ≥ 40
✅ Retention D7 ≥ 40%
✅ ≥ 70% say "Better than current app"
✅ ≥ 50% would recommend to friends
✅ ≤ 3 critical bugs

YELLOW LIGHT (Pivot needed):
⚠️  NPS 20-39
⚠️  Retention D7 20-39%
⚠️  4-6 critical bugs
→ Fix top 3 issues, re-test 2 weeks

RED LIGHT (Major pivot):
❌ NPS < 20
❌ Retention D7 < 20%
❌ > 6 critical bugs
→ Stop, deep dive interviews, rethink product
```

---

## 📈 PHASE 3: GROWTH (Ongoing)

### Objective
1000 users trong 3 months sau validation

### Product Improvements

```
Priority 1: Mobile App (React Native)
├─ Quick capture (shake to open)
├─ Voice input: "Năm mươi nghìn cafe"
├─ Barcode/QR scan (hóa đơn)
└─ Timeline: 2-3 months

Priority 2: Advanced Insights
├─ Monthly trends
├─ Category deep dive
├─ Peer comparison (optional)
└─ Goal setting
└─ Timeline: 1-2 months

Priority 3: P2P Sync (Zero-knowledge)
├─ Peer-to-peer via Hypercore Protocol
├─ No central server
├─ End-to-end encryption
└─ Timeline: 2-3 months

Priority 4: Bank Integration (IF REQUESTED)
├─ OAuth to VN/TCB/MBB banks
├─ Auto-import transactions
├─ ML classification
└─ Timeline: 3-4 months
```

### Growth Channels

```
1. Content Marketing
   ├─ Blog: 2 posts/week (Kakeibo, money psychology, Tet tips)
   ├─ YouTube: 1 video/week (Review, tutorials)
   ├─ TikTok: 3 videos/week (POV, trends)
   └─ Podcast: Guest on finance/parenting shows

2. Community Building
   ├─ Facebook Group: "Cộng đồng Sổ Quỹ Việt"
   ├─ Discord Server: Daily discussions
   ├─ Telegram Channel: Updates, tips
   └─ Weekly challenges, monthly webinars

3. Partnerships
   ├─ Finance educators (Hieuthuhai, Coi Duy, etc.)
   ├─ Parenting influencers (mom bloggers)
   ├─ Freelance communities
   └─ Banks/financial institutions (if aligned)

4. Referral Program
   ├─ Referrer: 1 month free per referral
   ├─ Referee: 2 weeks free
   ├─ Cap: 6 months free (prevent abuse)
   └─ One-click share to Facebook/Zalo/Telegram
```

### Pricing Strategy

```
FREE TIER:
→ Unlimited expense entries
→ 4-color Kakeibo classification
→ Daily/Weekly summary
→ Tet budget planner (basic)
→ Export CSV (current month only)

PREMIUM: 49.000đ/tháng (~$2)
→ Everything in Free
→ Monthly/Yearly insights & trends
→ Multi-account tracking
→ Advanced Tet planner
→ Export PDF & custom date ranges
→ Bank sync (if available)
→ Priority support
→ P2P sync across devices

LIFETIME: 1.499.000đ (~$60, one-time)
→ Everything in Premium
→ All future updates
→ Priority feature requests

PRICING PSYCHOLOGY:
→ 49k = Coffee money (affordable)
→ < 0.2% of 20M income
→ "Worth it if saves 500k/month"
→ Anchor: Annual 490k (save 17%), Lifetime 1.499k (save 72%)
```

### Metrics

```
North Star:
→ 1000 active users trong 3 months

Secondary:
→ CAC < 100.000đ/user
→ LTV > 1.000.000đ/user
→ LTV/CAC > 3
→ MRR growth > 20% MoM
→ Free-to-Paid conversion > 5%
```

---

## 🎨 DESIGN PRINCIPLES

### 1. Tâm lý an toàn (Psychological Safety)
```
❌ KHÔNG: "Bạn đã tiêu quá nhiều!"
✅ CÓ: "Tháng này anh/chị mua cafe 30 lần (1.5 triệu)
        Có muốn thử giảm còn 15 lần tháng sau không?"

❌ KHÔNG: Red alerts, overspending warnings
✅ CÓ: Gentle insights, suggestions
```

### 2. Đơn giản cực độ (Radical Simplicity)
```
Learning curve: 5 minutes
No tutorials needed
Self-explanatory UI
```

### 3. Văn hóa Việt (Vietnamese Culture)
```
First-class citizens:
→ Tết (lập ngân sách, tracking, analysis)
→ Quan hệ (đám cưới, đám tang, hiếu hỷ)
→ Mặt mũi (phân loại "buying for face")
```

### 4. Offline-first & Privacy
```
Data sovereignty: User owns data
No forced cloud sync
Zero-knowledge export
Local-first architecture
```

---

## 🚨 RISKS & MITIGATION

### Product Risks

```
Risk 1: CLI not user-friendly for non-tech
→ Mitigation: Web UI (simple, single-page)
→ Mitigation: Video tutorials (2-3 min each)
→ Mitigation: Interactive onboarding

Risk 2: 4 categories not enough
→ Mitigation: Custom sub-categories
→ Mitigation: Free-text tagging
→ Mitigation: Category mapping suggestions

Risk 3: Tet budget too complex
→ Mitigation: Wizard (guided)
→ Mitigation: Pre-built templates
→ Mitigation: One-click setup

Risk 4: Users churn after Tet
→ Mitigation: Year-round value (not Tet-only)
→ Mitigation: Habit formation features
→ Mitigation: Community engagement
```

### Business Risks

```
Risk 1: CAC too high
→ Mitigation: Focus on organic (content, SEO, referral)
→ Mitigation: Partnership marketing (not paid ads)
→ Mitigation: Viral mechanics (referral program)

Risk 2: Low free-to-paid conversion
→ Mitigation: Value demonstration (insights behind paywall)
→ Mitigation: Testimonials, case studies
→ Mitigation: Annual/lifetime pricing (anchor effect)

Risk 3: Competition (Money Lover, banks)
→ Mitigation: Differentiation (Kakeibo, Tet-first, non-judgmental)
→ Mitigation: Niche focus (not generic finance app)
→ Mitigation: Community building (moat)
```

### Technical Risks

```
Risk 1: Local data loss
→ Mitigation: Auto-backup (optional iCloud/Dropbox)
→ Mitigation: Export reminders (weekly)
→ Mitigation: Recovery command

Risk 2: Cross-platform sync issues
→ Mitigation: P2P sync (Phase 3)
→ Mitigation: Manual export/import
→ Mitigation: Clear documentation

Risk 3: Bank API changes
→ Mitigation: Only if users request it
→ Mitigation: Abstract bank integration layer
→ Mitigation: Multiple bank providers (not locked in)
```

---

## 📊 SUCCESS METRICS SUMMARY

```
PHASE 1 (MVP):
→ Time to record < 10 seconds
→ Error rate < 5%
→ Founder uses 1 week
→ 5 friends use 1 week

PHASE 2 (Validation):
→ NPS ≥ 40
→ Retention D7 ≥ 40%
→ Retention D30 ≥ 20%
→ ≥ 70% say "Better than current app"

PHASE 3 (Growth):
→ 1000 users in 3 months
→ CAC < 100k/user
→ LTV > 1M/user
→ LTV/CAC > 3
→ Free-to-Paid conversion > 5%

LONG-TERM:
→ 10k users in 12 months
→ 100k users in 24 months
→ Sustainable business (profitable)
```

---

## 🎯 KEY DIFFERENTIATORS

| Feature | Western Apps | VN Apps | Sổ Quỹ Việt |
|---------|--------------|---------|-------------|
| **Mental Model** | 50/30/20 rule | 100+ categories | Kakeibo 4-color |
| **Tet Focus** | ❌ | ❌ | ✅ PRIMARY |
| **Learning Curve** | High | Medium | 5 MINUTES |
| **Psychology** | Restrictive | Neutral | NON-JUDGMENTAL |
| **Offline-first** | ❌ | ❌ | ✅ 100% |
| **Data Ownership** | Cloud | Cloud | LOCAL |
| **CLI Support** | ❌ | ❌ | ✅ YES |

---

## 📝 NEXT STEPS (IMMEDIATE ACTIONS)

```bash
# 1. Start Phase 1 Development
cd /Users/thailq/dev/so-quy-viet/cli
# Begin CLI Core implementation

# 2. Create task tracking
# See: roadmap-phase1.md

# 3. Document architecture
# Create: docs/architecture.md

# 4. Prepare validation materials
# Create: docs/validation-plan.md
# Create: docs/user-recruitment-script.md
```

---

**Last updated:** 2026-01-20
**Status:** Phase 1 planned, not started
**Owner:** @thailq
**Review date:** Weekly during Phase 1

---

## APPENDIX: QUICK REFERENCE

### 4 Kakeibo Categories
```
🔴 CẦN      - Không thể thiếu (sinh tồn)
🟡 MUỐN     - Muốn có, nhưng không cần
🟢 NÊN      - Tốt cho bản thân/xã hội/cộng đồng
🔵 CÓ THỂ   - Hoàn toàn có thể tránh
```

### Core Values
```
1. Offline-first - No forced cloud sync
2. ESG-aligned - Privacy, sustainability
3. CLI-centric - Terminal is primary interface
4. Zero-server - Local-first, P2P when needed
5. Solo-but-powerful - Single dev can build/maintain
```

### Target Segments
```
1. 25-40 tuổi, văn phòng (10-30tr/tháng)
2. Gia đình trẻ (con 0-10 tuổi, 20-40tr/tháng)
3. Kinh doanh tự do / freelancer
```

### Success Formula
```
Product-Market Fit =
  (Kakeibo mental model) ×
  (Vietnamese culture) ×
  (Psychological safety) ×
  (Radical simplicity)
```
