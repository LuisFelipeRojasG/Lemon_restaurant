import type { JSX } from 'react'
import { HeroSection } from '../components/HeroSection'
import { Highlights } from '../components/Highlights'
import { AboutHome } from '../components/AboutHome'
import { Testimonials } from '../components/Testimonials'

export const Home = (): JSX.Element => {
  return (
    <div>
      <HeroSection />
      <Highlights />
      <AboutHome />
      <Testimonials />
    </div>
  );
}