"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();

  // Don't render Navigation and Footer for studio routes
  const isStudioRoute = pathname.startsWith("/studio");

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
