import BecomeSellerSection from "@/components/BecomeSellerSection";
import CategorySection from "@/components/CategorySection";
import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <CategorySection />

      <BecomeSellerSection />
      <TestimonialsSection />
    </div>
  );
}
