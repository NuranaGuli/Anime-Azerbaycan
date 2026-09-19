export const POSTER_FOCUS: Record<string, string> = {
  naruto: "50% 12%",
  "one-piece": "50% 18%",
  "shingeki-no-kyojin": "50% 15%",
  "death-note": "50% 20%",
  "kimetsu-no-yaiba": "50% 12%",
  "boku-no-hero-academia": "50% 15%",
  "jujutsu-kaisen": "50% 12%",
  "chainsaw-man": "50% 15%",
};

export function posterFocus(slug: string): string {
  return POSTER_FOCUS[slug] ?? "50% 50%";
}
