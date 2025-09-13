# Zoho Forms Integration Setup

This document outlines the complete Zoho Forms integration for the WSC competition registration system.

## Overview

The integration allows users to register for competition categories through Zoho Forms with automatic data synchronization to MongoDB and Clerk authentication.

## Components Created

### 1. Updated User Model (`lib/userModel.ts`)
- Added `categories` array to track user registrations
- Each category includes: `category`, `paymentStatus`, `registeredAt`

### 2. Zoho Webhook API (`app/api/webhook/zoho-success/route.ts`)
- Verifies Zoho signature using `ZOHO_WEBHOOK_SECRET`
- Processes form submissions and saves to MongoDB
- Prevents duplicate registrations

### 3. Mark Registered API (`app/api/mark-registered/route.ts`)
- Handles registration confirmation
- Provides GET endpoint to fetch user categories
- Prevents duplicate registrations

### 4. Registration Success Page (`app/registration-success/page.tsx`)
- Handles redirect from Zoho Forms
- Confirms registration status
- Shows success/error messages

### 5. Updated Register Component (`app/components/Register.jsx`)
- Fetches user categories on load
- Shows "Already Registered" for completed categories
- Dynamic Zoho form URLs with user data

## Environment Variables Required

Add these to your `.env.local`:

```env
ZOHO_WEBHOOK_SECRET=your_zoho_webhook_secret_here
```

## Zoho Forms Setup

### 1. Form Configuration
- Create forms for each category
- Add hidden fields: `clerkUserId`, `email`, `category`
- Set field aliases to match the field names

### 2. Webhook Configuration
- Set webhook URL to: `https://yourdomain.com/api/webhook/zoho-success`
- Configure signature verification with your secret

### 3. Redirect Configuration
- Set redirect URL to: `https://yourdomain.com/registration-success?clerkUserId=${clerkUserId}&category=${category}`

## Category URLs

Update the `categoryFormBaseUrls` in `Register.jsx` with your actual Zoho form URLs:

```javascript
const categoryFormBaseUrls = {
  "IDEA IGNITE": "https://zfrmz.in/SvuP1S8KLWoXfDLtmTvK",
  "MYSTERY MAKERS": "https://forms.zoho.in/aviotronaerospaceprivatelimite/form/IDEAIGNITE1",
  "TECH FOR GOOD": "https://forms.zoho.in/aviotronaerospaceprivatelimite/form/IDEAIGNITE1",
  "TECH THROTTLE": "https://forms.zoho.in/aviotronaerospaceprivatelimite/form/IDEAIGNITE1",
}
```

## Flow

1. User clicks "Register Now" → Opens Zoho form with prefilled data
2. User submits form → Zoho sends webhook to `/api/webhook/zoho-success`
3. Webhook verifies signature and saves to MongoDB
4. User is redirected to `/registration-success`
5. Success page confirms registration and updates UI
6. Register component shows "Already Registered" for completed categories

## Security Features

- Zoho signature verification
- Clerk authentication checks
- Duplicate registration prevention
- User authorization validation

## Testing

1. Test webhook signature verification
2. Test duplicate registration prevention
3. Test redirect flow
4. Test UI state updates
5. Test error handling

## Troubleshooting

- Check webhook logs in Zoho dashboard
- Verify environment variables
- Check MongoDB connection
- Ensure Clerk authentication is working
- Verify form field names match expected values

