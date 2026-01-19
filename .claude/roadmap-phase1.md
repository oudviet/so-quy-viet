# ROADMAP PHASE 1: MVP Development
## Sổ Quỹ Việt - Timeline 4-6 weeks

---

## 🎯 OBJECTIVE
Build MINIMUM product with MAXIMUM value for 3 segments:
- Segment 1: 25-40 tuổi, văn phòng (10-30tr/tháng)
- Segment 2: Gia đình trẻ (con 0-10 tuổi, 20-40tr/tháng)
- Segment 3: Kinh doanh tự do / freelancer

---

## 📅 WEEK 1-2: CLI CORE

### Task 1.1: Setup CLI Framework
**File:** `cli/so-quy-viet.js`
- [x] Basic CLI structure (commander.js or yargs)
- [ ] Add command: `init` - Initialize local database
- [ ] Add command: `add` - Quick expense capture
- [ ] Add command: `list` - View recent expenses
- [ ] Add command: `summary` - View Kakeibo summary
- [ ] Local storage: JSON file in `~/.so-quy-viet/expenses.json`

**Success Criteria:**
```bash
so-quy-viet init
# → Creates ~/.so-quy-viet/expenses.json

so-quy-viet add 50000 "Cafe" --type MUỐN
# → Saves expense

so-quy-viet list
# → Shows last 20 expenses

so-quy-viet summary
# → Shows 4-color breakdown
```

**Estimated time:** 2-3 days

---

### Task 1.2: Expense Capture UX
**File:** `cli/add-expense.js`
- [ ] Interactive mode (questions)
- [ ] Quick mode (single command)
- [ ] Auto-detect amount from input
- [ ] Smart category suggestions
- [ ] Edit after save (within 30 seconds)

**Success Criteria:**
- Time to add expense < 10 seconds
- Error rate < 5%

**Estimated time:** 2 days

---

## 📅 WEEK 3: 4-COLOR CLASSIFICATION

### Task 1.3: Kakeibo Classification Engine
**File:** `cli/kakeibo-classifier.js`
- [ ] Decision tree logic (4 questions)
- [ ] Machine learning: Learn from user patterns
- [ ] Category suggestions based on history
- [ ] Bulk classification for imported data

**Success Criteria:**
- Classification accuracy > 80% (user-validated)
- Classification time < 3 seconds

**Estimated time:** 3 days

---

### Task 1.4: Category Management
**File:** `cli/categories.js`
- [ ] 20 default categories (seeded)
- [ ] Custom category creation
- [ ] Category mapping to Kakeibo types
- [ ] Icon/color assignment

**Success Criteria:**
- User can create custom category in < 30 seconds
- Default categories cover 90% of use cases

**Estimated time:** 2 days

---

## 📅 WEEK 4: DAILY/WEEKLY SUMMARY

