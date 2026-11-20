export const projectCategories = [
  {
    slug: "design",
    label: { en: "Engineering Design", ar: "التصميم الهندسي" },
  },
  { slug: "safety", label: { en: "Safety & Fire", ar: "السلامة والإطفاء" } },
  { slug: "surveying", label: { en: "Surveying", ar: "المساحة" } },
  { slug: "delivery", label: { en: "Project Delivery", ar: "تسليم المشاريع" } },
] as const;

export type ProjectCategorySlug = (typeof projectCategories)[number]["slug"];

export interface ProjectImage {
  src: string;
  alt: { en: string; ar: string };
}

export interface Project {
  slug: string;
  title: { en: string; ar: string };
  category: ProjectCategorySlug;
  location: { en: string; ar: string };
  coverImage: string;
  summary: { en: string; ar: string };
  description: { en: string; ar: string };
  services: string[];
  gallery: ProjectImage[];
}

/**
 * Only projects confirmed through Black Cube's official public channels are
 * published here. Additional projects should be added once their details and
 * imagery are verified with the company.
 */
export const projects: Project[] = [
  {
    slug: "tower-al-qadiri",
    title: { en: "Tower Al-Qadiri", ar: "برج القديري" },
    category: "design",
    location: {
      en: "King Salman Road, Riyadh",
      ar: "طريق الملك سلمان، الرياض",
    },
    coverImage: "/images/projects/tower-al-qadiri.svg",
    summary: {
      en: "An engineering design project where the idea begins with a single line and becomes a landmark on King Salman Road.",
      ar: "مشروع تصميم هندسي تبدأ فكرته بخط واحد، ليصبح معلماً على طريق الملك سلمان.",
    },
    description: {
      en: "Tower Al-Qadiri is one of Black Cube's engineering design works on King Salman Road in Riyadh. The project reflects the practice's approach of carrying a vision from design through to execution, where architectural intent and engineering precision meet in every detail.",
      ar: "يُعد برج القديري من أعمال بلاك كيوب في التصميمات الهندسية على طريق الملك سلمان بالرياض. ويعكس المشروع منهجية الشركة في نقل الرؤية من التصميم إلى التنفيذ، حيث تلتقي الرؤية المعمارية بالدقة الهندسية في كل تفصيلة.",
    },
    services: ["engineering-design", "engineering-consultancy"],
    gallery: [
      {
        src: "/images/projects/tower-al-qadiri-01.svg",
        alt: {
          en: "Tower Al-Qadiri — architectural study",
          ar: "برج القديري — دراسة معمارية",
        },
      },
      {
        src: "/images/projects/tower-al-qadiri-02.svg",
        alt: {
          en: "Tower Al-Qadiri — engineering detail",
          ar: "برج القديري — تفصيلة هندسية",
        },
      },
    ],
  },
  {
    slug: "oasis-tower",
    title: { en: "Oasis Tower", ar: "برج واحات" },
    category: "design",
    location: {
      en: "King Fahd Road, Al Mulqa, Riyadh",
      ar: "طريق الملك فهد، الملقا، الرياض",
    },
    coverImage: "/images/projects/oasis-tower.svg",
    summary: {
      en: "A tower where a bold cubic design is combined with smart green spaces on every floor.",
      ar: "برج يجمع بين التصميم المكعبي الجريء ومساحات خضراء ذكية في كل طابق.",
    },
    description: {
      en: "Located on King Fahd Road in the Al Mulqa district of northern Riyadh, Oasis Tower combines a bold cubic architectural language with green spaces integrated into each floor. The project expresses Black Cube's approach to pairing architectural identity with functional, considered environments.",
      ar: "يقع برج واحات على طريق الملك فهد بحي الملقا في شمال الرياض، ويجمع بين لغة معمارية مكعبة جريئة ومساحات خضراء مدمجة في كل طابق. ويعبر المشروع عن منهج بلاك كيوب في الجمع بين الهوية المعمارية والبيئات الوظيفية المدروسة.",
    },
    services: ["engineering-design", "engineering-consultancy"],
    gallery: [
      {
        src: "/images/projects/oasis-tower-01.svg",
        alt: {
          en: "Oasis Tower — cubic massing study",
          ar: "برج واحات — دراسة الكتل المكعبة",
        },
      },
      {
        src: "/images/projects/oasis-tower-02.svg",
        alt: {
          en: "Oasis Tower — terraces and green spaces",
          ar: "برج واحات — التراسات والمساحات الخضراء",
        },
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectCategory(slug: ProjectCategorySlug) {
  return projectCategories.find((category) => category.slug === slug);
}

export function getProjectTitleBySlug(
  slug: string,
  locale: "en" | "ar",
): string | undefined {
  return projects.find((project) => project.slug === slug)?.title[locale];
}
