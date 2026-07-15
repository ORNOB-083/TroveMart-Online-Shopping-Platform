import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import FlashSaleSection from '@/components/FlashSaleSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BecomeSellerSection from '@/components/BecomeSellerSection';
import { getItems } from '@/lib/actions/items';

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
      <TestimonialsSection />
      <BecomeSellerSection />
    </main>
  );
}