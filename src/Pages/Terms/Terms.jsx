import { Link } from "react-router-dom";
import { FaFileContract, FaEnvelope } from "react-icons/fa";

import "./Terms.css";
import SEO from "../../components/SEO/SEO";

const Terms = () => {
  const lastUpdated = "October 14, 2026";

  return (
    <>
      {/* =====================================================
          SEO
      ===================================================== */}

      <SEO
        title="Terms & Conditions"
        description="Read the TrendBlogHub Terms & Conditions to understand the rules, guidelines and policies for using our website and services."
        keywords="trendbloghub terms, terms and conditions, user agreement, website rules"
        url="/terms-and-conditions/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms & Conditions – TrendBlogHub",
          description:
            "Read the TrendBlogHub Terms & Conditions to understand the rules, guidelines and policies for using our website and services.",
          url: "https://trendbloghub.com/terms-and-conditions/",
          dateModified: "2026-10-14",
          publisher: {
            "@type": "Organization",
            name: "TrendBlogHub",
            url: "https://trendbloghub.com/",
          },
        }}
      />

      <main className="terms-page">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="terms-hero">
          <div className="terms-container">
            <div className="terms-hero-icon">
              <FaFileContract />
            </div>

            <span className="terms-eyebrow">LEGAL &amp; POLICIES</span>

            <h1>
              Terms &amp;
              <span> Conditions</span>
            </h1>

            <p>
              Please read these Terms &amp; Conditions carefully before using
              TrendBlogHub. By accessing our website, you agree to be bound
              by these terms.
            </p>

            <div className="terms-updated">
              Last Updated: <strong>{lastUpdated}</strong>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <section className="terms-content-section">
          <div className="terms-container terms-layout">
            {/* SIDEBAR */}

            <aside className="terms-sidebar">
              <div className="terms-sidebar-card">
                <span>ON THIS PAGE</span>

                <nav>
                  <a href="#acceptance">Acceptance of Terms</a>
                  <a href="#eligibility">Eligibility</a>
                  <a href="#accounts">User Accounts</a>
                  <a href="#content">User-Generated Content</a>
                  <a href="#ip">Intellectual Property</a>
                  <a href="#prohibited">Prohibited Activities</a>
                  <a href="#third-party">Third-Party Links</a>
                  <a href="#dmca">Copyright &amp; DMCA</a>
                  <a href="#termination">Termination</a>
                  <a href="#disclaimer">Disclaimer of Warranties</a>
                  <a href="#liability">Limitation of Liability</a>
                  <a href="#changes">Changes to Terms</a>
                  <a href="#law">Governing Law</a>
                  <a href="#contact">Contact Us</a>
                </nav>
              </div>
            </aside>

            {/* MAIN CONTENT */}

            <article className="terms-content">
              <div className="terms-intro">
                <p>
                  Welcome to TrendBlogHub. These Terms &amp; Conditions
                  ("Terms") govern your access to and use of our website,
                  services, and content.
                </p>

                <p>
                  By accessing or using TrendBlogHub, you agree to be bound
                  by these Terms. If you do not agree with any part of these
                  Terms, please do not use our website.
                </p>
              </div>

              {/* 01 */}

              <section id="acceptance" className="terms-section">
                <div className="terms-section-heading">
                  <span>01</span>
                  <h2>Acceptance of Terms</h2>
                </div>

                <p>
                  By accessing, browsing, or using TrendBlogHub, you
                  acknowledge that you have read, understood, and agreed to
                  be bound by these Terms and our Privacy Policy. These Terms
                  apply to all visitors, users, and others who access or use
                  the service.
                </p>
              </section>

              {/* 02 */}

              <section id="eligibility" className="terms-section">
                <div className="terms-section-heading">
                  <span>02</span>
                  <h2>Eligibility</h2>
                </div>

                <p>
                  You must be at least 13 years of age to use this website.
                  By using TrendBlogHub, you represent and warrant that you
                  meet this requirement and that you have the legal capacity
                  to enter into these Terms.
                </p>
              </section>

              {/* 03 */}

              <section id="accounts" className="terms-section">
                <div className="terms-section-heading">
                  <span>03</span>
                  <h2>User Accounts</h2>
                </div>

                <p>
                  To access certain features, you may be required to create
                  an account. You agree to:
                </p>

                <ul>
                  <li>
                    Provide accurate, current, and complete information during
                    registration.
                  </li>
                  <li>
                    Maintain the security of your password and account
                    credentials.
                  </li>
                  <li>
                    Promptly update any information that becomes outdated.
                  </li>
                  <li>
                    Accept full responsibility for all activities that occur
                    under your account.
                  </li>
                  <li>
                    Notify us immediately of any unauthorized use of your
                    account.
                  </li>
                </ul>
              </section>

              {/* 04 */}

              <section id="content" className="terms-section">
                <div className="terms-section-heading">
                  <span>04</span>
                  <h2>User-Generated Content</h2>
                </div>

                <p>
                  You retain ownership of any content you submit, post, or
                  display on TrendBlogHub ("User Content"). However, by
                  posting content, you grant us a worldwide, non-exclusive,
                  royalty-free license to use, reproduce, modify, and display
                  such content.
                </p>

                <p>
                  You agree <strong>NOT</strong> to post content that:
                </p>

                <ul>
                  <li>
                    Is unlawful, defamatory, abusive, hateful, or
                    discriminatory.
                  </li>
                  <li>
                    Infringes any copyright, trademark, or intellectual
                    property rights.
                  </li>
                  <li>Contains viruses, malware, or harmful code.</li>
                  <li>
                    Constitutes spam, phishing, or unauthorized advertising.
                  </li>
                  <li>Violates the privacy of any third party.</li>
                </ul>
              </section>

              {/* 05 */}

              <section id="ip" className="terms-section">
                <div className="terms-section-heading">
                  <span>05</span>
                  <h2>Intellectual Property Rights</h2>
                </div>

                <p>
                  All content on TrendBlogHub — including text, graphics,
                  logos, icons, images, and software — is the property of
                  TrendBlogHub or its content suppliers and is protected by
                  Indian and international copyright laws. You may not
                  reproduce, distribute, or create derivative works without
                  our prior written permission.
                </p>
              </section>

              {/* 06 */}

              <section id="prohibited" className="terms-section">
                <div className="terms-section-heading">
                  <span>06</span>
                  <h2>Prohibited Activities</h2>
                </div>

                <p>You agree not to:</p>

                <ul>
                  <li>
                    Use the website for any illegal or unauthorized purpose.
                  </li>
                  <li>
                    Attempt to gain unauthorized access to our servers or
                    databases.
                  </li>
                  <li>
                    Use bots, scrapers, or automated tools to extract data.
                  </li>
                  <li>
                    Interfere with or disrupt the website's functionality.
                  </li>
                  <li>Impersonate any person or entity.</li>
                </ul>
              </section>

              {/* 07 */}

              <section id="third-party" className="terms-section">
                <div className="terms-section-heading">
                  <span>07</span>
                  <h2>Third-Party Links</h2>
                </div>

                <p>
                  TrendBlogHub may contain links to third-party websites or
                  services that are not owned or controlled by us. We have no
                  control over, and assume no responsibility for, the
                  content, privacy policies, or practices of any third-party
                  websites.
                </p>
              </section>

              {/* 08 */}

              <section id="dmca" className="terms-section">
                <div className="terms-section-heading">
                  <span>08</span>
                  <h2>Copyright &amp; DMCA Policy</h2>
                </div>

                <p>
                  If you believe that any content on TrendBlogHub infringes
                  your copyright, please contact us at{" "}
                  <a href="mailto:contact@trendbloghub.com">
                    contact@trendbloghub.com
                  </a>{" "}
                  with the details of the alleged infringement. We will
                  respond promptly and take appropriate action.
                </p>
              </section>

              {/* 09 */}

              <section id="termination" className="terms-section">
                <div className="terms-section-heading">
                  <span>09</span>
                  <h2>Termination</h2>
                </div>

                <p>
                  We reserve the right to suspend or terminate your account
                  and access to TrendBlogHub at any time, without prior
                  notice, if we believe you have violated these Terms or
                  engaged in conduct harmful to the platform or other users.
                </p>
              </section>

              {/* 10 */}

              <section id="disclaimer" className="terms-section">
                <div className="terms-section-heading">
                  <span>10</span>
                  <h2>Disclaimer of Warranties</h2>
                </div>

                <p>
                  TrendBlogHub is provided on an "AS IS" and "AS AVAILABLE"
                  basis. We make no warranties, expressed or implied,
                  regarding the accuracy, reliability, or availability of the
                  website or its content. Your use of the website is at your
                  own risk.
                </p>
              </section>

              {/* 11 */}

              <section id="liability" className="terms-section">
                <div className="terms-section-heading">
                  <span>11</span>
                  <h2>Limitation of Liability</h2>
                </div>

                <p>
                  In no event shall TrendBlogHub, its owners, or contributors
                  be liable for any indirect, incidental, special, or
                  consequential damages arising out of or in connection with
                  your use of the website.
                </p>
              </section>

              {/* 12 */}

              <section id="changes" className="terms-section">
                <div className="terms-section-heading">
                  <span>12</span>
                  <h2>Changes to Terms</h2>
                </div>

                <p>
                  We reserve the right to modify or replace these Terms at
                  any time. Any changes will be effective immediately upon
                  posting on this page. Your continued use of TrendBlogHub
                  after changes are posted constitutes acceptance of the
                  revised Terms.
                </p>
              </section>

              {/* 13 */}

              <section id="law" className="terms-section">
                <div className="terms-section-heading">
                  <span>13</span>
                  <h2>Governing Law</h2>
                </div>

                <p>
                  These Terms shall be governed and construed in accordance
                  with the laws of India. Any disputes arising under these
                  Terms shall be subject to the exclusive jurisdiction of the
                  courts located in India.
                </p>
              </section>

              {/* 14 */}

              <section
                id="contact"
                className="terms-section terms-contact-section"
              >
                <div className="terms-section-heading">
                  <span>14</span>
                  <h2>Contact Us</h2>
                </div>

                <p>
                  If you have any questions about these Terms &amp;
                  Conditions, please contact us:
                </p>

                <a
                  href="mailto:contact@trendbloghub.com"
                  className="terms-contact-email"
                >
                  <FaEnvelope />
                  contact@trendbloghub.com
                </a>
              </section>
            </article>
          </div>
        </section>

        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <section className="terms-bottom">
          <div className="terms-container">
            <h2>
              Have a question about
              <span> our terms?</span>
            </h2>

            <p>
              If you have questions about these Terms &amp; Conditions or how
              our platform operates, please contact us.
            </p>

            <div className="terms-actions">
              <Link to="/contact-us" className="terms-btn terms-btn-primary">
                Contact Us
                <span>→</span>
              </Link>

              <Link
                to="/privacy-policy"
                className="terms-btn terms-btn-secondary"
              >
                Privacy Policy
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Terms;