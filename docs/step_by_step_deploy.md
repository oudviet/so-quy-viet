# 🚀 DEPLOY KHẢO SÁT TẾT - TỪNG BƯỚC CHI TIẾT

---

## CÁCH 1: NETLIFY DROP (ĐƠN GIẢN NHẤT - 5 PHÚT)

### Bước 1: Chuẩn bị folder deploy

```bash
# Tạo folder deploy
mkdir deploy
cp web/survey.html deploy/index.html

# Kiểm tra
ls deploy/
# Phải thấy: index.html
```

### Bước 2: Deploy

1. Mở browser: **https://app.netlify.com/drop**
2. Kéo folder `deploy` từ Finder vào vùng drop
3. Chờ 30-60 giây
4. Xong! Link sẽ có dạng: `https://random-name.netlify.app`

### Bước 3: Test form

1. Mở link vừa được cấp
2. Điền thử form
3. Submit
4. Kiểm tra: Data được lưu trong localStorage (tạm)

### Bước 4: Kết nối Formspree (để nhận data)

Xem **CÁCH 2** bên dưới để kết nối Formspree, rồi deploy lại.

---

## CÁCH 2: FORMSPREE + NETLIFY (HOÀN CHỈNH - 10 PHÚT)

### Bước 1: Đăng ký Formspree

1. Vào: **https://formspree.io/**
2. Click **Sign Up** (hoặc Login với Google/GitHub)
3. Verify email nếu được yêu cầu

### Bước 2: Tạo Form mới

1. Click nút **+ New Form**
2. Điền thông tin:
   - **Form name**: `Khao sat Tet`
   - **Organization**: (chọn organization mặc định)
3. Click **Create Form**

### Bước 3: Lấy Form ID

Sau khi tạo xong, bạn sẽ thấy:
```
https://formspree.io/f/xvndbqlk
```
Copy phần `xvndbqlk` - đó là **Form ID** của bạn.

### Bước 4: Cập nhật file HTML

Mở `web/survey.html`, tìm dòng 335:

```html
<form id="surveyForm">
```

Thay bằng:

```html
<form id="surveyForm" action="https://formspree.io/f/xvndbqlk" method="POST">
```

> **Thay `xvndbqlk` bằng Form ID của bạn!**

### Bước 5: Tweak JavaScript (quan trọng!)

Tìm phần JavaScript submit handler (cuối file), thay đổi để gửi data đúng format.

Thay toàn bộ block submission code bằng:

```javascript
// Form submission
document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(this);

    // Submit to Formspree
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Show success message
            document.getElementById('navButtons').style.display = 'none';
            document.querySelectorAll('.question-section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('progress').style.width = '100%';
        } else {
            alert('Có lỗi xảy ra, vui lòng thử lại!');
        }
    }).catch(error => {
        alert('Có lỗi xảy ra: ' + error);
    });
});
```

### Bước 6: Deploy lại

```bash
# Copy file đã cập nhật
cp web/survey.html deploy/index.html

# Deploy lại (kéo folder lên Netlify Drop lần nữa)
```

### Bước 7: Test thật!

1. Mở link Netlify
2. Điền đầy đủ form
3. Submit
4. Vào Formspree → Check **Submissions**
5. Bạn sẽ thấy data!

---

## CÁCH 3: GITHUB PAGES (MIỄN PHÍ VĨNH VIỄN)

### Bước 1: Chuẩn bị repo

```bash
# Kiểm tra repo hiện tại
git remote -v

# Nếu chưa có remote, tạo:
# git remote add origin https://github.com/username/so-quy-viet.git
```

### Bước 2: Tạo branch cho Pages

```bash
# Tạo branch gh-pages
git checkout -b gh-pages

# Copy file vào root
cp web/survey.html index.html

# Commit
git add index.html
git commit -m "Add Tet survey form"

# Push
git push origin gh-pages
```

### Bước 3: Kích hoạt GitHub Pages

1. Vào repo trên GitHub
2. **Settings** → **Pages**
3. **Source**: Chọn `gh-pages` branch
4. Click **Save**
5. Chờ 1-2 phút
6. Link: `https://username.github.io/so-quy-viet/`

---

## CÁCH 4: VERCEL (PROFESSIONAL)

### Bước 1: Cài Vercel CLI

```bash
npm i -g vercel
```

### Bước 2: Deploy

