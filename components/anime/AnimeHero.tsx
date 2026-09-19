import Image from "next/image";
import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SakuraPetals } from "@/components/decor/SakuraPetals";
import { posterFocus } from "@/lib/posterFocus";

const FLOATING_POSTERS = [
  { slug: "naruto", src: "/images/anime/naruto.jpg" },
  { slug: "kimetsu-no-yaiba", src: "/images/anime/kimetsu-no-yaiba.jpg" },
  { slug: "jujutsu-kaisen", src: "/images/anime/jujutsu-kaisen.jpg" },
];

export function AnimeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-hero-glow">
      <SakuraPetals />

      <div
        className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-float-slow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 top-32 h-72 w-72 rounded-full bg-secondary/10 blur-3xl animate-float-slow-reverse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-accent/10 blur-3xl animate-float-slow"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Azərbaycandilli anime icması
          </span>

          <h1
            className="animate-fade-in-up max-w-2xl font-display text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Sevdiyin anime-ləri kəşf et,{" "}
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              qiymətləndir
            </span>
            , icma ilə paylaş
          </h1>
          
          <div className="animate-fade-in-up flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
            <Link href="/anime">
              <Button size="lg">
                <Compass className="h-5 w-5" />
                Anime-ləri kəşf et
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline">
                Qeydiyyatdan keç
              </Button>
            </Link>
          </div>
        </div>

        {}
        <div className="relative hidden h-[30rem] w-[22rem] shrink-0 items-center justify-center lg:flex">
          {FLOATING_POSTERS.map((poster, index) => {
            const positions = [
              "left-2 top-4 h-32 w-24 -rotate-12 animate-float-slow",
              "right-0 top-16 h-36 w-28 rotate-6 animate-float-slow-reverse",
              "left-10 bottom-2 h-32 w-24 rotate-3 animate-float-slow",
            ];
            return (
              <div
                key={poster.slug}
                className={`absolute overflow-hidden rounded-xl border border-border shadow-2xl shadow-black/40 ${positions[index]}`}
                style={{ animationDelay: `${index * 700}ms` }}
              >
                <Image
                  src={poster.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="140px"
                  quality={85}
                  style={{ objectPosition: posterFocus(poster.slug) }}
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
