import HeroSection from '@/components/home/HeroSection'
import Marquee from '@/components/home/Marquee'
import AboutSection from '@/components/home/AboutSection'
import CalendarSection from '@/components/home/CalendarSection'
import ReviewsSection from '@/components/home/ReviewsSection'

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