```bash
# Tạo folder vercel
mkdir vercel-deploy
cp web/survey.html vercel-deploy/index.html

cd vercel-deploy
vercel
```

1. Link sẽ có: `https://so-quy-viet.vercel.app`

### Bước 3: Alias custom (optional)

```bash
vercel --prod
vercel alias set [deployment-url] survey.soquyviet.com
```

---

## 📊 XEM DỮ LIỆU TỪ FORMSPREE

### Cách 1: View trên web

1. Login: https://formspree.io/
2. Chọn form "Khao sat Tet"
3. Click **Submissions**
4. Xem từng response

### Cách 2: Export CSV

1. Trong tab **Submissions**
2. Click **Download CSV**
3. Mở bằng Excel/Google Sheets

### Cách 3: Google Sheets Integration (Advanced)

1. Formspree → Form → **Integrations**
2. Add **Google Sheets**
3. Authorize với Google
4. Data tự động sync vào Sheets!

---

## ✅ CHECKLIST TRƯỚC KHI PUBLIC

- [ ] Form submit thành công
- [ ] Data xuất hiện trên Formspree
- [ ] Test trên mobile (responsive)
- [ ] Test với các câu trả lời khác nhau
- [ ] Confirm message hiển thị đúng
- [ ] Share link test cho 1-2 người bạn

---

## 🎯 BẮT ĐẦU NHẬN RESPONSE

### Ngày 1-3: Share cho network gần

**Zalo:**
- Gửi cho 10-20 người bạn thân
- 2-3 group family

**Facebook:**
- 1-2 group bạn bè
- Personal wall

### Ngày 4-7: Share rộng hơn

**Facebook Groups:**
- Cộng đồng Tài chính cá nhân
- Cộng đồng Kakeibo / Tiết kiệm
- Group local (Hà Nội / Sài Gòn / Đà Nẵng...)

**LinkedIn:**
- Post về dự án
- Tag network

### Target:
- Week 1: 30 responses
- Week 2: 50 responses
- Week 3: 100 responses

---

## 📣 TEMPLATE ĐĂNG BÀI

### Facebook

```
🧧 [KHẢO SÁT] Bạn cần bao nhiêu tiền cho Tết 2025?

Chào cả nhà! Mình đang xây dựng "Sổ Quỹ Việt" - một ứng dụng quản lý chi tiêu theo phương pháp Kakeibo (Nhật Bản) nhưng được Việt hóa hoàn toàn.

Để làm app phù hợp nhất với người Việt, mình cần khảo sát thói quen chi tiêu dịp Tết. Mong mọi người giúp mình 3-5 phút填写 nhé:

👉 Link: [YOUR_FORM_LINK]

Mình xin cảm ơn và sẽ update khi app ra bản BETA! 🎊

#Kakeibo #QuanLyTaiChinh #Tet2025 #SoQuyViet
```

### LinkedIn

```
I'm building "Sổ Quỹ Việt" - a Kakeibo-style expense tracker adapted for Vietnamese culture.

To ensure the product resonates with local users, I'm running a survey on Tet (Lunar New Year) spending habits. If you have 3 minutes, I'd appreciate your input:

👉 [YOUR_FORM_LINK]

Thank you for supporting this project!

#ProductManagement #UserResearch #Vietnam #Fintech
```

---

## 🆘 TROUBLESHOOTING

### Form không submit?

1. **Check browser console** (F12) xem có lỗi gì
2. **Kiểm tra Formspree URL** có đúng không
3. **Xem quota Formspree** (free 50 submissions/month)

### Không nhận được email?

1. Formspree → Form → **Settings** → **Email**
2. Thêm email của bạn vào **Recipients**

### Data bị trùng?

1. Disable JavaScript validation trước khi submit lại
2. Check Formspree submissions tab

---

## 📞 CẦN GIÚP?

- Formspree Docs: https://formspree.io/docs/
- Netlify Docs: https://docs.netlify.com/
- GitHub Pages: https://pages.github.com/

---

## 🎉 SAU KHI ĐÃ DEPLOY

1. **Test form**: Tự test 3-5 lần
2. **Share**: Gửi cho 5-10 người test trước
3. **Monitor**: Check Formspree mỗi ngày
4. **Analyze**: Sau 50 responses, bắt đầu phân tích

Chúc bạn deploy thành công! 🚀
