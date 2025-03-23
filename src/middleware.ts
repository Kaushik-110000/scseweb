import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedPath = path === "/dashboard";
  const token = request.cookies.get("logtok")?.value || "";
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const isWithoutTokenPath =
    path === "/login" || path === "/register" || path === "fillCredentials";
  if (isWithoutTokenPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const eauthtok = request.cookies.get("eAuthToken")?.value || "";
  if (path === "/fillCredentials" && !eauthtok) {
    return NextResponse.redirect(new URL("/register", request.url));
  }

  // if (!pageExists(path)) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

}



// function pageExists(path: string): boolean {
//   const existingRoutes = [
//     "/",
//     "/dashboard",
//     "/login",
//     "/register",
//     "/fillCredentials",
//     "/contact",
//     "/about",
//     "/services", // 
//   ];
//   return existingRoutes.includes(path);
// }
// export const config = {
//   matcher: ["/:path*"], // Match all paths
// };


// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard", "/login", "/register", "/fillCredentials"],
};
