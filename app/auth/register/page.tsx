import { MovableRegisterSection } from "@/components/auth/MovableRegisterSection";

export const metadata = { title: "Qeydiyyat — Anime Azərbaycan" };

export default function RegisterPage() {
  return (
    <div
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('https://4kwallpapers.com/images/walls/thumbs_3t/20184.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/78 to-bg/30" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,183,202,0.2),transparent_34%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center px-4 py-12 sm:px-6 lg:justify-end lg:px-8">
        <MovableRegisterSection />
      </div>
    </div>
  );
}
