import {
  FaRobot,
  FaChartLine,
  FaHeartbeat,
  FaPlane,
  FaGraduationCap,
  FaDollarSign,
  FaLaptopCode,
} from "react-icons/fa";

const categories = {
  // ==========================================
  // TECHNOLOGY & AI
  // URL: /category/technology-ai
  // ==========================================

  "technology-ai": {
    slug: "technology-ai",
    name: "Technology & AI",
    shortName: "Technology",
    icon: FaRobot,

    description:
      "Explore the latest technology, artificial intelligence, software, gadgets, digital innovation, and emerging trends shaping the modern world.",

    intro:
      "Explore technology, artificial intelligence, software, gadgets, and emerging digital trends on IndiBlogHub. This category brings together practical insights, expert perspectives, and continuously published content designed to help readers understand the rapidly changing technology landscape.",

    subcategories: [
      {
        title: "Artificial Intelligence",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Technology Trends",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Gadgets & Devices",
        image:
          "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Software & Apps",
        image:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },

  // ==========================================
  // DIGITAL MARKETING
  // URL: /category/digital-marketing
  // ==========================================

  "digital-marketing": {
    slug: "digital-marketing",
    name: "Digital Marketing",
    shortName: "Digital Marketing",
    icon: FaChartLine,

    description:
      "Discover practical digital marketing strategies covering SEO, social media, content marketing, branding, analytics, and online growth.",

    intro:
      "Explore digital marketing guides, strategies, and practical resources covering SEO, social media, content marketing, branding, and online growth. Discover actionable insights designed for creators, businesses, and marketers.",

    subcategories: [
      {
        title: "SEO & Search",
        image:
          "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Social Media",
        image:
          "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Content Marketing",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Analytics & Growth",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },

  // ==========================================
  // HEALTH & WELLNESS
  // URL: /category/health-wellness
  // ==========================================

  "health-wellness": {
    slug: "health-wellness",
    name: "Health & Wellness",
    shortName: "Health",
    icon: FaHeartbeat,

    description:
      "Read useful content about wellness, fitness, healthy living, nutrition, mental well-being, and everyday lifestyle habits.",

    intro:
      "Discover helpful resources and practical content covering health, wellness, fitness, nutrition, and healthy living. Explore articles designed to support better everyday habits and informed lifestyle choices.",

    subcategories: [
      {
        title: "Fitness & Exercise",
        image:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Nutrition",
        image:
          "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Wellness",
        image:
          "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Healthy Living",
        image:
          "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },

  // ==========================================
  // TRAVEL & LIFESTYLE
  // URL: /category/travel-lifestyle
  // ==========================================

  "travel-lifestyle": {
    slug: "travel-lifestyle",
    name: "Travel & Lifestyle",
    shortName: "Travel & Lifestyle",
    icon: FaPlane,

    description:
      "Browse structured publications and topic coverage across Travel & Lifestyle on the IndiBlogHub publishing network.",

    intro:
      "Explore publications, guides, and topic-focused articles across Travel & Lifestyle on IndiBlogHub. This category brings together expert insights, practical resources, and continuously published content designed to support discovery, learning, and real-world problem solving within Travel & Lifestyle.\n\nBrowse related topics, discover recent publications, and explore contributions from verified creators publishing across the Travel & Lifestyle category on the IndiBlogHub content publishing platform.",

    subcategories: [
      {
        title: "Travel & Experiences",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Fashion & Personal Style",
        image:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Home & Living",
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Food & Dining",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Digital Culture & Trends",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },

  // ==========================================
  // EDUCATION & CAREER
  // URL: /category/education-career
  // ==========================================

  "education-career": {
    slug: "education-career",
    name: "Education & Career",
    shortName: "Education",
    icon: FaGraduationCap,

    description:
      "Explore education, career development, learning resources, productivity, skills, and professional growth.",

    intro:
      "Discover educational resources, career guidance, learning strategies, professional skills, and productivity insights designed to help readers learn, grow, and build successful careers.",

    subcategories: [
      {
        title: "Learning & Study",
        image:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Career & Jobs",
        image:
          "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Skills Development",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Productivity",
        image:
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },

  // ==========================================
  // BUSINESS & FINANCE
  // URL: /category/business-finance
  // ==========================================

  "business-finance": {
    slug: "business-finance",
    name: "Business & Finance",
    shortName: "Finance",
    icon: FaDollarSign,

    description:
      "Explore business, personal finance, entrepreneurship, investing, money management, and financial trends.",

    intro:
      "Explore business and finance content covering entrepreneurship, investing, personal money management, financial planning, and market trends. Discover practical insights for making better financial decisions.",

    subcategories: [
      {
        title: "Personal Finance",
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Business",
        image:
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Investing",
        image:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Entrepreneurship",
        image:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },

  // ==========================================
  // PROGRAMMING & DEV
  // URL: /category/programming-dev
  // ==========================================

  "programming-dev": {
    slug: "programming-dev",
    name: "Programming & Dev",
    shortName: "Programming",
    icon: FaLaptopCode,

    description:
      "Learn programming, web development, software engineering, frameworks, tools, and modern developer technologies.",

    intro:
      "Explore programming tutorials, web development resources, software engineering guides, frameworks, tools, and modern development technologies for developers of all experience levels.",

    subcategories: [
      {
        title: "Web Development",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "JavaScript & React",
        image:
          "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Backend Development",
        image:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Developer Tools",
        image:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
};

export default categories;