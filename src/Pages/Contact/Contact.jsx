import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaExclamationCircle,
  FaPenNib,
  FaHandshake,
  FaArrowRight,
} from "react-icons/fa";

import "./Contact.css";
import SEO from "../../components/SEO/SEO";

const Contact = () => {
  return (
    <>
      {/* =====================================================
          SEO
      ===================================================== */}

      <SEO
        title="Contact TrendBlogHub – Questions, Corrections & Business Inquiries"
        description="Contact TrendBlogHub for article corrections, content questions, publishing inquiries, partnerships, advertising and general support."
        keywords="contact trendbloghub, report article error, business inquiry blog, publishing questions"
        url="/contact-us/"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact TrendBlogHub",
          url: "https://trendbloghub.com/contact-us/",
          description:
            "Contact TrendBlogHub for article corrections, content questions, publishing inquiries, partnerships, advertising and general support.",
          mainEntity: {
            "@type": "Organization",
            name: "TrendBlogHub",
            url: "https://trendbloghub.com/",
            email: "contact@trendbloghub.com",
            contactPoint: {
              "@type": "ContactPoint",
              email: "contact@trendbloghub.com",
              contactType: "customer support",
            },
          },
        }}
      />

      <main className="contact-page">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="contact-hero">
          <div className="contact-container">
            <span className="contact-eyebrow">
              <FaEnvelope />
              CONTACT TRENDBLOGHUB
            </span>

            <h1>
              We’d Like to
              <span> Hear From You.</span>
            </h1>

            <p>
              Have a question, found an issue with an article, want to
              suggest a topic, or interested in publishing or discussing
              a business partnership?
            </p>
          </div>
        </section>

        {/* =====================================================
            INTRO
        ===================================================== */}

        <section className="contact-intro-section">
          <div className="contact-container contact-intro-container">
            <span className="contact-label">GET IN TOUCH</span>

            <h2>
              How can we
              <span> help?</span>
            </h2>

            <p>
              Have a question about TrendBlogHub, found an issue with an
              article, want to suggest a topic, or interested in publishing
              or discussing a business partnership? We’re happy to hear
              from you.
            </p>
          </div>
        </section>

        {/* =====================================================
            CONTACT OPTIONS
        ===================================================== */}

        <section className="contact-options-section">
          <div className="contact-container">
            <div className="contact-options-grid">
              {/* GENERAL QUESTIONS */}

              <article className="contact-card">
                <div className="contact-card-icon">
                  <FaEnvelope />
                </div>

                <span className="contact-card-number">01</span>

                <h2>General Questions</h2>

                <p>
                  For general questions about TrendBlogHub, our platform,
                  categories, publications, or editorial process, please
                  get in touch with our team.
                </p>

                <div className="contact-email-box">
                  <span>Email</span>

                  <a href="mailto:contact@trendbloghub.com">
                    contact@trendbloghub.com
                  </a>
                </div>
              </article>

              {/* ARTICLE ISSUE */}

              <article className="contact-card">
                <div className="contact-card-icon">
                  <FaExclamationCircle />
                </div>

                <span className="contact-card-number">02</span>

                <h2>Report an Article Issue</h2>

                <p>
                  If you believe an article contains inaccurate, outdated,
                  misleading, or inappropriate information, please contact
                  us with enough information for our team to review the issue.
                </p>

                <div className="contact-requirements">
                  <span>Helpful information includes:</span>

                  <ul>
                    <li>Article URL</li>
                    <li>Description of the issue</li>
                    <li>Relevant source</li>
                    <li>Additional supporting information</li>
                  </ul>
                </div>
              </article>

              {/* PUBLISHING */}

              <article className="contact-card">
                <div className="contact-card-icon">
                  <FaPenNib />
                </div>

                <span className="contact-card-number">03</span>

                <h2>Publishing Questions</h2>

                <p>
                  Interested in contributing to TrendBlogHub? Contact us
                  for information about publishing requirements, submission
                  guidelines, and the review process.
                </p>

                <div className="contact-email-box contact-email-muted">
                  <span>Publishing inquiries</span>

                  <a href="mailto:contact@trendbloghub.com">
                    Contact our team
                  </a>
                </div>
              </article>

              {/* BUSINESS */}

              <article className="contact-card">
                <div className="contact-card-icon">
                  <FaHandshake />
                </div>

                <span className="contact-card-number">04</span>

                <h2>Business &amp; Partnership Inquiries</h2>

                <p>
                  For advertising, sponsorships, partnerships, media
                  inquiries, or other business matters, please provide
                  details about your proposal so our team can review it
                  properly.
                </p>

                <div className="contact-email-box contact-email-muted">
                  <span>Business inquiries</span>

                  <a href="mailto:contact@trendbloghub.com">
                    Contact our team
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* =====================================================
            MESSAGE CTA
        ===================================================== */}

        <section className="contact-message-section">
          <div className="contact-container">
            <div className="contact-message-box">
              <div className="contact-message-content">
                <span className="contact-label">HAVE SOMETHING TO SHARE?</span>

                <h2>We’re listening.</h2>

                <p>
                  Whether you’re a reader, contributor, business, or simply
                  someone with an interesting idea to share, we look forward
                  to hearing from you.
                </p>
              </div>

              <a
                href="mailto:contact@trendbloghub.com"
                className="contact-message-button"
              >
                Send Us an Email
                <FaArrowRight />
              </a>
            </div>
          </div>
        </section>

        {/* =====================================================
            THANK YOU
        ===================================================== */}

        <section className="contact-thankyou">
          <div className="contact-container">
            <p>Thank you for your interest in TrendBlogHub.</p>

            <div className="contact-links">
              <Link to="/about-us">About TrendBlogHub</Link>

              <span>•</span>

              <Link to="/publications">Explore Publications</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;