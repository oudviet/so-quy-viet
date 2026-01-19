# 🌐 CUSTOM DOMAIN CHO KHẢO SÁT TẾT

---

## CÁCH 1: MUA DOMAIN MỚI (MIỀN PHÍ + TIỀN)

### BƯỚC 1: Chọn và mua domain

| Nhà cung cấp | Giá | .vn | .com |
|--------------|-----|-----|------|
| **Pavietnam** | Rẻ | ✓ | ✓ |
| **Matbao** | Trung bình | ✓ | ✓ |
| **Namecheap** | Rẻ (quốc tế) | ✗ | ✓ |
| **Cloudflare** | $10-15/năm | ✗ | ✓ |

**Đề xuất cho dự án này:**
- `khao-sat-tet.vn` (~300k/năm)
- `soquyviet.com` (~300k/năm)
- `kakeibo.vn` (~500k/năm - có thể đã có chủ)

### Mua tại Pavietnam (VD)

1. Vào: **https://pavietnam.vn/**
2. Kiểm tra tên miền: Nhập tên domain → **Kiểm tra**
3. Nếu còn trống → **Đăng ký**
4. Điền thông tin + Thanh toán (thẻ ATM, ví Momo...)

---

## CÁCH 2: SUBDOMAIN MIỄN PHÍ (KHÔNG CẦN MUA)

### Option A: Netlify Subdomain (Miễn phí)

1. Login Netlify → **Site settings**
2. **Change site name**
3. Điền tên: `khao-sat-tet`
4. Link sẽ là: `khao-sat-tet.netlify.app`

### Option B: GitHub Pages (Miễn phí)

1. Nếu deploy GitHub Pages
2. Link: `username.github.io/so-quy-viet/`
3. Có thể custom: `survey.soquyviet.github.io`

### Option C: Free DNS Services

| Service | Subdomain | Limit |
|---------|-----------|-------|
| **DuckDNS** | `.duckdns.org` | Miễn phí vô hạn |
| **FreeDNS** | Nhiều lựa chọn | Miễn phí |
| **No-IP** | `.ddns.net` | Miễn phí (cần renew 30 ngày) |

**Ví dụ:**
- `khaosattet.duckdns.org`
- `so-quy-viet.ddns.net`

---

## CÁCH 3: KẾT HỢP NETLIFY + DOMAIN CÓ SẴN

### BƯỚC 1: Thêm domain vào Netlify

1. Login Netlify → Chọn site `khao-sat-tet`
2. **Domain settings** → **Add custom domain**
3. Nhập domain: `khao-sat-tet.vn`
4. Click **Verify**

### BƯỚC 2: Cấu hình DNS

Tại Netlify sẽ hiện DNS records:

| Type | Name | Value |
|------|------|-------|
| A | `khao-sat-tet.vn` | `75.2.70.75` |
| A | `www.khao-sat-tet.vn` | `75.2.70.75` |

### BƯỚC 3: Update DNS tại nhà cung cấp

**Ví dụ Pavietnam:**

1. Login Pavietnam → **Quản lý tên miền**
2. Chọn domain `khao-sat-tet.vn`
3. **Quản lý DNS**
4. Thêm records:

```
Type: A
Name: @
Value: 75.2.70.75

Type: A
Name: www
Value: 75.2.70.75
```

5. **Lưu thay đổi**

### BƯỚC 4: Chờ DNS propagate (5-60 phút)

- Thường 5-15 phút
- Tối đa 24-48 giờ
- Check tại: https://dnschecker.org/

### BƯỚC 5: Enable HTTPS

1. Netlify → **Domain settings** → **HTTPS**
2. Click **Provision certificate**
3. Chờ 1-2 phút
4. Status: **Active**

---

## CÁCH 4: SỬ DỤNG CLOUDFLARE (MIỄN PHÍ SSL)

### Ưu điểm:
- Miễn phí SSL
- CDN nhanh
- DDoS protection
- DNS management

### BƯỚC 1: Thêm domain vào Cloudflare

1. Vào: **https://dash.cloudflare.com/**
2. **Add a site** → Nhập domain
3. Chọn plan **Free**

### BƯỚC 2: Cập nhật nameservers

Cloudflare sẽ cung cấp 2 nameservers:
```
alice.ns.cloudflare.com
bob.ns.cloudflare.com
```

### BƯỚC 3: Change nameservers tại Pavietnam

1. Login Pavietnam → **Quản lý tên miền**
2. **Change Nameservers**
3. Thay bằng nameservers của Cloudflare
4. **Lưu**

### BƯỚC 4: Thêm DNS records trong Cloudflare

1. **DNS** → **Records** → **Add record**
2. Thêm:

```
Type: CNAME
Name: survey (hoặc @)
Target: your-site.netlify.app
Proxy status: Proxied (orange cloud)
```

### BƯỚC 5: Cấu hình SSL/TLS

1. **SSL/TLS** → **Overview**
2. Chọn **Full** hoặc **Full (strict)**
3. **Always Use HTTPS** → ON

---

## CÁCH 5: LOCAL TUNNEL (TEST LOCAL)

### Dùng ngrok (Miễn phí)

```bash
# Cài đặt
brew install ngrok

# Chạy local server
cd deploy
python3 -m http.server 8000

# Mở tunnel khác terminal
ngrok http 8000
```

Link sẽ như: `https://abc123.ngrok.io`

---

## ✅ CHECKLIST SAU KHI CẤU HÌNH

- [ ] Domain trỏ về đúng site (check bằng browser)
- [ ] HTTPS hoạt động (không có warning)
- [ ] Form submit được
- [ ] Redirect `domain.com` → `www.domain.com` (hoặc ngược lại)
- [ ] Test trên mobile

---

## 🎯 ĐỀ XUẤT CHO DỰ ÁN NÀY

### Option 1: Nhanh nhất (5 phút)
- Dùng Netlify subdomain: `khao-sat-tet.netlify.app`

### Option 2: Chuyên nghiệp (1 ngày)
- Mua `soquyviet.com` (300k/năm)
- Cấu hình Netlify + HTTPS

### Option 3: Tối ưu (1 tuần)
- Mua `soquyviet.vn` + `kakeibo.vn`
- Redirect về cùng 1 site
- Setup email: `info@soquyviet.vn`

---

## 📞 TROUBLESHOOTING

### Domain không trỏ về site?

1. Check DNS propagation: https://dnschecker.org/
2. Clear DNS cache:
   ```bash
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   ```
3. Đợi thêm 15-30 phút

### HTTPS không hoạt động?

1. Netlify → **Domain settings** → **HTTPS**
2. Click **Provision certificate** lại
3. Đợi 1-2 phút

### Site không accessible?

1. Check Netlify deploy log
2. Verify DNS records
3. Contact Netlify support

---

## 🚀 BẮT ĐẦU NGAY!

**Đề xuất:** Bắt đầu với Netlify subdomain để test, sau đó upgrade khi cần.

```
Bước 1: Deploy với link: [tên-của-bạn].netlify.app
Bước 2: Test form + collect 50 responses
Bước 3: Mua domain + cấu hình
Bước 4: Share link chuyên nghiệp
```

Chúc bạn thành công! 🎉
