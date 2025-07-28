import { HeroSection } from "@/src/components/HeroSection.jsx";
import { NewArrivals } from "@/src/components/NewArrivals.jsx";
import { InstagramFeed } from "@/src/components/InstagramFeed.jsx";
import { WhyChooseUs } from "@/src/components/Whychooseus.jsx";
import { ComingSoon } from "@/src/components/CommingSoon.jsx";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <NewArrivals />
      <InstagramFeed />
      <WhyChooseUs />
      <ComingSoon />
    </main>
  );
}
