import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files, API routes, and special Next.js files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.includes(".") // file extension
  ) {
    return NextResponse.next();
  }

  // Check if path already has a language prefix
  const hasLangPrefix = pathname.startsWith("/fr");

  // Only redirect from root path or paths without language prefix
  if (!hasLangPrefix) {
    // Get the user's preferred language from headers
    const acceptLanguage = request.headers.get("accept-language");

    // Parse Accept-Language header and check if French is preferred
    let prefersFrench = false;

    if (acceptLanguage) {
      // Accept-Language format: "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7"
      const languages = acceptLanguage
        .toLowerCase()
        .split(",")
        .map((lang) => {
          const [code, q = "1"] = lang.trim().split(";q=");
          return { code, priority: parseFloat(q) };
        })
        .sort((a, b) => b.priority - a.priority);

      // Check if any French language code is in the top preferences
      const frenchCodes = ["fr", "fr-fr", "fr-ca", "fr-be", "fr-ch", "fr-lu"];
      prefersFrench = languages.some((lang) =>
        frenchCodes.some((code) => lang.code.startsWith(code))
      );

      // Debug logging
      console.log("Middleware - Pathname:", pathname);
      console.log("Middleware - Accept-Language:", acceptLanguage);
      console.log("Middleware - Parsed languages:", languages);
      console.log("Middleware - Prefers French:", prefersFrench);
    }

    // If user prefers French and is on root paths, redirect to /fr
    if (prefersFrench) {
      const url = request.nextUrl.clone();
      url.pathname = `/fr${pathname === "/" ? "" : pathname}`;
      console.log("Middleware - Redirecting to:", url.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|studio|.*\\.).*)",
};
