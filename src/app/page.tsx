import HeroSection from '@/components/HeroSection'
import Marquee from '@/components/Marquee'
import AboutSection from '@/components/AboutSection'
import CalendarSection from '@/components/CalendarSection'
import ReviewsSection from '@/components/ReviewsSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Marquee />
      <AboutSection />
      <CalendarSection />
      <ReviewsSection />
    </main>
  )
}
