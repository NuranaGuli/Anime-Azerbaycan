import Image from "next/image";
import { MovableLoginSection } from "@/components/auth/MovableLoginSection";

export const metadata = { title: "Giriş — Anime Azərbaycan" };

export default function LoginPage() {
  return (
  <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
  <Image
    src="https://4kwallpapers.com/images/walls/thumbs_3t/26029.jpg"
    alt=""
    aria-hidden="true"
    fill
    priority
    sizes="100vw"
    className="object-cover object-center"
  />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/35" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(255,143,175,0.18),transparent_34%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <MovableLoginSection />
      </div>
    </div>
  );
}
