export interface NewsItem {
  slug: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  source: string;
  date: string;
  href: string;
  image: string;
}

/**
 * Publicly attributed coverage featured by Black Cube. New insights can be
 * added here; entries link back to the company's official channels.
 */
export const news: NewsItem[] = [
  {
    slug: "think-marketing-feature",
    title: {
      en: "Black Cube: engineering consultancy in Riyadh",
      ar: "بلاك كيوب: استشارات هندسية في الرياض",
    },
    excerpt: {
      en: "A profile of Black Cube's integrated engineering consultancy, combining technical expertise, precision in implementation and a commitment to safety and quality.",
      ar: "تعريف ببلاك كيوب للاستشارات الهندسية المتكاملة، التي تجمع بين الخبرة التقنية والدقة في التنفيذ والالتزام بالسلامة والجودة.",
    },
    source: "Think Marketing Magazine",
    date: "2025-07-12",
    href: "https://blackcubeksa.com",
    image: "/images/news/news-01.svg",
  },
  {
    slug: "engineering-consultant-riyadh",
    title: {
      en: "Engineering consultancy, rooted in Riyadh",
      ar: "استشارات هندسية من قلب الرياض",
    },
    excerpt: {
      en: "Black Cube's practice statement: integrated and distinguished engineering consultancy, delivered by a group of professional engineers.",
      ar: "بيان ممارسة بلاك كيوب: استشارات هندسية متكاملة ومتميزة يقدمها فريق من المهندسين المحترفين.",
    },
    source: "Black Cube",
    date: "2025-04-07",
    href: "https://blackcubeksa.com",
    image: "/images/news/news-02.svg",
  },
  {
    slug: "the-glocal-coverage",
    title: {
      en: "Integrated engineering, in the regional press",
      ar: "الهندسة المتكاملة في الصحافة الإقليمية",
    },
    excerpt: {
      en: "Regional coverage of Black Cube's engineering consultancy and its approach to safety, quality and precision.",
      ar: "تغطية إقليمية لاستشارات بلاك كيوب الهندسية ومنهجها في السلامة والجودة والدقة.",
    },
    source: "The Glocal",
    date: "2020-03-05",
    href: "https://blackcubeksa.com",
    image: "/images/news/news-03.svg",
  },
  {
    slug: "leaders-mena-coverage",
    title: {
      en: "A consultancy built on professional trust",
      ar: "استشارة مبنية على الثقة المهنية",
    },
    excerpt: {
      en: "Leaders MENA features Black Cube's commitment to technical expertise and long-term client relationships.",
      ar: "تسلط Leaders MENA الضوء على التزام بلاك كيوب بالخبرة التقنية وعلاقات العملاء طويلة الأمد.",
    },
    source: "Leaders MENA",
    date: "2020-02-13",
    href: "https://blackcubeksa.com",
    image: "/images/news/news-01.svg",
  },
];

export function getNewsItemBySlug(slug: string): NewsItem | undefined {
  return news.find((item) => item.slug === slug);
}
