import { AnimeHero } from "@/components/anime/AnimeHero";
import { PopularSection } from "@/components/home/HomeSections";
import { RecentSection } from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <AnimeHero />
      <PopularSection />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border" />
      </div>
      <RecentSection />
    </>
  );
}
