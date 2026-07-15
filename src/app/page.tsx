import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import FlashSaleSection from '@/components/FlashSaleSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BecomeSellerSection from '@/components/BecomeSellerSection';
import { getItems } from '@/lib/actions/items';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import FaqSection from '@/components/FaqSection';

export default async function Home() {
  const { items } = await getItems({
    limit: 8,
    sort: 'newest',
  });

  return (
    <main>
      <HeroSection />
      <FlashSaleSection items={items} />
      <CategorySection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <FaqSection />
      <BecomeSellerSection />
    </main>
  );
}