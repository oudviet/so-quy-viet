# 🧠 BEADS WORKFLOW - HƯỚNG DẪN CHO CLAUDE

## 🚨 LUẬT VÀNG
- **LUÔN** chạy \`bd ready --json\` khi bắt đầu session mới hoặc sau compact
- **LUÔN** cập nhật notes chi tiết: \`bd update <id> --notes "COMPLETED:... IN_PROGRESS:... NEXT:..."\`
- **KHÔNG BAO GIỜ** đoán trạng thái task - LUÔN query Beads
- **LUÔN** chạy \`bd sync\` trước khi đóng Claude Code

## 🔄 WORKFLOW CHUẨN
1. **Bắt đầu session**:
   \`\`\`
   bd ready --json
   \`\`\`

2. **Chọn task ưu tiên** (P0 trước):
   \`\`\`
   bd update sqv-xxxx --status in_progress
   \`\`\`

3. **Làm việc + ghi notes** (sau mỗi bước quan trọng):
   \`\`\`
   bd update sqv-xxxx --notes "
   COMPLETED: Thiết kế bảng câu hỏi 5 câu
   IN_PROGRESS: Liên hệ người tham gia phỏng vấn
   NEXT: Phân tích dữ liệu sau 5 phản hồi
   FILES: research/survey_form.md, docs/interview_template.md
   "
   \`\`\`

4. **Hoàn thành task**:
   \`\`\`
   bd close sqv-xxxx --reason "Done"
   \`\`\`

## 💡 PHỤC HỒI SAU COMPACT (KHI QUÊN CONTEXT)
Nếu không nhớ đang làm gì:
\`\`\`
# Bước 1: Tìm task đang làm dở
bd list --status in_progress --json

# Bước 2: Xem chi tiết notes
bd show sqv-xxxx

# Bước 3: Tiếp tục từ nơi dừng lại
\`\`\`

## 📌 DỰ ÁN HIỆN TẠI: Sổ Quỹ Việt (sqv-)
- **Mục tiêu**: Ứng dụng Kakeibo phong cách Nhật, Việt hóa cho người Việt
- **Prefix**: sqv
- **Epic chính**: sqv-a3f8 (Sổ Quỹ Việt - Ứng dụng Kakeibo Việt hóa)
- **Task ưu tiên hiện tại**: sqv-a3f8.1 (Khảo sát thói quen chi tiêu Tết)
- **Các phân loại chi tiêu**: CẦN - MUỐN - NÊN - CÓ THỂ

## 🎯 TASK KẾ TIẾP ĐỀ XUẤT
Sau khi hoàn thành khảo sát, tiếp tục với:
1. Thiết kế 4 phân loại Kakeibo theo văn hóa Việt
2. Xây dựng database schema chi tiêu
3. Phát triển màn hình ghi chép chi tiêu đơn giản
