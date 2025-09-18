import { HeroSection } from "@/src/components/HeroSection.jsx";
import { NewArrivals } from "@/src/components/NewArrivals.jsx";
import { InstagramFeed } from "@/src/components/InstagramFeed.jsx";
import { WhyChooseUs } from "@/src/components/Whychooseus.jsx";
import { ComingSoon } from "@/src/components/CommingSoon.jsx";
import { ProductList } from "@/src/components/ProductList.jsx";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <NewArrivals />
      <InstagramFeed />
      <ProductList />
      <WhyChooseUs />
      <ComingSoon />
    </main>
  );
}
