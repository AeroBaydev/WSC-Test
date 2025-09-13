// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Protect all routes by default
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"], // Matches all routes except static files
};
