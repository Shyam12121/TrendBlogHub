
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaBullseye,
  FaCheckCircle,
  FaLightbulb,
  FaPenNib,
  FaUsers,
} from "react-icons/fa";

import "./About.css";

// About page images
import aboutHero from "../../assets/images/about/about-hero.webp";
import aboutWriters from "../../assets/images/about/about-writers.webp";
import aboutContributors from "../../assets/images/about/about-contributors.webp";
import aboutEditorial from "../../assets/images/about/about-editorial.webp";
import SEO from "../../components/SEO/SEO";

// Component ke return mein sabse pehle:
<SEO
  title="About TrendBlogHub – Our Mission, Contributors & Editorial Standards"
  description="Learn about TrendBlogHub, our publishing platform, contributors, editorial approach, content standards and the topics we cover."
  keywords="about trendbloghub, multi-author blog platform, editorial standards"
  url="/about-us/"
  schema={{
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About TrendBlogHub",
    url: "https://trendbloghub.com/about-us/",
    mainEntity: {
      "@type": "Organization",
      name: "TrendBlogHub",
    },
  }}
/>
const About = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TrendBlogHub",
    url: "https://trendbloghub.com/about-us/",
    description:
      "TrendBlogHub is a multi-category publishing platform where contributors share useful information, ideas, guides, experiences and insights with readers.",
  };

  return (
    <>
      <Helmet>
        <title>
          About TrendBlogHub – Our Mission, Contributors & Editorial Standards
        </title>

        <meta
          name="description"
          content="Learn about TrendBlogHub, our publishing platform, contributors, editorial approach, content standards and the topics we cover."
        />

        <meta
          name="keywords"
          content="TrendBlogHub, about TrendBlogHub, publishing platform, contributors, editorial standards, blogging platform, online publishing"
        />

        <link
          rel="canonical"
          href="https://trendbloghub.com/about-us/"
        />

        <meta
          property="og:title"
          content="About TrendBlogHub – Our Mission, Contributors & Editorial Standards"
        />

        <meta
          property="og:description"
          content="Learn about TrendBlogHub, our contributors, editorial approach, content standards and the topics we cover."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content="https://trendbloghub.com/about-us/"
        />

        <meta
          property="og:image"
          content="https://trendbloghub.com/images/about/about-hero.webp"
        />

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="About TrendBlogHub – Our Mission, Contributors & Editorial Standards"
        />

        <meta
          name="twitter:description"
          content="Discover TrendBlogHub's mission, contributors, publishing standards and the topics we cover."
        />

        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <main className="about-page">

        {/* =====================================================
            HERO
        ===================================================== */}
        <section className="about-hero">
          <div className="about-container about-hero-grid">

            <div className="about-hero-content">
              <span className="about-eyebrow">
                <FaBookOpen />
                About TrendBlogHub
              </span>

              <h1>
                A Place to{" "}
                <span>Share, Discover</span>{" "}
                and Learn
              </h1>

              <p>
                TrendBlogHub is a multi-category publishing platform created
                to help useful ideas, information, experiences and insights
                reach readers who are looking to discover and learn.
              </p>
            </div>

            <div className="about-hero-image">
              <img
                src={aboutHero}
                alt="Writers and creators working on digital publishing content"
              />
            </div>

          </div>
        </section>

        {/* =====================================================
            INTRO
        ===================================================== */}
        <section className="about-section">
          <div className="about-container about-intro-grid">

            <div className="about-section-heading">
              <span className="about-label">OUR PLATFORM</span>

              <h2>
                Information should be useful,
                <span> accessible and discoverable.</span>
              </h2>
            </div>

            <div className="about-text">
              <p>
                Information can come from many places. Sometimes it comes
                from a professional who has spent years working in a
                particular field, sometimes from a writer researching a
                subject carefully, and sometimes from someone sharing a
                practical experience that others can learn from.
              </p>

              <p>
                TrendBlogHub was created to give useful ideas and information
                a place to be discovered. We are a multi-category publishing
                platform covering technology, health and wellness, business,
                finance, education, lifestyle, entertainment, and other
                subjects that interest modern readers.
              </p>

              <p>
                Our aim is to connect contributors with readers while
                maintaining clear standards for the content published on
                the platform.
              </p>
            </div>

          </div>
        </section>

        {/* =====================================================
            WHAT WE DO
        ===================================================== */}
        <section className="about-section about-light-section">
          <div className="about-container about-image-section">

            <div className="about-image-wrapper">
              <img
                src={aboutWriters}
                alt="Writer researching and creating useful online content"
                loading="lazy"
              />
            </div>

            <div className="about-image-content">
              <span className="about-label">WHAT WE DO</span>

              <h2>
                A publishing space built for
                <span> contributors and readers.</span>
              </h2>

              <p>
                TrendBlogHub provides a publishing space where contributors
                can share articles, insights, guides, explanations,
                experiences and other informative content.
              </p>

              <p>
                Our platform is built around two groups: contributors who
                have something useful or interesting to share, and readers
                who are looking for information, ideas, explanations and
                new perspectives.
              </p>

              <p>
                We believe both sides benefit when content is created for
                people first.
              </p>
            </div>

          </div>
        </section>

        {/* =====================================================
            WHAT WE COVER
        ===================================================== */}
        <section className="about-section">
          <div className="about-container">

            <div className="about-centered-heading">
              <span className="about-label">WHAT WE COVER</span>

              <h2>
                Topics for modern
                <span> readers.</span>
              </h2>

              <p>
                Our categories cover a broad range of interests and practical
                subjects.
              </p>
            </div>

            <div className="about-category-grid">

              <div className="about-category-card">
                <FaCheckCircle />
                <span>Health &amp; Wellness</span>
              </div>

              <div className="about-category-card">
                <FaCheckCircle />
                <span>Technology &amp; AI</span>
              </div>

              <div className="about-category-card">
                <FaCheckCircle />
                <span>Business &amp; Finance</span>
              </div>

              <div className="about-category-card">
                <FaCheckCircle />
                <span>Education &amp; Career</span>
              </div>

              <div className="about-category-card">
                <FaCheckCircle />
                <span>Travel &amp; Lifestyle</span>
              </div>

              <div className="about-category-card">
                <FaCheckCircle />
                <span>Entertainment &amp; Media</span>
              </div>

            </div>

            <p className="about-category-note">
              Additional categories and topics may be introduced as the
              platform grows.
            </p>

          </div>
        </section>

        {/* =====================================================
            PRINCIPLES
        ===================================================== */}
        <section className="about-section about-light-section">
          <div className="about-container">

            <div className="about-centered-heading">
              <span className="about-label">OUR PRINCIPLES</span>

              <h2>
                What we
                <span> believe.</span>
              </h2>
            </div>

            <div className="about-principles">

              <article className="about-principle">
                <span>01</span>

                <div>
                  <h3>Useful Content Comes First</h3>

                  <p>
                    An article should give the reader a reason to finish
                    reading it — whether that means answering a question,
                    explaining a difficult concept, sharing useful knowledge,
                    providing practical information, or presenting a
                    thoughtful perspective.
                  </p>
                </div>
              </article>

              <article className="about-principle">
                <span>02</span>

                <div>
                  <h3>Originality Matters</h3>

                  <p>
                    We expect contributors to submit original work and to
                    respect the intellectual property of other writers,
                    publishers, businesses and creators. Copied, duplicated,
                    misleading or substantially repackaged material may be
                    rejected or removed.
                  </p>
                </div>
              </article>

              <article className="about-principle">
                <span>03</span>

                <div>
                  <h3>Quality Over Quantity</h3>

                  <p>
                    Publishing more articles is not the goal by itself.
                    We would rather have useful content that serves readers
                    than a large collection of low-value pages.
                  </p>
                </div>
              </article>

              <article className="about-principle">
                <span>04</span>

                <div>
                  <h3>Readers Deserve Clarity</h3>

                  <p>
                    Good information should be understandable. We encourage
                    contributors to write clearly, organize information
                    logically, use appropriate headings and avoid unnecessary
                    complexity.
                  </p>
                </div>
              </article>

              <article className="about-principle">
                <span>05</span>

                <div>
                  <h3>Accuracy Matters</h3>

                  <p>
                    Contributors are responsible for making reasonable efforts
                    to ensure factual claims are accurate. Content involving
                    health, finance, legal matters, safety or other sensitive
                    subjects may require additional supporting sources and
                    editorial review.
                  </p>
                </div>
              </article>

              <article className="about-principle">
                <span>06</span>

                <div>
                  <h3>Transparency Builds Trust</h3>

                  <p>
                    Where appropriate, contributors should identify commercial
                    relationships, sponsorships, affiliate relationships or
                    other interests that could affect how readers interpret
                    an article.
                  </p>
                </div>
              </article>

            </div>

          </div>
        </section>

        {/* =====================================================
            CONTRIBUTORS
        ===================================================== */}
        <section className="about-section">
          <div className="about-container about-image-section reverse">

            <div className="about-image-wrapper">
              <img
                src={aboutContributors}
                alt="Contributors collaborating and sharing ideas"
                loading="lazy"
              />
            </div>

            <div className="about-image-content">
              <span className="about-label">CONTRIBUTORS</span>

              <h2>
                Who can
                <span> contribute?</span>
              </h2>

              <p>
                TrendBlogHub welcomes a range of contributors, including
                independent writers, bloggers, industry professionals,
                subject-matter contributors, entrepreneurs, creators, and
                businesses or organizations.
              </p>

              <p>
                Having professional credentials is not the only way to
                provide useful information. What matters is whether the
                contributor can provide content that is relevant, original,
                accurate and genuinely useful to readers.
              </p>

              <Link
                to="/login"
                className="about-inline-link"
              >
                Start Publishing <span>→</span>
              </Link>
            </div>

          </div>
        </section>

        {/* =====================================================
            EDITORIAL
        ===================================================== */}
        <section className="about-section about-light-section">
          <div className="about-container about-editorial-grid">

            <div className="about-editorial-image">
              <img
                src={aboutEditorial}
                alt="Editorial team reviewing and maintaining content standards"
                loading="lazy"
              />
            </div>

            <div className="about-editorial-content">

              <div className="about-editorial-icon">
                <FaBullseye />
              </div>

              <span className="about-label">EDITORIAL APPROACH</span>

              <h2>
                Clear standards for
                <span> published content.</span>
              </h2>

              <p>
                TrendBlogHub is a publishing platform, but publication is
                subject to our content standards.
              </p>

              <p>
                Submitted material may be reviewed for originality, accuracy,
                relevance, readability, structure, appropriate sourcing,
                promotional intent, copyright concerns and compliance with
                our Content Policy.
              </p>

              <p>
                We may request changes before publication, decline submissions
                that do not meet our standards, or remove published content
                if significant violations are identified later.
              </p>

            </div>

          </div>
        </section>

        {/* =====================================================
            MISSION
        ===================================================== */}
        <section className="about-mission">
          <div className="about-container">

            <div className="about-mission-content">

              <span className="about-label">OUR MISSION</span>

              <h2>
                Share knowledge.
                <br />
                Discover ideas.
                <br />
                <span>Learn from different voices.</span>
              </h2>

              <p>
                To create a useful place where people can share knowledge,
                discover new ideas, and learn from information created by
                different voices.
              </p>

              <div className="about-actions">

                <Link
                  to="/publications"
                  className="about-btn about-btn-primary"
                >
                  Explore Publications
                  <span>→</span>
                </Link>

                <Link
                  to="/login"
                  className="about-btn about-btn-secondary"
                >
                  Start Publishing
                  <span>→</span>
                </Link>

              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            THANK YOU
        ===================================================== */}
        <section className="about-thankyou">
          <div className="about-container">
            <p>Thank you for visiting TrendBlogHub.</p>
          </div>
        </section>

      </main>
    </>
  );
};

export default About;

