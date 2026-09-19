import crypto from "crypto";

export type AnimeStatusDb = "ongoing" | "completed" | "announced";
export type WatchlistStatusDb = "watching" | "completed" | "plan_to_watch";

export interface DbUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  avatarUrl: string | null;
  createdAt: string;
}

export interface DbExternalLink {
  id: string;
  label: string;
  url: string;
  type: "streaming" | "reading";
}

export interface DbAnime {
  id: string;
  slug: string;
  title: string;
  description: string;
  posterUrl: string;
  releaseDate: string;
  studio: string;
  genres: string[];
  status: AnimeStatusDb;
  episodeCount: number | null;
  externalLinks: DbExternalLink[];
}

export interface DbRating {
  animeId: string;
  userId: string;
  value: number; // 1-10
}

export interface DbFavorite {
  animeId: string;
  userId: string;
}

export interface DbWatchlistEntry {
  animeId: string;
  userId: string;
  status: WatchlistStatusDb;
}

export interface DbComment {
  id: string;
  animeId: string;
  userId: string;
  content: string;
  createdAt: string;
}

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

const g = globalThis as unknown as { __animeAzDb?: ReturnType<typeof createDb> };

function createDb() {
  const users: DbUser[] = [
    {
      id: "u1",
      username: "anime_fan_baku",
      email: "demo@animeaz.com",
      passwordHash: hashPassword("demo1234"),
      avatarUrl: null,
      createdAt: "2024-03-01T10:00:00.000Z",
    },
  ];

  const anime: DbAnime[] = [
    {
      id: "a1",
      slug: "naruto",
      title: "Naruto",
      description:
        "Konohagakure kəndinin dovşan ürəkli, lakin nə vaxtsa Hokage olmaq xəyalı ilə yaşayan gənc nindzyası Naruto Uzumakinin dostluq, itki və özünü sübut etmə yolu ilə keçən böyümə hekayəsi.",
      posterUrl: "/images/anime/naruto.jpg",
      releaseDate: "2002-10-03",
      studio: "Studio Pierrot",
      genres: ["Döyüş", "Macəra", "Şonen"],
      status: "completed",
      episodeCount: 220,
      externalLinks: [
        { id: "l1", label: "Crunchyroll-da izlə", url: "https://www.crunchyroll.com", type: "streaming" },
        { id: "l2", label: "Manqanı oxu", url: "https://www.mangaplus.com", type: "reading" },
      ],
    },
    {
      id: "a2",
      slug: "one-piece",
      title: "One Piece",
      description:
        "Monki D. Lufinin ekipajı ilə birlikdə əfsanəvi \"One Piece\" xəzinəsini tapıb Qol Kral olmaq üçün dənizlərdə çıxdığı sonsuz macəra dolu səyahət.",
      posterUrl: "/images/anime/one-piece.jpg",
      releaseDate: "1999-10-20",
      studio: "Toei Animation",
      genres: ["Macəra", "Döyüş", "Fəntəzi"],
      status: "ongoing",
      episodeCount: 1100,
      externalLinks: [
        { id: "l1", label: "Crunchyroll-da izlə", url: "https://www.crunchyroll.com", type: "streaming" },
        { id: "l2", label: "Manqanı oxu", url: "https://www.mangaplus.com", type: "reading" },
      ],
    },
    {
      id: "a3",
      slug: "shingeki-no-kyojin",
      title: "Shingeki no Kyojin (Attack on Titan)",
      description:
        "İnsanları udan nəhəng titanlardan qorunmaq üçün hasarlar arxasında yaşayan bəşəriyyətin son sərhədi dağıldıqdan sonra intiqam və həqiqət axtarışına çıxan Erenin hekayəsi.",
      posterUrl: "/images/anime/shingeki-no-kyojin.jpg",
      releaseDate: "2013-04-07",
      studio: "Wit Studio / MAPPA",
      genres: ["Döyüş", "Dram", "Fəntəzi"],
      status: "completed",
      episodeCount: 87,
      externalLinks: [
        { id: "l1", label: "Crunchyroll-da izlə", url: "https://www.crunchyroll.com", type: "streaming" },
      ],
    },
    {
      id: "a4",
      slug: "death-note",
      title: "Death Note",
      description:
        "Adı yazılan hər kəsi öldürə bilən sirli dəftəri tapan zəkalı tələbə Layt Yaqaminin, dünyanı \"təmizləmək\" istəyi ilə onu ovlayan dahi detektiv L arasındakı psixoloji mübarizə.",
      posterUrl: "/images/anime/death-note.jpg",
      releaseDate: "2006-10-04",
      studio: "Madhouse",
      genres: ["Psixoloji", "Sirr", "Dram"],
      status: "completed",
      episodeCount: 37,
      externalLinks: [
        { id: "l1", label: "Netflix-də izlə", url: "https://www.netflix.com", type: "streaming" },
      ],
    },
    {
      id: "a5",
      slug: "kimetsu-no-yaiba",
      title: "Kimetsu no Yaiba (Demon Slayer)",
      description:
        "Ailəsi iblislər tərəfindən qətlə yetirilən və bacısı Nezuko iblisə çevrilən Tanjironun, onu insana qaytarmaq üçün iblis ovçusu olduğu təsirli səyahəti.",
      posterUrl: "/images/anime/kimetsu-no-yaiba.jpg",
      releaseDate: "2019-04-06",
      studio: "ufotable",
      genres: ["Döyüş", "Fəntəzi", "Dram"],
      status: "ongoing",
      episodeCount: 55,
      externalLinks: [
        { id: "l1", label: "Crunchyroll-da izlə", url: "https://www.crunchyroll.com", type: "streaming" },
      ],
    },
    {
      id: "a6",
      slug: "boku-no-hero-academia",
      title: "Boku no Hero Academia (My Hero Academia)",
      description:
        "Fövqəladə güclərin normal sayıldığı dünyada gücsüz doğulan Izuku Midoriyanın, əfsanəvi qəhrəman All Mightin şagirdi olaraq öz qəhrəmanlıq yolunu qurması.",
      posterUrl: "/images/anime/boku-no-hero-academia.jpg",
      releaseDate: "2016-04-03",
      studio: "Bones",
      genres: ["Şonen", "Döyüş", "Məktəb"],
      status: "ongoing",
      episodeCount: 159,
      externalLinks: [
        { id: "l1", label: "Crunchyroll-da izlə", url: "https://www.crunchyroll.com", type: "streaming" },
      ],
    },
    {
      id: "a7",
      slug: "jujutsu-kaisen",
      title: "Jujutsu Kaisen",
      description:
        "Lənətlənmiş bir əşyanı udaraq güclü lənət ruhu Sukunanın qabına çevrilən Yuji İtadorinin, cadu məktəbində digər lənət ovçuları ilə birlikdə mübarizəsi.",
      posterUrl: "/images/anime/jujutsu-kaisen.jpg",
      releaseDate: "2020-10-03",
      studio: "MAPPA",
      genres: ["Döyüş", "Fəntəzi", "Sirr"],
      status: "ongoing",
      episodeCount: 47,
      externalLinks: [
        { id: "l1", label: "Crunchyroll-da izlə", url: "https://www.crunchyroll.com", type: "streaming" },
      ],
    },
    {
      id: "a8",
      slug: "fullmetal-alchemist-brotherhood",
      title: "Fullmetal Alchemist: Brotherhood",
      description:
        "Anasını geri qaytarmaq üçün qadağan olunmuş kimyaya əl atan Elric qardaşlarının, itirdiklərini bərpa etmək və simya elminin sirlərini açmaq uğrunda apardığı mübarizə.",
      posterUrl: "/images/anime/fullmetal-alchemist-brotherhood.jpg",
      releaseDate: "2009-04-05",
      studio: "Bones",
      genres: ["Macəra", "Dram", "Fəntəzi"],
      status: "completed",
      episodeCount: 64,
      externalLinks: [
        { id: "l1", label: "Netflix-də izlə", url: "https://www.netflix.com", type: "streaming" },
      ],
    },
    {
      id: "a9",
      slug: "tokyo-ghoul",
      title: "Tokyo Ghoul",
      description:
        "Adi bir tələbə ikən qulyabani hücumundan sonra yarı-insan yarı-qulyabaniyə çevrilən Kaneki Kenin, iki dünya arasında öz kimliyini axtarması.",
      posterUrl: "/images/anime/tokyo-ghoul.jpg",
      releaseDate: "2014-07-04",
      studio: "Studio Pierrot",
      genres: ["Psixoloji", "Dram", "Sirr"],
      status: "completed",
      episodeCount: 12,
      externalLinks: [
        { id: "l1", label: "Crunchyroll-da izlə", url: "https://www.crunchyroll.com", type: "streaming" },
      ],
    },
    {
      id: "a10",
      slug: "hunter-x-hunter",
      title: "Hunter x Hunter",
      description:
        "Atasının izi ilə dünyanın ən yaxşı Hunter-lərindən biri olmaq istəyən gənc Gon Freeksin dostları ilə birlikdə keçdiyi sınaqlar və macəralar dolu yol.",
      posterUrl: "/images/anime/hunter-x-hunter.webp",
      releaseDate: "2011-10-02",
      studio: "Madhouse",
      genres: ["Macəra", "Döyüş", "Şonen"],
      status: "completed",
      episodeCount: 148,
      externalLinks: [
        { id: "l1", label: "Netflix-də izlə", url: "https://www.netflix.com", type: "streaming" },
      ],
    },
    {
      id: "a11",
      slug: "dragon-ball-z",
      title: "Dragon Ball Z",
      description:
        "Yerin qorunması üçün fövqəladə güclü düşmənlərə qarşı çıxan Son Qokunun və dostlarının davamlı təkmilləşmə və döyüş dolu əfsanəvi mübarizəsi.",
      posterUrl: "/images/anime/dragon-ball-z.jpg",
      releaseDate: "1989-04-26",
      studio: "Toei Animation",
      genres: ["Döyüş", "Macəra", "Fəntəzi"],
      status: "completed",
      episodeCount: 291,
      externalLinks: [
        { id: "l1", label: "Crunchyroll-da izlə", url: "https://www.crunchyroll.com", type: "streaming" },
      ],
    },
    {
      id: "a12",
      slug: "one-punch-man",
      title: "One Punch Man",
      description:
        "Bir zərbə ilə istənilən düşməni məğlub edən, lakin bu qədər güclü olmaqdan cansıxıcılıq yaşayan qəhrəman Saitamanın tanınmaq uğrunda gülməli mübarizəsi.",
      posterUrl: "/images/anime/one-punch-man.jpg",
      releaseDate: "2015-10-05",
      studio: "Madhouse",
      genres: ["Komediya", "Döyüş", "Şonen"],
      status: "completed",
      episodeCount: 24,
      externalLinks: [
        { id: "l1", label: "Netflix-də izlə", url: "https://www.netflix.com", type: "streaming" },
      ],
    },
    {
      id: "a13",
      slug: "spy-x-family",
      title: "Spy X Family",
      description:
        "Gizli agent, qatil və telepat qızın təsadüfən bir ailə qurub bir-birlərindən əsl kimliklərini gizlətdiyi, istilik dolu komediya dolu casusluq hekayəsi.",
      posterUrl: "/images/anime/spy-x-family.jpg",
      releaseDate: "2022-04-09",
      studio: "Wit Studio / CloverWorks",
      genres: ["Komediya", "Macəra", "Dram"],
      status: "ongoing",
      episodeCount: 37,
      externalLinks: [
        { id: "l1", label: "Crunchyroll-da izlə", url: "https://www.crunchyroll.com", type: "streaming" },
      ],
    },
    {
      id: "a14",
      slug: "chainsaw-man",
      title: "Chainsaw Man",
      description:
        "Borclarını ödəmək üçün cəngəl itini şeytanlarla döyüşdürən yoxsul gənc Denjinin, öz şeytanı Pochita ilə birləşərək Chainsaw Man-ə çevrildikdən sonrakı qanlı mübarizəsi.",
      posterUrl: "/images/anime/chainsaw-man.jpg",
      releaseDate: "2022-10-12",
      studio: "MAPPA",
      genres: ["Döyüş", "Dram", "Fəntəzi"],
      status: "completed",
      episodeCount: 12,
      externalLinks: [
        { id: "l1", label: "Crunchyroll-da izlə", url: "https://www.crunchyroll.com", type: "streaming" },
      ],
    },
    {
      id: "a15",
      slug: "mob-psycho-100",
      title: "Mob Psycho 100",
      description:
        "Nəhəng ekstrasens güclərinə sahib, lakin sakit həyat sürmək istəyən orta məktəbli Şigeo \"Mob\" Kageyamanın, hisslərini idarə edərək özünü tapmağa çalışması.",
      posterUrl: "/images/anime/mob-psycho-100.jpg",
      releaseDate: "2016-07-11",
      studio: "Bones",
      genres: ["Fövqəladə güclər", "Komediya", "Dram"],
      status: "completed",
      episodeCount: 37,
      externalLinks: [
        { id: "l1", label: "Crunchyroll-da izlə", url: "https://www.crunchyroll.com", type: "streaming" },
      ],
    },
    {
      id: "a16",
      slug: "steins-gate",
      title: "Steins;Gate",
      description:
        "Təsadüfən vaxtda səyahət etməyə imkan verən mikrodalğalı sobanı icad edən eksentrik alim Okabe Rintarunun, kiçik dəyişikliklərin nəhəng nəticələr doğurduğunu kəşf etməsi.",
      posterUrl: "/images/anime/steins-gate.jpg",
      releaseDate: "2011-04-06",
      studio: "White Fox",
      genres: ["Sirr", "Dram", "Fəntəzi"],
      status: "completed",
      episodeCount: 24,
      externalLinks: [
        { id: "l1", label: "Netflix-də izlə", url: "https://www.netflix.com", type: "streaming" },
      ],
    },
  ];

  const ratings: DbRating[] = [
    { animeId: "a1", userId: "seed1", value: 9 },
    { animeId: "a1", userId: "seed2", value: 8 },
    { animeId: "a2", userId: "seed1", value: 10 },
    { animeId: "a2", userId: "seed2", value: 9 },
    { animeId: "a3", userId: "seed1", value: 9 },
    { animeId: "a3", userId: "seed2", value: 10 },
    { animeId: "a4", userId: "seed1", value: 10 },
    { animeId: "a5", userId: "seed1", value: 9 },
    { animeId: "a6", userId: "seed1", value: 8 },
    { animeId: "a7", userId: "seed1", value: 9 },
    { animeId: "a8", userId: "seed1", value: 10 },
    { animeId: "a9", userId: "seed1", value: 8 },
    { animeId: "a10", userId: "seed1", value: 9 },
    { animeId: "a11", userId: "seed1", value: 8 },
    { animeId: "a12", userId: "seed1", value: 9 },
    { animeId: "a13", userId: "seed1", value: 9 },
    { animeId: "a14", userId: "seed1", value: 8 },
    { animeId: "a15", userId: "seed1", value: 9 },
    { animeId: "a16", userId: "seed1", value: 9 },
  ];

  const favorites: DbFavorite[] = [
    { animeId: "a1", userId: "u1" },
    { animeId: "a7", userId: "u1" },
  ];

  const watchlist: DbWatchlistEntry[] = [
    { animeId: "a2", userId: "u1", status: "watching" },
    { animeId: "a4", userId: "u1", status: "completed" },
    { animeId: "a5", userId: "u1", status: "plan_to_watch" },
  ];

  const comments: DbComment[] = [
    {
      id: "c1",
      animeId: "a1",
      userId: "u1",
      content: "Naruto-nu izləməyə başlayanda bilmirdim bu qədər emosional olacaq, xüsusilə son fəsillər inanılmazdır.",
      createdAt: "2024-05-10T14:30:00.000Z",
    },
    {
      id: "c2",
      animeId: "a1",
      userId: "seed1",
      content: "Animasiya keyfiyyəti köhnə seriyalar üçün çox yaxşıdır, amma bəzi hissələr uzadılıb.",
      createdAt: "2024-05-11T09:15:00.000Z",
    },
    {
      id: "c3",
      animeId: "a4",
      userId: "u1",
      content: "Layt və L arasındakı zəka döyüşü animedə gördüyüm ən yaxşı psixoloji mübarizədir.",
      createdAt: "2024-06-02T20:00:00.000Z",
    },
  ];

  return { users, anime, ratings, favorites, watchlist, comments };
}

export const db = g.__animeAzDb ?? (g.__animeAzDb = createDb());

export function hashPasswordValue(password: string) {
  return hashPassword(password);
}
