'use client';

import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import ProductsPreview from '@/components/home/ProductsPreview';
import Statistics from '@/components/home/Statistics';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  return (
    <div className="pt-32">
      <Hero />
      <AboutSection />
      <ProductsPreview />
      <Statistics />
      <Testimonials />
    </div>
  );
}