### Task 1.5: Summary Views
**File:** `cli/summary.js`
- [ ] Daily summary (today's expenses)
- [ ] Weekly summary (last 7 days)
- [ ] Monthly summary (current month)
- [ ] Custom date range summary
- [ ] Visual breakdown (text-based charts)

**Success Criteria:**
- Summary renders in < 2 seconds
- User opens summary ≥ 3 times/week

**Estimated time:** 3 days

---

### Task 1.6: Insights Engine
**File:** `cli/insights.js`
- [ ] Pattern detection (e.g., "cafe 30 times/month")
- [ ] Non-judgmental suggestions
- [ ] Comparison to previous period
- [ ] Goal progress tracking

**Success Criteria:**
- Insights are helpful (user validation)
- No "overspending" alerts (non-judgmental)

**Estimated time:** 3 days

---

## 📅 WEEK 5: TET BUDGET PLANNER

### Task 1.7: Tet Budget Setup
**File:** `cli/tet-init.js`
- [ ] Interactive wizard
- [ ] Suggest budget allocation (50/25/20/5)
- [ ] Custom allocation override
- [ ] Line-item budgeting per category
- [ ] Save budget template

**Success Criteria:**
- User can setup Tet budget in < 10 minutes
- Budget suggestions feel reasonable (user validation)

**Estimated time:** 4 days

---

### Task 1.8: Tet Tracking
**File:** `cli/tet-track.js`
- [ ] Real-time budget vs actual
- [ ] Progress bars (text-based)
- [ ] Alerts when approaching limit
- [ ] Overshoot warnings (non-judgmental)
- [ ] Post-Tet analysis

**Success Criteria:**
- User checks Tet budget ≥ 3 times/week during Tet
- Overshoot rate < 20%

**Estimated time:** 3 days

---

## 📅 WEEK 6: INCOME/EXPENSE SEPARATION + EXPORT

### Task 1.9: Multi-Account Tracking
**File:** `cli/accounts.js`
- [ ] Create multiple accounts
- [ ] Assign income to accounts
- [ ] Transfer between accounts
- [ ] Account-specific summaries
- [ ] Reserve fund tracking

**Success Criteria:**
- User can setup accounts in < 5 minutes
- Freelancers find this useful (validation)

**Estimated time:** 3 days

---

### Task 1.10: Data Export
**File:** `cli/export.js`
- [ ] Export to JSON
- [ ] Export to CSV (Excel compatible)
- [ ] Export to PDF (optional, Phase 2)
- [ ] Date range selection
- [ ] Privacy warning (data ownership)

**Success Criteria:**
- Export works in < 5 seconds
- User can open CSV in Excel without issues

**Estimated time:** 2 days

---

## 📊 SUCCESS METRICS FOR PHASE 1

### North Star Metric
```
User can record expense < 10 seconds
(5x faster than banking apps)
```

### Secondary Metrics
```
Engagement:
→ Daily entries/user ≥ 3
→ Weekly summary views ≥ 2
→ Retention D7 ≥ 40%

UX:
→ Time to first entry < 5 minutes
→ Time per entry < 10 seconds
→ Error rate < 5%

Satisfaction:
→ NPS ≥ 40 (in Phase 2)
→ "Better than current app" ≥ 70%
```

### Exit Criteria for Phase 1
```
✅ All 10 tasks completed
✅ CLI works on macOS, Linux, Windows
✅ Local storage reliable (no data loss)
✅ Export/Import functional
✅ Ready for Phase 2 testing
```

---

## 🚨 RISKS & MITIGATION

### Risk 1: CLI not user-friendly for non-tech
**Mitigation:**
- Build Web UI alongside (simple, single-page)
- Video tutorials (2-3 minutes each)
- Interactive onboarding (not documentation)

### Risk 2: 4 categories not enough
**Mitigation:**
- Allow custom sub-categories
- Free-text tagging system
- Category mapping suggestions

### Risk 3: Tet budget too complex
**Mitigation:**
- Start with wizard (guided)
- Pre-built templates (by income level)
- One-click setup

### Risk 4: Local data loss
**Mitigation:**
- Auto-backup to iCloud/Dropbox (optional)
- Export reminder (weekly)
- Recovery command: `so-quy-viet restore`

---

## 📝 DELIVERABLES

### Code
- [ ] CLI tool: `cli/so-quy-viet.js`
- [ ] Modules: add, list, summary, kakeibo, tet, accounts, export
- [ ] Tests: Unit tests for core functions
- [ ] Documentation: README, usage guide

### Documentation
- [ ] User guide: `docs/user-guide.md`
- [ ] Kakeibo explanation: `docs/kakeibo-how-it-works.md`
- [ ] Tet planning guide: `docs/tet-budget-guide.md`
- [ ] Developer docs: `docs/development.md`

### Marketing (Pre-Phase 2)
- [ ] Landing page copy
- [ ] Demo video (2 minutes)
- [ ] Screenshots of CLI usage
- [ ] Testimonial template

---

## 🎯 NEXT STEPS AFTER PHASE 1

1. **Self-testing:** Use for 1 week personally
2. **Alpha testing:** 5 friends/family
3. **Bug fixes:** Address critical issues
4. **Phase 2 kickoff:** Recruit 30 beta testers

---

**Last updated:** 2026-01-20
**Status:** Not started
**Owner:** @thailq
