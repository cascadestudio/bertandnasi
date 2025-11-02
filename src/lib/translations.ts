import { Locale } from "./locale";
import { TypedObject } from "sanity";

/**
 * Gets localized text based on locale
 * Falls back to English if French text is not provided
 */
export function getLocalizedText(
  enText: string,
  frText: string | undefined | null,
  locale: Locale
): string {
  if (locale === "fr" && frText) {
    return frText;
  }
  return enText;
}

/**
 * Gets localized block content (for Sanity portable text)
 * Falls back to English if French content is not provided
 */
export function getLocalizedBlockContent(
  enContent: TypedObject[] | undefined,
  frContent: TypedObject[] | undefined | null,
  locale: Locale
): TypedObject[] | undefined {
  if (locale === "fr" && frContent && frContent.length > 0) {
    return frContent;
  }
  return enContent;
}

/**
 * Navigation labels
 */
export const navLabels = {
  calendar: { en: "Calendar", fr: "Calendrier" },
  shows: { en: "Shows", fr: "Spectacles" },
  videos: { en: "Videos", fr: "Vidéos" },
  about: { en: "About", fr: "À propos" },
};

/**
 * Common UI labels
 */
export const uiLabels = {
  seeMore: { en: "See more", fr: "Voir plus" },
  contactUs: { en: "Contact us", fr: "Contactez-nous" },
  followUs: { en: "Follow us", fr: "Suivez-nous" },
  legalNotice: { en: "Legal notice", fr: "Mentions légales" },
  websiteBy: {
    en: "Website by Cascade studio",
    fr: "Site web fait par le studio Cascade",
  },
  year: { en: "Year", fr: "Année" },
  credits: { en: "Credits", fr: "Crédits" },
  collaborators: { en: "Collaborators", fr: "Collaborateurs" },
  reviews: { en: "Reviews", fr: "Critiques" },
  trailer: { en: "Trailer", fr: "Bande-annonce" },
  imageGallery: { en: "Image Gallery", fr: "Galerie d'images" },
};

/**
 * Video category labels
 */
export const videoCategoryLabels = {
  "online-content": { en: "Online Content", fr: "Contenu en ligne" },
  trailers: { en: "Trailers", fr: "Bandes-annonces" },
  "short-films": { en: "Short Films", fr: "Courts-métrages" },
};

/**
 * Helper to get label based on locale
 */
export function getLabel(
  labels: { en: string; fr: string },
  locale: Locale
): string {
  return locale === "fr" ? labels.fr : labels.en;
}
