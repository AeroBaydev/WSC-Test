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
│  │  ├── register/route.js
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
│  ├── registration-success/page.tsx
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

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
CLERK_WEBHOOK_SECRET=optional_if_used

# Zoho Webhook
ZOHO_WEBHOOK_SECRET=your_zoho_webhook_secret
```

Notes:
- `ZOHO_WEBHOOK_SECRET` must match the secret configured in Zoho Webhook settings.
- Clerk keys are required for local dev and production.

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

## 📞 Support

- **Email**: worldskillchallenge@gmail.com
- **Phone**: +91 9266300825
- **Website**: [https://worldskillchallenge.com](https://worldskillchallenge.com)

---

Made with ❤️ to empower young innovators❤️.
