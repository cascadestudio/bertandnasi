export type Locale = "en" | "fr";

/**
 * Detects the locale from the pathname
 * Returns 'fr' if path starts with /fr, otherwise 'en'
 */
export function getLocale(pathname: string): Locale {
  return pathname.startsWith("/fr") ? "fr" : "en";
}

/**
 * Checks if the current path is a French path
 */
export function isFrenchPath(pathname: string): boolean {
  return pathname.startsWith("/fr");
}

/**
 * Gets the alternate language path for the current path
 * /about -> /fr/about
 * /fr/about -> /about
 */
export function getAlternatePath(pathname: string): string {
  if (isFrenchPath(pathname)) {
    // Remove /fr prefix
    const path = pathname.replace(/^\/fr/, "") || "/";
    return path;
  } else {
    // Add /fr prefix
    return `/fr${pathname}`;
  }
}

/**
 * Gets the path for a specific locale
 */
export function getLocalizedPath(
  pathname: string,
  targetLocale: Locale
): string {
  const currentLocale = getLocale(pathname);

  if (currentLocale === targetLocale) {
    return pathname;
  }

  return getAlternatePath(pathname);
}
