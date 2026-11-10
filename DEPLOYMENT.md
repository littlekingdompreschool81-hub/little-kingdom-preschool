# 🚀 Little Kingdom Preschool — Production Deployment Guide

This guide details everything required to deploy the **Little Kingdom Preschool** website to production with zero downtime, instant email delivery, and enterprise security.

---

## ⚡ Option 1: One-Click Deploy to Vercel (Recommended)

Vercel is the native creator of Next.js and provides the fastest global CDN, free SSL, and automatic branch previews.

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "feat: complete production-ready preschool website"
git remote add origin https://github.com/YOUR_USERNAME/little-kingdom-preschool.git
git push -u origin master
```

### Step 2: Import into Vercel
1. Go to [https://vercel.com/new](https://vercel.com/new).
2. Select your repository: `little-kingdom-preschool`.
3. Choose **Next.js** as the framework preset (auto-detected).

### Step 3: Configure Production Environment Variables
In the Vercel project settings under **Environment Variables**, add the following keys from your `.env.local`:

| Variable Name | Production Value | Purpose |
| :--- | :--- | :--- |
| `ADMIN_EMAIL` | `littlekingdompreschool81@gmail.com` | Root administrator account |
| `STAFF_ALLOWLIST` | `littlekingdompreschool81@gmail.com,principal@littlekingdom.com` | Approved staff email list |
| `ADMIN_ACCESS_CODE` | *(Your secure staff passcode, e.g. `LittleKingdom@2026`)* | Password for staff portal |
| `SESSION_SECRET` | *(64-char random string or existing secret)* | Cryptographic HMAC session key |
| `SCHOOL_NOTIFICATION_EMAIL` | `littlekingdompreschool81@gmail.com` | Destination for parent enquiries |
| `WHATSAPP_NOTIFY_NUMBER` | `+917039015296` | School WhatsApp alert number |
| `SMTP_USER` | `littlekingdompreschool81@gmail.com` | Gmail account for notifications |
| `SMTP_PASS` | `dmbnyxvwqxhqdltl` | 16-character Gmail App Password |
| `NEXT_PUBLIC_SITE_URL` | `https://your-custom-domain.com` | Canonical URL for SEO & sitemaps |

4. Click **Deploy**! In ~60 seconds, your website will be live worldwide with free SSL (HTTPS).

---

## 🌐 Option 2: Deploy to Netlify / Railway

### Netlify:
1. Connect repository on [Netlify](https://app.netlify.com).
2. Build command: `pnpm run build`
3. Publish directory: `.next`
4. Add the environment variables listed in the table above.

### Railway / Docker VPS:
1. Railway will auto-detect Next.js via `pnpm start`.
2. Add environment variables in the Railway dashboard.

---

## 🔒 Post-Deployment Security & Verification Checklist

- [x] **Admissions Form Submission**: Submit a test admission enquiry to confirm:
  - Record is stored with unique reference ID (`LK-2026-XXXXX`).
  - Automated email lands in `littlekingdompreschool81@gmail.com`.
  - 1-click WhatsApp button opens chat to `+91 7039015296` with preschool emojis.
- [x] **Staff Portal**: Navigate to `/admin/login`, enter email and passcode to verify dashboard access.
- [x] **SEO**: Google indexing enabled via dynamic `/sitemap.xml` and `/robots.txt`.
- [x] **Error Handling**: Branded 404 page live at `/not-found`.
- [x] **Security Headers**: HSTS, CSP, and Anti-Clickjacking active on every response.
