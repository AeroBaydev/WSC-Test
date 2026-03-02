# 🚀 World Skill Challenge 2025

A modern, production-ready website for the World Skill Challenge – Crafting Champions of Tomorrow. Built with Next.js App Router, Clerk authentication, MongoDB, Tailwind CSS, and Framer Motion. Includes complete Zoho Forms integration for category-based registrations with webhook processing and duplicate prevention.

**🌐 Live Site**: [https://worldskillchallenge.com](https://worldskillchallenge.com)

## 🌟 Highlights

- **4 Competition Categories**: IDEA IGNITE, MYSTERY MAKERS, TECH FOR GOOD, TECH THROTTLE
- **Secure Auth**: Clerk-powered sign in/sign up
- **Data Layer**: MongoDB (Mongoose) with connection pooling
- **Forms**: Zoho Forms with hidden fields, signature verification, and webhook ingestion
- **UI/UX**: Tailwind CSS, Framer Motion, responsive, accessible, polished
- **DX**: TypeScript-ready, App Router, API Routes, component library

## 🧭 Table of Contents

- Features
- Tech Stack
- Project Structure
- Environment Variables
- Getting Started
- Zoho Forms Integration
- Available Scripts
- Deployment
- Support

## ✨ Features

- **Competition Catalog** with pricing, features, and dynamic registration links
- **Clerk Authentication** via `@clerk/nextjs`
- **Registration Flow**
  - Prefills Zoho forms with Clerk user data
  - Webhook verifies signature and persists to MongoDB
  - Prevents duplicate registrations per category (server + UI)
  - Redirects to success page and confirms registration
- **Content Pages**: Home, FAQ, Updates, Contact
- **SEO**: `robots.js`, `sitemap.js`, `SEOHead` component

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router), React 18
- **Auth**: Clerk
- **Database**: MongoDB (Mongoose)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI based components (shadcn style)
- **Deploy**: Vercel

## 📁 Project Structure

```
WSC/
├── app/
│  ├── api/
│  │  ├── contact/route.js
│  │  ├── save-user/route.js
│  │  ├── mark-registered/route.ts
│  │  └── webhook/zoho-success/route.ts
│  ├── components/
│  │  ├── About.js
│  │  ├── Categories.js
│  │  ├── Contact.js
│  │  ├── CursorFollower.js
│  │  ├── FAQ.js
│  │  ├── Footer.js
│  │  ├── Hero.js
│  │  ├── Navbar.js
│  │  ├── Register.jsx
│  │  ├── RegistrationSuccess.js
│  │  ├── SEOHead.js
│  │  ├── Stages.js
│  │  └── Updates.js
│  ├── faq/page.js
│  ├── updates/page.js
│  └── registration-success/page.tsx
│  ├── globals.css
│  ├── layout.js
│  ├── page.js
│  ├── robots.js
│  └── sitemap.js
├── components/
│  ├── theme-provider.tsx
│  └── ui/... (Radix-based UI components)
├── hooks/
│  ├── use-mobile.tsx
│  └── use-toast.ts
├── lib/
│  ├── dbConnect.ts
│  ├── userModel.ts
│  └── utils.ts
├── middleware.ts
├── public/
│  └── images/* and assets
├── styles/globals.css
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🔐 Environment Variables

Create a `.env.local` in the project root:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
CLERK_WEBHOOK_SECRET=optional_if_used

# Email Configuration (for contact form)
EMAIL_USER=your_email@domain.com
EMAIL_PASS=your_email_password
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_SECURE=false

# Zoho Integration
ZOHO_WEBHOOK_SECRET=your_zoho_webhook_secret

# Razorpay Payment Integration
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_live_razorpay_secret
RAZORPAY_BASE_URL=https://api.razorpay.com/v1
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
RAZORPAY_SUCCESS_REDIRECT_URL=https://worldskillchallenge.com/registration-success
ALREADY_REGISTERED_URL=https://worldskillchallenge.com/registration-success?status=already

# Optional: Dynamic Coupons
COUPONS_JSON=[{"code":"NEHA20","discountType":"percent","amount":20,"active":true}]
```

Notes:
- Use **live keys** (`rzp_live_`, `pk_live_`, `sk_live_`) for production
- Use **test keys** (`rzp_test_`, `pk_test_`, `sk_test_`) for development
- `ZOHO_WEBHOOK_SECRET` must match the secret configured in Zoho Webhook settings
- `RAZORPAY_WEBHOOK_SECRET` must match the secret configured in Razorpay Dashboard

## 🚀 Getting Started

1. Install dependencies
```bash
npm install
```

2. Set environment variables
- Create `.env.local` with the values shown above

3. Run the dev server
```bash
npm run dev
```

