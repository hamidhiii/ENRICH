'use client';

import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import ProductsPreview from '@/components/home/ProductsPreview';
import Statistics from '@/components/home/Statistics';
import NewsSection from '@/components/home/NewsSection';

export default function Home() {
  return (
    <div className="">
      <Hero />
      <AboutSection />
      <ProductsPreview />
      <Statistics />
      <NewsSection />
    </div>
  );
}
