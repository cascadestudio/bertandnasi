/**
 * Analytics utility functions for tracking custom events with Umami
 *
 * Documentation: https://umami.is/docs/track-events
 */

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
    };
  }
}

/**
 * Track a custom event with Umami
 * @param eventName - Name of the event (e.g., 'video-play', 'ticket-click')
 * @param eventData - Optional data associated with the event
 */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, string | number | boolean>
): void {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, eventData);
  }
}

/**
 * Track video interaction events
 */
export const trackVideoEvent = {
  play: (videoTitle: string) => {
    trackEvent('video-play', { title: videoTitle });
  },
  view: (videoTitle: string) => {
    trackEvent('video-view', { title: videoTitle });
  },
};

/**
 * Track show-related events
 */
export const trackShowEvent = {
  view: (showTitle: string, showSlug: string) => {
    trackEvent('show-view', { title: showTitle, slug: showSlug });
  },
  ticketClick: (showTitle: string, showSlug: string, ticketUrl: string) => {
    trackEvent('ticket-click', {
      title: showTitle,
      slug: showSlug,
      url: ticketUrl
    });
  },
};

/**
 * Track calendar event interactions
 */
export const trackCalendarEvent = {
  view: (eventTitle: string, eventDate: string) => {
    trackEvent('calendar-event-view', { title: eventTitle, date: eventDate });
  },
  ticketClick: (eventTitle: string, ticketUrl: string) => {
    trackEvent('calendar-ticket-click', { title: eventTitle, url: ticketUrl });
  },
};

/**
 * Track conversion events
 */
export const trackConversion = {
  emailClick: () => {
    trackEvent('email-click');
  },
  socialClick: (platform: string) => {
    trackEvent('social-click', { platform });
  },
  contactFormSubmit: () => {
    trackEvent('contact-form-submit');
  },
  pressKitDownload: () => {
    trackEvent('press-kit-download');
  },
};

/**
 * Track navigation events
 */
export const trackNavigation = {
  languageSwitch: (fromLang: string, toLang: string) => {
    trackEvent('language-switch', { from: fromLang, to: toLang });
  },
  mobileMenuOpen: () => {
    trackEvent('mobile-menu-open');
  },
};