4. Open the app
- `http://localhost:3000`

## 🔗 Zoho Forms Integration

This project includes a full Zoho integration: dynamic links, webhook, redirect confirmation, and duplicate prevention.

- Dynamic form links are generated in `app/components/Register.jsx` using Clerk user data:
  - `clerkUserId`, `email`, `category` are appended as query params to Zoho URLs
- Webhook endpoint: `app/api/webhook/zoho-success/route.ts`
  - Verifies `x-zoho-signature` with `ZOHO_WEBHOOK_SECRET`
  - Extracts `clerkUserId`, `email`, `category`, `Payment_Status`
  - Adds category to the user's `categories` array if not already present
- Registration confirmation: `app/registration-success/page.tsx`
  - Reads `clerkUserId` and `category` from query
  - Calls `POST /api/mark-registered` to confirm
- Duplicate prevention:
  - Server: both webhook and `mark-registered` prevent duplicates
  - UI: registered categories show a disabled "Already Registered" state

Update your Zoho form base URLs in `Register.jsx`:
```js
const categoryFormBaseUrls = {
  "IDEA IGNITE": "yourlink",
  "MYSTERY MAKERS": "yourlink",
  "TECH FOR GOOD": "yorlink",
  "TECH THROTTLE": "yourlink",
}
```

Configure Zoho:
- Webhook URL: `https://worldskillchallenge.com/api/webhook/zoho-success`
- Redirect URL: `https://worldskillchallenge.com/registration-success?clerkUserId=${clerkUserId}&category=${category}`
- Hidden fields: `clerkUserId`, `email`, `category` (aliases must match exactly)

## 🧪 Available Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Lint
```

## 📦 Data Model

`lib/userModel.ts`
- `userId` (Clerk ID), `firstName`, `lastName`, `username`, `schoolName`
- `categories`: array of `{ category: string, paymentStatus: string, registeredAt: Date }`

## ☁️ Deployment (Vercel)

1. Push to GitHub
2. Import repo in Vercel
3. Add env vars (same as `.env.local`)
4. Deploy

## 🛠 Troubleshooting & Issues Resolved

### Issues Encountered During Development

#### 1. **Zoho Webhook Failures (500 Internal Server Error)**
**Problem**: Webhook returning 500 errors due to undefined variables
**Solution**: 
- Fixed undefined `paymentStatus` and `paymentAmount` variables in webhook code
- Added proper error handling and logging
- Ensured all required environment variables are set

#### 2. **Payment Page Not Opening (zoho-redirect endpoint failures)**
**Problem**: Users couldn't access Razorpay payment page
**Root Causes & Solutions**:
- **Missing Environment Variables**: Added all required Razorpay credentials
- **URL Parsing Errors**: Fixed `RAZORPAY_BASE_URL` configuration issues
- **Vercel Free Tier Limitations**: Added 8-second timeout and optimized for free tier
- **Success URL Parsing**: Simplified URL construction to avoid parsing errors

#### 3. **Environment Variable Configuration Issues**
**Problem**: Incorrect or missing environment variables in Vercel
**Solution**:
- Created comprehensive environment variable documentation
- Added validation checks for critical variables
- Implemented fallback values and better error messages

#### 4. **Database Connection Issues**
**Problem**: MongoDB connection failures
**Solution**:
- Fixed connection string format
- Added proper error handling for database operations
- Implemented connection pooling

#### 5. **Payment Flow Optimization for Vercel Free Tier**
**Problem**: Function timeouts on free Vercel plan
**Solution**:
- Added 8-second timeout (under 10-second limit)
- Optimized API calls and reduced processing time
- Implemented efficient error handling

### Key Fixes Applied

1. **Hardcoded Correct URLs**: Removed dependency on potentially malformed environment variables
2. **Simplified URL Construction**: Used direct string concatenation instead of complex URL parsing
3. **Added Comprehensive Error Handling**: Better error messages for debugging
4. **Optimized for Free Tier**: Ensured compatibility with Vercel free plan limitations
5. **Fixed Webhook Code**: Resolved undefined variable issues

### Payment Data Storage Issue

**Current Issue**: System stores user data even for incomplete payments
**Recommended Solution**: Modify the flow to only store data after successful payment

To implement this, you would need to:
1. Remove user data creation from `zoho-redirect` endpoint
2. Only create user records in the Razorpay webhook when `paymentStatus: 'success'`
3. Use temporary session storage for incomplete registrations

## 📞 Support

- **Email**: worldskillchallenge@gmail.com
- **Phone**: +91 9266300825
- **Website**: [https://worldskillchallenge.com](https://worldskillchallenge.com)

---

Made with ❤️ to empower young innovators❤️.
