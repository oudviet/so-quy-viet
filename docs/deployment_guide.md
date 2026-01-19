# HƯỚNG DẪN DEPLOY KHẢO SÁT TẾT

## 🚀 CÁCH 1: Formspree (Đơn giản nhất - KHÔNG cần backend)

Formspree cho phép nhận form data mà không cần server. Miễn phí upto 50 submissions/month.

### Bước 1: Đăng ký Formspree
1. Truy cập: https://formspree.io/
2. Đăng ký tài khoản free
3. Click **"New Form"** → Đặt tên: "Khảo sát Tết"

### Bước 2: Cập nhật form HTML

Mở `web/survey.html`, tìm dòng:
```html
<form id="surveyForm">
```

Thay bằng:
```html
<form id="surveyForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Thay `YOUR_FORM_ID` bằng ID form của bạn từ Formspree.

### Bước 3: Deploy lên GitHub Pages

```bash
# Init repo nếu chưa có
cd web
git init
git add survey.html
git commit -m "Add Tet survey form"

# Push to GitHub
# Sau đó enable GitHub Pages trong repo Settings > Pages
```

### Bước 4: Share link

Link sẽ là: `https://username.github.io/so-quy-viet/survey.html`

---

## 🚀 CÁCH 2: Netlify Drop (Nhanh nhất)

### Bước 1: Chuẩn bị folder
```bash
# Tạo folder mới chỉ chứa survey.html
mkdir deploy
cp web/survey.html deploy/index.html
```

### Bước 2: Deploy
1. Truy cập: https://app.netlify.com/drop
2. Kéo folder `deploy` vào
3. Chờ 30 giây → xong!

### Bước 3: Thêm Formspree

1. Edit file trực tiếp trên Netlify
2. Thêm Formspree action như Cách 1

---

## 🚀 CÁCH 3: Vercel + Google Sheets (Tự động lưu vào Sheets)

### Bước 1: Deploy lên Vercel

```bash
# Cài Vercel CLI
npm i -g vercel

# Deploy
cd web
vercel
```

### Bước 2: Kết nối Google Sheets

Tạo file `web/script.js` với Google Apps Script:

```javascript
// Google Apps Script URL
const SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL';

// Trong form submit handler:
fetch(SCRIPT_URL, {
    method: 'POST',
    body: new FormData(form)
})
```

Tạo Google Apps Script:

```javascript
// Code cho Google Sheets
function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Lưu data
    sheet.appendRow([
        new Date(),
        data.age,
        data.income,
        data.tet_budget,
        data.kakeibo_need,
        data.kakeibo_want,
        data.biggest_spending,
        data.want_app,
        data.email || ''
    ]);

    return ContentService.createTextOutput("Success");
}
```

---

## 📊 XEM DỮ LIỆU

### Formspree
- Login vào Formspree
- View "Submissions"
- Export CSV

### Google Sheets
- Xem trực tiếp trên Sheets
- Tạo charts/phân tích

---

## ✅ CHECKLIST TRƯỚC KHI PUBLIC

- [ ] Test form trên mobile
- [ ] Test submit form
- [ ] Check confirm message hiển thị
- [ ] Add Google Analytics (optional)
- [ ] Add Facebook Pixel (optional)
- [ ] Test link share preview

---

## 📣 SHARE LINK

### Template đăng Facebook

```
🧧 [KHẢO SÁT] Bạn cần bao nhiêu tiền cho Tết?

Chào cả nhà! Mình đang xây dựng "Sổ Quỹ Việt" - một app quản lý chi phí theo phương pháp Kakeibo (Nhật Bản) nhưng được Việt hóa.

Để làm app phù hợp với người Việt, mình cần khảo sát thói quen chi tiêu Tết. Mong mọi người giúp mình 3 phút填写 nhé:

👉 Link: [YOUR_FORM_LINK]

Mình xin cảm ơn và sẽ update khi app ra mắt! 🎊

#Kakeibo #QuanLyTaiChinh #Tet2025
```

### Template đăng Zalo

```
🧧 Khảo sát thói quen chi tiêu Tết

Chào mọi người! Mình đang làm dự án "Sổ Quỹ Việt" - app quản lý chi tiêu theo phong cách Nhật.

Mọi người giúp mình khảo sát 3 phút nhé:

👉 [YOUR_FORM_LINK]

Cảm ơn cả nhà nhiều! 🎊
```

---

## 🎯 MỤC TIÊU

| Phase | Responses | Action |
|-------|-----------|--------|
| Alpha | 50 responses | Phân tích sơ bộ, điều chỉnh |
| Beta | 100 responses | Deep dive, tìm insights |
| Launch | 200+ responses | Data đáng tin cậy |
