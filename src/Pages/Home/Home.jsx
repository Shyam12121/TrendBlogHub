import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaHeart,
  FaLaptopCode,
  FaBriefcase,
  FaGraduationCap,
  FaPlane,
  FaFilm,
  FaUsers,
  FaLayerGroup,
  FaBookOpen,
  FaCheckCircle,
  FaLightbulb,
} from "react-icons/fa";

import Hero from "../../components/home/Hero";
import FeaturedArticles from "../../components/home/FeaturedArticles/FeaturedArticles";
import SEO from "../../components/SEO/SEO";

import { getPublicBlogs } from "../../services/adminApi";

import "./Home.css";

// ==========================================
// HELPERS
// ==========================================

const CATEGORY_COLORS = {
  health: "#16a34a",
  technology: "#2563eb",
  tech: "#2563eb",
  business: "#7c3aed",
  finance: "#7c3aed",
  education: "#ea580c",
  travel: "#0891b2",
  lifestyle: "#0891b2",
  entertainment: "#db2777",
  general: "#64748b",
};

const getCategoryColor = (category) => {
  if (!category) return "#64748b";

  return (
    CATEGORY_COLORS[category.toLowerCase()] || "#2563eb"
  );
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const calculateReadTime = (content) => {
  if (!content) return "1 min read";

  const text = content.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
};

// ==========================================
// CATEGORIES (static — home page only)
// ==========================================

const categories = [
  {
    name: "Health & Wellness",
    slug: "health",
    description:
      "Explore articles covering healthy living, fitness, nutrition, wellness, personal care, sleep, and other health-related topics.",
    icon: <FaHeart />,
    color: "#16a34a",
  },
  {
    name: "Technology & AI",
    slug: "technology",
    description:
      "Discover articles about technology, software, smartphones, apps, digital tools, artificial intelligence, cybersecurity, and the changing digital world.",
    icon: <FaLaptopCode />,
    color: "#2563eb",
  },
  {
    name: "Business & Finance",
    slug: "business",
    description:
      "Explore entrepreneurship, business, personal finance, marketing, workplace trends, investing concepts, and developments shaping the modern economy.",
    icon: <FaBriefcase />,
    color: "#7c3aed",
  },
  {
    name: "Education & Career",
    slug: "education",
    description:
      "Find useful information about education, learning, professional skills, careers, courses, workplace development, and personal growth.",
    icon: <FaGraduationCap />,
    color: "#ea580c",
  },
  {
    name: "Travel & Lifestyle",
    slug: "travel",
    description:
      "Discover travel ideas, destinations, food, home and living, productivity, personal interests, and everyday lifestyle topics.",
    icon: <FaPlane />,
    color: "#0891b2",
  },
  {
    name: "Entertainment & Media",
    slug: "entertainment",
    description:
      "Explore movies, television, streaming, gaming, music, popular culture, and other entertainment topics.",
    icon: <FaFilm />,
    color: "#db2777",
  },
];

// ==========================================
// HOME COMPONENT
// ==========================================

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TrendBlogHub",
    url: window.location.origin,
    description:
      "Discover useful information, fresh perspectives, ideas and insights across technology, health, business, finance, lifestyle, education and entertainment.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${window.location.origin}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TrendBlogHub",
    url: window.location.origin,
    description:
      "A growing publishing platform where writers, professionals, creators, businesses, and readers share and discover useful information.",
  };

  // ------------------------------------------
  // LOAD PUBLISHED BLOGS FROM BACKEND
  // ------------------------------------------

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);

        const blogs = await getPublicBlogs();

        const blogList = Array.isArray(blogs)
          ? blogs
          : blogs?.blogs || blogs?.data || [];

        const mapped = blogList.map((blog) => ({
          id: blog.id,
          slug: blog.slug,

          title: blog.title,

          excerpt:
            blog.excerpt ||
            "Read the full article to know more...",

          image:
            blog.featured_image ||
            blog.image ||
            null,

          category: blog.category || "General",
          categoryColor: getCategoryColor(blog.category),

          author: {
            name:
              blog.author_name ||
              blog.author?.name ||
              "Contributor",
            role: "Author",
            avatar:
              blog.author?.avatar ||
              blog.author_avatar ||
              null,
          },

          date: formatDate(blog.created_at),

          readTime: calculateReadTime(blog.content),

          shares: blog.shares || 0,
          comments: blog.comments || 0,

          featured: blog.is_featured || false,
        }));

        setArticles(mapped);
      } catch (error) {
        console.error("Failed to load articles:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          TrendBlogHub – Discover Ideas, Insights & Trending Topics
        </title>

        <meta
          name="description"
          content="Discover useful articles, ideas and insights across technology, health, business, finance, lifestyle, education and entertainment at TrendBlogHub."
        />

        <meta
          name="keywords"
          content="TrendBlogHub, blogs, articles, technology, AI, health, business, finance, education, travel, lifestyle, entertainment"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href={window.location.origin + "/"}
        />

        <meta
          property="og:title"
          content="TrendBlogHub – Discover Ideas, Insights & Trending Topics"
        />

        <meta
          property="og:description"
          content="Discover useful articles, ideas and insights across a wide range of subjects on TrendBlogHub."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content={window.location.origin + "/"}
        />

        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

            <SEO
        title="TrendBlogHub – Discover Ideas, Insights & Trending Topics"
        description="Discover useful articles, ideas and insights across technology, health, business, finance, lifestyle, education and entertainment at TrendBlogHub."
        keywords="trending blog, multi-category blog, technology health finance articles, guest blogging platform"
        url="/"
        image="https://www.trendbloghub.com/logo.png" // 👈 YAHAN CHANGE KARO (public/logo.png ka URL)
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "TrendBlogHub",
          url: "https://trendbloghub.com/",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://trendbloghub.com/?s={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />


      <main className="home-page">
        {/* HERO */}
        <Hero />

        {/* CATEGORIES */}
        <section className="categories-section">
          <div className="container">
            <div className="content-section-header centered">
              <span className="content-badge">
                <FaLayerGroup />
                EXPLORE
              </span>

              <h2>Explore Our Categories</h2>

              <p>
                Explore useful content across the
                subjects people are learning about,
                discussing, and exploring today.
              </p>
            </div>

            <div className="categories-grid">
              {categories.map((category) => (
                <article
                  className="category-card"
                  key={category.slug}
                >
                  <div
                    className="category-icon"
                    style={{
                      color: category.color,
                      background: `${category.color}12`,
                    }}
                  >
                    {category.icon}
                  </div>

                  <h3>{category.name}</h3>

                  <p>{category.description}</p>

                  <Link
                    to={`/category/${category.slug}`}
                  >
                    Explore {category.name}
                    <FaArrowRight />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* LATEST PUBLICATIONS — NOW DYNAMIC */}
        <FeaturedArticles
          articles={articles}
          loading={loading}
        />

        {/* WHY TREND BLOG HUB */}
        <section className="why-section">
          <div className="container">
            <div className="content-section-header centered">
              <span className="content-badge">
                <FaBookOpen />
                ABOUT THE PLATFORM
              </span>

              <h2>Why TrendBlogHub?</h2>

              <p>
                A growing publishing platform built
                around useful information, different
                voices, and meaningful content.
              </p>
            </div>

            <div className="why-grid">
              <article className="why-card">
                <div className="why-number">01</div>
                <FaUsers className="why-icon" />

                <h3>A Place for Different Voices</h3>

                <p>
                  Useful information can come from many
                  different backgrounds and experiences.
                  TrendBlogHub gives writers,
                  professionals, creators, and businesses
                  a place to share knowledge and ideas
                  with a wider audience.
                </p>
              </article>

              <article className="why-card">
                <div className="why-number">02</div>
                <FaLayerGroup className="why-icon" />

                <h3>Multiple Categories</h3>

                <p>
                  Technology, health, finance, business,
                  education, lifestyle, entertainment,
                  and more — explore different subjects
                  without limiting yourself to a single
                  area of interest.
                </p>
              </article>

              <article className="why-card">
                <div className="why-number">03</div>
                <FaBookOpen className="why-icon" />

                <h3>Reader-Focused Content</h3>

                <p>
                  We want every article to provide
                  something useful to the person reading
                  it. Articles should inform, explain,
                  educate, or offer a meaningful
                  perspective.
                </p>
              </article>

              <article className="why-card">
                <div className="why-number">04</div>
                <FaCheckCircle className="why-icon" />

                <h3>Quality Matters</h3>

                <p>
                  Publishing is open to different
                  contributors, but publication doesn’t
                  mean every submission is automatically
                  accepted. Content can be reviewed for
                  originality, clarity, relevance,
                  quality, and publishing standards.
                </p>
              </article>

              <article className="why-card">
                <div className="why-number">05</div>
                <FaLightbulb className="why-icon" />

                <h3>A Growing Knowledge Hub</h3>

                <p>
                  TrendBlogHub is designed to grow with
                  its contributors and readers. As new
                  subjects, ideas, technologies, and
                  conversations emerge, publication
                  categories can evolve with them.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* PUBLISH CTA */}
        <section className="publish-section">
          <div className="container">
            <div className="publish-card">
              <div className="publish-content">
                <span className="publish-badge">
                  ✍️ FOR CONTRIBUTORS
                </span>

                <h2>Want to Share Your Knowledge?</h2>

                <p>
                  Have an experience, idea, expertise, or
                  perspective worth sharing? TrendBlogHub
                  gives contributors an opportunity to
                  publish useful content for readers
                  interested in their subject.
                </p>

                <Link
                  to="/login"
                  className="publish-btn"
                >
                  Start Publishing
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* KEEP EXPLORING */}
        <section className="explore-footer-section">
          <div className="container">
            <div className="explore-footer-content">
              <span className="content-badge">
                KEEP EXPLORING
              </span>

              <h2>Read. Discover. Learn.</h2>

              <p>
                Read something useful. Discover a new
                perspective. Learn about a subject you
                didn’t know much about.
              </p>

              <div className="explore-footer-links">
                <Link to="/publications">
                  Explore Publications
                  <FaArrowRight />
                </Link>

                <Link to="/categories">
                  Browse Categories
                  <FaArrowRight />
                </Link>
              </div>

              <div className="brand-tagline">
                TrendBlogHub — Ideas, Insights &
                Information Worth Exploring.
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;