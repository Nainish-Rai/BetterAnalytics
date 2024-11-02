import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/dashboard", "/analytics", "/settings", "/api/track(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
