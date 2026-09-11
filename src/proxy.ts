import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isComingSoon } from "@/lib/site-config";

export function proxy(request: NextRequest) {
  if (!isComingSoon) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/coming-soon")) return NextResponse.next();

  return NextResponse.rewrite(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|coming-soon).*)"],
};
