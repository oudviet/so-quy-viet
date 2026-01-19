# Decision Log



## 2026-01-20: Roadmap Complete Based on Market Analysis

### Decision: Create comprehensive 3-phase development roadmap

**Rationale:**
- Market analysis revealed 3 underserved segments with distinct pain points
- Kakeibo 4-color model aligns perfectly with Vietnamese psychology
- Tet is BIGGEST spending season (1-2 months salary) - must be first-class feature
- Current solutions fail because they don't understand Vietnamese culture

**Target Segments (Priority Order):**
1. **Segment 1:** 25-40 tuổi, văn phòng (10-30tr/tháng)
   - Pain: "Không hiểu tiền đi đâu cuối tháng"
   - Solution: Quick capture + Daily summary

2. **Segment 2:** Gia đình trẻ (con 0-10 tuổi, 20-40tr/tháng)
   - Pain: "Áp lực Tết, shock sau Tết"
   - Solution: Tet budget planner

3. **Segment 3:** Kinh doanh tự do / freelancer
   - Pain: "Thu nhập không đều, lẫn lộn tiền làm ăn/tiền sinh hoạt"
   - Solution: Multi-account tracking

**Roadmap Summary:**

**Phase 1: MVP (4-6 weeks)**
- CLI Core: init, add, list, summary
- 4-Color Kakeibo Classification (smart learning)
- Daily/Weekly Summary (non-judgmental insights)
- Tet Budget Planner (setup before Tet)
- Multi-Account Tracking (income/expense separation)
- Zero-Knowledge Export (JSON/CSV/PDF)

**Phase 2: Validation (4 weeks)**
- 30 users (10 per segment)
- Week 1: Onboarding
- Week 2: Active testing
- Week 3: Stress test + deep dive interviews
- Week 4: Retention test
- Success: NPS ≥ 40, Retention D7 ≥ 40%, ≥ 70% "better than current app"

**Phase 3: Growth (ongoing)**
- Mobile App (React Native)
- Advanced Insights
- P2P Sync (Zero-knowledge)
- Bank Integration (if requested)
- Goal: 1000 users in 3 months

**Key Differentiators:**
- Kakeibo 4-color model (vs 50/30/20 or 100+ categories)
- Tet-first design (not afterthought)
- Non-judgmental (no "overspending" alerts)
- Offline-first, privacy-first
- 5-minute learning curve

**Pricing:**
- Free: Unlimited entries, basic features
- Premium: 49k/tháng (~$2) - full features
- Lifetime: 1.499k (~$60) - all future updates

**Success Metrics:**
- North Star: Time to record < 10 seconds (5x banking apps)
- Phase 2: NPS ≥ 40, Retention D7 ≥ 40%
- Phase 3: 1000 users in 3 months, LTV/CAC > 3

**Files Created:**
- `.claude/roadmap-phase1.md` - Detailed MVP tasks
- `.claude/roadmap-complete.md` - Complete 3-phase roadmap

**Next Actions:**
1. Start Phase 1: CLI Core development
2. Prepare validation materials
3. Document architecture
4. Begin user recruitment (pre-marketing)

**Trade-offs:**
- CLI-first may alienate non-tech users → Mitigation: Web UI backup
- 4 categories may feel limiting → Mitigation: Custom sub-categories
- Tet focus may seem seasonal → Mitigation: Year-round value (habits, community)

**Long-term Vision:**
Not a "finance app" but a "self-awareness tool" for spending behavior
Culturally Vietnamese (Tết, quan hệ, mặt mũi are first-class)
Psychologically safe (no judgment, only insights)
