import {
  Building2,
  ClipboardCheck,
  Flame,
  Lightbulb,
  Ruler,
  Shield,
  type LucideIcon,
} from "lucide-react";

export const serviceCategories = [
  {
    slug: "design",
    label: { en: "Design & Consultancy", ar: "التصميم والاستشارات" },
  },
  {
    slug: "safety",
    label: { en: "Safety & Protection", ar: "السلامة والحماية" },
  },
  { slug: "surveying", label: { en: "Surveying", ar: "المساحة" } },
  {
    slug: "delivery",
    label: { en: "Management & Delivery", ar: "الإدارة والتسليم" },
  },
] as const;

export type ServiceCategorySlug = (typeof serviceCategories)[number]["slug"];

export interface ServiceCapability {
  en: string;
  ar: string;
}

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  category: ServiceCategorySlug;
  coverImage: string;
  details: { en: string; ar: string };
  capabilities: ServiceCapability[];
  relatedProjects: string[];
}

/**
 * The six consultancy services published on Black Cube's official website.
 * Descriptions stay at the level of the discipline; project-specific scope is
 * confirmed with the client before publication.
 */
export const services: Service[] = [
  {
    slug: "engineering-design",
    icon: Building2,
    title: {
      en: "Engineering & Architectural Design",
      ar: "التصميمات الهندسية",
    },
    description: {
      en: "Integrated engineering design that translates architectural intent into technically rigorous, buildable solutions.",
      ar: "تصميم هندسي متكامل يحوّل الرؤية المعمارية إلى حلول دقيقة وقابلة للتنفيذ.",
    },
    category: "design",
    coverImage: "/images/services/engineering-design.svg",
    details: {
      en: "Our design practice begins with a clear reading of the brief and develops into a coordinated design where structure, services, environment and function are resolved together. Deliverables are supported by analysis and technical review before they reach site.",
      ar: "تبدأ ممارستنا التصميمية بقراءة واضحة لمتطلبات المشروع، ثم تتطور إلى تصميم منسّق تُحلّ فيه البنية والخدمات والبيئة والوظيفة معاً. وتدعم التحليلات والمراجعات التقنية مخرجات التصميم قبل وصولها إلى الموقع.",
    },
    capabilities: [
      { en: "Architectural design", ar: "التصميم المعماري" },
      { en: "Structural coordination", ar: "تنسيق إنشائي" },
      { en: "Design development", ar: "تطوير التصميم" },
      { en: "Technical review", ar: "مراجعة تقنية" },
    ],
    relatedProjects: ["tower-al-qadiri", "oasis-tower"],
  },
  {
    slug: "safety-engineering",
    icon: Shield,
    title: { en: "Occupational Safety", ar: "السلامة المهنية" },
    description: {
      en: "Occupational safety engineering embedded into design, assessment and delivery — not appended after the fact.",
      ar: "هندسة السلامة المهنية مدمجة في التصميم والتقييم والتسليم، لا مضافة بعد اكتمال العمل.",
    },
    category: "safety",
    coverImage: "/images/services/safety-engineering.svg",
    details: {
      en: "We identify hazards, assess risk and define control strategies within the engineering brief, coordinating safety requirements with design and delivery teams so that protection is designed in from the start.",
      ar: "نحدد المخاطر ونقيّمها ونضع استراتيجيات التحكم ضمن متطلبات المشروع، مع تنسيق اشتراطات السلامة مع فرق التصميم والتسليم لتكون الحماية جزءاً من التصميم منذ البداية.",
    },
    capabilities: [
      { en: "Hazard identification", ar: "تحديد المخاطر" },
      { en: "Risk assessment", ar: "تقييم المخاطر" },
      { en: "Control strategies", ar: "استراتيجيات التحكم" },
      { en: "Safety coordination", ar: "تنسيق السلامة" },
    ],
    relatedProjects: [],
  },
  {
    slug: "project-management",
    icon: ClipboardCheck,
    title: { en: "Project Management", ar: "إدارة المشاريع" },
    description: {
      en: "Disciplined coordination of engineering scope, milestones and delivery responsibilities.",
      ar: "تنسيق منضبط لنطاق العمل الهندسي ومعالم المشروع ومسؤوليات التسليم.",
    },
    category: "delivery",
    coverImage: "/images/services/project-management.svg",
    details: {
      en: "Project management keeps the engineering intent intact through planning, coordination and review. We track scope, milestones and interfaces so that decisions are made with the full picture in view.",
      ar: "تحافظ إدارة المشاريع على سلامة القصد الهندسي عبر التخطيط والتنسيق والمراجعة. نتتبع النطاق والمعالم ونقاط التداخل لتُتخذ القرارات بصورة شاملة.",
    },
    capabilities: [
      { en: "Scope control", ar: "ضبط النطاق" },
      { en: "Milestone tracking", ar: "تتبع المعالم" },
      { en: "Interface coordination", ar: "تنسيق التداخلات" },
      { en: "Progress reporting", ar: "تقارير التقدم" },
    ],
    relatedProjects: [],
  },
  {
    slug: "fire-protection",
    icon: Flame,
    title: {
      en: "Fire Alarm & Protection Systems",
      ar: "أنظمة الإنذار والإطفاء",
    },
    description: {
      en: "Fire protection consultancy for detection, suppression and life-safety strategy.",
      ar: "استشارات هندسية لأنظمة الإنذار والإطفاء تشمل الكشف والإخماد واستراتيجية سلامة الأرواح.",
    },
    category: "safety",
    coverImage: "/images/services/fire-protection.svg",
    details: {
      en: "Fire protection engineering addresses detection, alarm, suppression and evacuation strategy as one coordinated system, reviewed against the project's use, risk profile and applicable requirements.",
      ar: "تتعامل هندسة الحماية من الحريق مع الكشف والإنذار والإخماد واستراتيجية الإخلاء كمنظومة واحدة منسقة، تُراجع وفق استخدام المشروع وطبيعة مخاطره والاشتراطات المعتمدة.",
    },
    capabilities: [
      { en: "Detection & alarm", ar: "الكشف والإنذار" },
      { en: "Suppression strategy", ar: "استراتيجية الإخماد" },
      { en: "Life safety", ar: "سلامة الأرواح" },
      { en: "System coordination", ar: "تنسيق الأنظمة" },
    ],
    relatedProjects: [],
  },
  {
    slug: "surveying",
    icon: Ruler,
    title: { en: "Surveying & Land Measurement", ar: "المساحة والرفع المساحي" },
    description: {
      en: "Accurate site and land data supporting engineering design, assessment and delivery.",
      ar: "بيانات دقيقة للموقع والأرض تدعم التصميم الهندسي والتقييم والتسليم.",
    },
    category: "surveying",
    coverImage: "/images/services/surveying.svg",
    details: {
      en: "Surveying establishes a reliable geometric basis for design. We provide site and land measurement data that design teams can build on, reducing assumptions and coordination risk.",
      ar: "توفر المساحة أساساً هندسياً موثوقاً للتصميم. نقدم بيانات قياس للموقع والأرض يمكن لفرق التصميم البناء عليها، بما يقلل الافتراضات ومخاطر التنسيق.",
    },
    capabilities: [
      { en: "Topographic survey", ar: "الرفع الطبوغرافي" },
      { en: "Land measurement", ar: "قياس الأراضي" },
      { en: "Setting out data", ar: "بيانات التوقيع" },
      { en: "Design integration", ar: "تكامل مع التصميم" },
    ],
    relatedProjects: [],
  },
  {
    slug: "engineering-consultancy",
    icon: Lightbulb,
    title: { en: "Engineering Consultancy", ar: "الاستشارات الهندسية" },
    description: {
      en: "Cross-disciplinary engineering advice for complex built-environment challenges.",
      ar: "استشارات هندسية متعددة التخصصات لمعالجة تحديات البيئة المبنية المعقدة.",
    },
    category: "design",
    coverImage: "/images/services/engineering-consultancy.svg",
    details: {
      en: "Our consultancy brings design, safety, surveying and delivery expertise together to advise on complex requirements, resolve conflicts between disciplines and define a clear route from ambition to execution.",
      ar: "تجمع استشاراتنا خبرات التصميم والسلامة والمساحة والتسليم لتقديم المشورة في المتطلبات المعقدة، وحل التعارضات بين التخصصات، وتحديد مسار واضح من الطموح إلى التنفيذ.",
    },
    capabilities: [
      { en: "Brief analysis", ar: "تحليل المتطلبات" },
      { en: "Feasibility advice", ar: "مشورة الجدوى" },
      { en: "Solution definition", ar: "تحديد الحل" },
      { en: "Delivery strategy", ar: "استراتيجية التسليم" },
    ],
    relatedProjects: ["tower-al-qadiri", "oasis-tower"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesByCategory(
  category: ServiceCategorySlug,
): Service[] {
  return services.filter((service) => service.category === category);
}

export function getServiceCategory(slug: ServiceCategorySlug) {
  return serviceCategories.find((category) => category.slug === slug);
}
