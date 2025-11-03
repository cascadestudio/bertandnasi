"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function LanguageSetter() {
  const pathname = usePathname();

  useEffect(() => {
    // Set the html lang attribute based on the current pathname
    const lang = pathname.startsWith("/fr") ? "fr" : "en";
    document.documentElement.lang = lang;
  }, [pathname]);

  return null;
}
