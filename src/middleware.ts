import { proxy } from "./proxy";

export default proxy;
export { proxy as middleware };

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
