'use client';

import Script from 'next/script';

/**
 * Umami Analytics component
 * Loads the Umami tracking script for page views and custom events
 */
export default function UmamiAnalytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js';

  // Don't load analytics in development or if website ID is not configured
  if (process.env.NODE_ENV === 'development' || !websiteId) {
    return null;
  }

  return (
    <Script
      src={scriptUrl}
      data-website-id={websiteId}
      strategy="afterInteractive"
      async
    />
  );
}
