import HeroSection from "@/components/home/HeroSection";
import Marquee from "@/components/home/Marquee";
import AboutSection from "@/components/home/AboutSection";
import CalendarSection from "@/components/home/CalendarSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import { fetchFeaturedReviews, fetchAboutCarouselImages } from "@/sanity/lib/queries";

export default async function Home() {
  const [reviews, carouselImages] = await Promise.all([
    fetchFeaturedReviews(),
    fetchAboutCarouselImages(),
  ]);

  return (
    <main>
      <HeroSection />
      <Marquee pageName="home" sticky={false} />
      <AboutSection carouselImages={carouselImages} />
      <CalendarSection />
      <ReviewsSection reviews={reviews} />
    </main>
  );
}
