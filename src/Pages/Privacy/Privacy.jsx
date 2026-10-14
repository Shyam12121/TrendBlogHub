
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaCookieBite,
  FaChartLine,
  FaUsers,
  FaExternalLinkAlt,
  FaLock,
  FaChild,
  FaEnvelope,
} from "react-icons/fa";

import "./Privacy.css";
import SEO from "../../components/SEO/SEO";

<SEO
  title="Privacy Policy – TrendBlogHub"
  description="Read the TrendBlogHub Privacy Policy to learn how we handle information, cookies, analytics, advertising and third-party services."
  keywords="trendbloghub privacy policy, data collection blog"
  url="/privacy-policy/"
/>
const Privacy = () => {
  const lastUpdated = "September 27, 2026";

  const privacySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy – TrendBlogHub",
    description:
      "Read the TrendBlogHub Privacy Policy to learn how we handle information, cookies, analytics, advertising and third-party services.",
    url: "https://trendbloghub.com/privacy-policy/",
    dateModified: "2026-09-27",
    publisher: {
      "@type": "Organization",
      name: "TrendBlogHub",
      url: "https://trendbloghub.com/",
    },
  };

  return (
    <>
      {/* =====================================================
          SEO
      ===================================================== */}

      <Helmet>
        <title>Privacy Policy – TrendBlogHub</title>

        <meta
          name="description"
          content="Read the TrendBlogHub Privacy Policy to learn how we handle information, cookies, analytics, advertising and third-party services."
        />

        <link
          rel="canonical"
          href="https://trendbloghub.com/privacy-policy/"
        />

        <meta
          property="og:title"
          content="Privacy Policy – TrendBlogHub"
        />

        <meta
          property="og:description"
          content="Learn how TrendBlogHub handles information, cookies, analytics, advertising and third-party services."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content="https://trendbloghub.com/privacy-policy/"
        />

        <meta name="twitter:card" content="summary" />

        <meta
          name="twitter:title"
          content="Privacy Policy – TrendBlogHub"
        />

        <meta
          name="twitter:description"
          content="Learn how TrendBlogHub handles information, cookies, analytics, advertising and third-party services."
        />

        <script type="application/ld+json">
          {JSON.stringify(privacySchema)}
        </script>
      </Helmet>

      <main className="privacy-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="privacy-hero">
          <div className="privacy-container">

            <div className="privacy-hero-icon">
              <FaShieldAlt />
            </div>

            <span className="privacy-eyebrow">
              PRIVACY &amp; TRANSPARENCY
            </span>

            <h1>
              Privacy
              <span> Policy</span>
            </h1>

            <p>
              Learn how TrendBlogHub may collect, use and handle information
              when you use our website and services.
            </p>

            <div className="privacy-updated">
              Last Updated: <strong>{lastUpdated}</strong>
            </div>

          </div>
        </section>

        {/* =====================================================
            INTRO
        ===================================================== */}

        <section className="privacy-content-section">
          <div className="privacy-container privacy-layout">

            {/* SIDEBAR */}

            <aside className="privacy-sidebar">

              <div className="privacy-sidebar-card">

                <span>ON THIS PAGE</span>

                <nav>
                  <a href="#information">Information We May Collect</a>
                  <a href="#use">How We Use Information</a>
                  <a href="#cookies">Cookies</a>
                  <a href="#advertising">Advertising</a>
                  <a href="#analytics">Analytics</a>
                  <a href="#contributors">Contributor Information</a>
                  <a href="#third-party">Third-Party Services</a>
                  <a href="#external">External Websites</a>
                  <a href="#security">Data Security</a>
                  <a href="#children">Children’s Privacy</a>
                  <a href="#rights">Your Choices and Rights</a>
                  <a href="#changes">Changes to This Privacy Policy</a>
                  <a href="#contact">Contact Us</a>
                </nav>

              </div>

            </aside>

            {/* MAIN CONTENT */}

            <article className="privacy-content">

              <div className="privacy-intro">
                <p>
                  At TrendBlogHub, we respect your privacy and aim to be
                  transparent about how information may be collected, used,
                  and shared when you use our website.
                </p>

                <p>
                  This Privacy Policy explains the types of information that
                  may be collected through TrendBlogHub and how that
                  information may be handled.
                </p>
              </div>

              {/* 1 */}

              <section id="information" className="privacy-section">

                <div className="privacy-section-heading">
                  <span>01</span>
                  <h2>Information We May Collect</h2>
                </div>

                <p>
                  Depending on how you interact with TrendBlogHub, we may
                  collect information you voluntarily provide through forms
                  or email, account or contributor information if accounts
                  are available, technical information about your browser
                  and device, your IP address, approximate location
                  information, pages viewed and website interactions,
                  referral information, and cookies or similar technologies.
                </p>

                <p>
                  You can generally browse TrendBlogHub without creating an
                  account unless a particular feature requires one.
                </p>

              </section>

              {/* 2 */}

              <section id="use" className="privacy-section">

                <div className="privacy-section-heading">
                  <span>02</span>
                  <h2>How We Use Information</h2>
                </div>

                <p>
                  Information may be used to operate and maintain
                  TrendBlogHub, process contributor submissions, respond to
                  questions and inquiries, improve website functionality,
                  understand website traffic and usage, analyze content
                  performance, improve our publications and services,
                  maintain website security, prevent abuse or fraudulent
                  activity, display advertising, and comply with legal
                  obligations.
                </p>

              </section>

              {/* 3 */}

              <section id="cookies" className="privacy-section">

                <div className="privacy-section-heading">
                  <span>03</span>
                  <h2>Cookies</h2>
                </div>

                <div className="privacy-highlight">
                  <FaCookieBite />
                  <p>
                    TrendBlogHub may use cookies and similar technologies
                    for website functionality, analytics, security, and
                    advertising.
                  </p>
                </div>

                <p>
                  Cookies are small files stored by websites on a visitor’s
                  device. You may be able to manage or disable cookies
                  through your browser settings, though certain website
                  features may not function properly if required cookies are
                  disabled.
                </p>

              </section>

              {/* 4 */}

              <section id="advertising" className="privacy-section">

                <div className="privacy-section-heading">
                  <span>04</span>
                  <h2>Advertising</h2>
                </div>

                <p>
                  TrendBlogHub may display advertisements from third-party
                  advertising providers, including Google AdSense.
                </p>

                <p>
                  Google and other advertising partners may use cookies,
                  web beacons, IP addresses, or similar technologies to
                  support advertising, measurement, and related functions.
                </p>

                <p>
                  Google requires publishers using its advertising products
                  to provide appropriate privacy disclosures concerning
                  advertising cookies and third-party vendors. Where
                  applicable, TrendBlogHub will provide the required privacy
                  and consent controls for visitors.
                </p>

              </section>

              {/* 5 */}

              <section id="analytics" className="privacy-section">

                <div className="privacy-section-heading">
                  <span>05</span>
                  <h2>Analytics</h2>
                </div>

                <div className="privacy-feature-row">

                  <div className="privacy-feature-icon">
                    <FaChartLine />
                  </div>

                  <p>
                    We may use analytics services to understand how visitors
                    use TrendBlogHub, including pages visited, approximate
                    geographic information, device type, browser type,
                    referral source, interaction information, and general
                    website performance information.
                  </p>

                </div>

                <p>
                  This helps us understand which content is useful and
                  improve the website.
                </p>

              </section>

              {/* 6 */}

              <section id="contributors" className="privacy-section">

                <div className="privacy-section-heading">
                  <span>06</span>
                  <h2>Contributor Information</h2>
                </div>

                <div className="privacy-highlight">
                  <FaUsers />
                  <p>
                    If TrendBlogHub allows users to register or submit
                    publications, we may collect information necessary to
                    manage contributor accounts and submissions.
                  </p>
                </div>

                <p>
                  This may include name, email address, profile information,
                  contributor biography, publication information, and
                  communication records.
                </p>

                <p>
                  Only information reasonably necessary for operating the
                  publishing platform is collected.
                </p>

              </section>

              {/* 7 */}

              <section id="third-party" className="privacy-section">

                <div className="privacy-section-heading">
                  <span>07</span>
                  <h2>Third-Party Services</h2>
                </div>

                <p>
                  TrendBlogHub may use third-party services for hosting,
                  analytics, advertising, security, email, website
                  performance, and payment processing where applicable.
                </p>

                <p>
                  Those services process information according to their own
                  privacy policies.
                </p>

              </section>

              {/* 8 */}

              <section id="external" className="privacy-section">

                <div className="privacy-section-heading">
                  <span>08</span>
                  <h2>External Websites</h2>
                </div>

                <div className="privacy-feature-row">

                  <div className="privacy-feature-icon">
                    <FaExternalLinkAlt />
                  </div>

                  <p>
                    TrendBlogHub may contain links to third-party websites.
                    We do not control the privacy practices or content of
                    external websites, and visitors should review the
                    privacy policies of any external websites they choose
                    to visit.
                  </p>

                </div>

              </section>

              {/* 9 */}

              <section id="security" className="privacy-section">

                <div className="privacy-section-heading">
                  <span>09</span>
                  <h2>Data Security</h2>
                </div>

                <div className="privacy-highlight">
                  <FaLock />
                  <p>
                    We use reasonable measures to protect information
                    handled through our website.
                  </p>
                </div>

                <p>
                  However, no internet transmission or storage system can be
                  guaranteed to be completely secure.
                </p>

              </section>

              {/* 10 */}

              <section id="children" className="privacy-section">

                <div className="privacy-section-heading">
                  <span>10</span>
                  <h2>Children’s Privacy</h2>
                </div>

                <div className="privacy-feature-row">

                  <div className="privacy-feature-icon">
                    <FaChild />
                  </div>

                  <p>
                    TrendBlogHub is not specifically intended to collect
                    personal information from children. If you believe a
                    child has provided personal information to us without
                    appropriate authorization, please contact us.
                  </p>

                </div>

              </section>

              {/* 11 */}

              <section id="rights" className="privacy-section">

                <div className="privacy-section-heading">
                  <span>11</span>
                  <h2>Your Choices and Rights</h2>
                </div>

                <p>
                  Depending on your location and applicable law, you may
                  have rights concerning personal information collected
                  about you, along with choices regarding cookies,
                  advertising personalization, and certain communications.
                </p>

                <p>
                  Where legally required, we will provide appropriate
                  mechanisms for exercising applicable rights.
                </p>

              </section>

              {/* 12 */}

              <section id="changes" className="privacy-section">

                <div className="privacy-section-heading">
                  <span>12</span>
                  <h2>Changes to This Privacy Policy</h2>
                </div>

                <p>
                  We may update this Privacy Policy when our website,
                  services, technologies, advertising partners, or legal
                  requirements change.
                </p>

                <p>
                  The latest version will be posted on this page.
                </p>

              </section>

              {/* 13 */}

              <section id="contact" className="privacy-section privacy-contact-section">

                <div className="privacy-section-heading">
                  <span>13</span>
                  <h2>Contact Us</h2>
                </div>

                <p>
                  Questions about this Privacy Policy can be sent to:
                </p>

                <a
                  href="mailto:trendbloghub1@gmail.com"
                  className="privacy-contact-email"
                >
                  <FaEnvelope />
                  trendbloghub1@gmail.com
                </a>

              </section>

            </article>

          </div>
        </section>

        {/* =====================================================
            FOOTER CTA
        ===================================================== */}

        <section className="privacy-bottom">
          <div className="privacy-container">

            <h2>
              Have a question about
              <span> privacy?</span>
            </h2>

            <p>
              If you have questions about this Privacy Policy or how
              information may be handled on TrendBlogHub, please contact us.
            </p>

            <div className="privacy-actions">

              <Link
                to="/contact-us"
                className="privacy-btn privacy-btn-primary"
              >
                Contact Us
                <span>→</span>
              </Link>

              <Link
                to="/about-us"
                className="privacy-btn privacy-btn-secondary"
              >
                About TrendBlogHub
                <span>→</span>
              </Link>

            </div>

          </div>
        </section>

      </main>
    </>
  );
};

export default Privacy;

