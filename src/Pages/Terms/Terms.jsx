import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: (
        <p>
          By accessing, browsing, or using TrendBlogHub, you acknowledge that you have read, 
          understood, and agreed to be bound by these Terms and our Privacy Policy. These Terms 
          apply to all visitors, users, and others who access or use the service.
        </p>
      ),
    },
    {
      title: '2. Eligibility',
      content: (
        <p>
          You must be at least 13 years of age to use this website. By using TrendBlogHub, 
          you represent and warrant that you meet this requirement and that you have the legal 
          capacity to enter into these Terms.
        </p>
      ),
    },
    {
      title: '3. User Accounts',
      content: (
        <>
          <p className="mb-3">To access certain features, you may be required to create an account. You agree to:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Provide accurate, current, and complete information during registration.</li>
            <li>Maintain the security of your password and account credentials.</li>
            <li>Promptly update any information that becomes outdated.</li>
            <li>Accept full responsibility for all activities that occur under your account.</li>
            <li>Notify us immediately of any unauthorized use of your account.</li>
          </ul>
        </>
      ),
    },
    {
      title: '4. User-Generated Content',
      content: (
        <>
          <p className="mb-3">
            You retain ownership of any content you submit, post, or display on TrendBlogHub 
            ("User Content"). However, by posting content, you grant us a worldwide, non-exclusive, 
            royalty-free license to use, reproduce, modify, and display such content.
          </p>
          <p className="mb-3">
            You agree <strong className="text-gray-900">NOT</strong> to post content that:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Is unlawful, defamatory, abusive, hateful, or discriminatory.</li>
            <li>Infringes any copyright, trademark, or intellectual property rights.</li>
            <li>Contains viruses, malware, or harmful code.</li>
            <li>Constitutes spam, phishing, or unauthorized advertising.</li>
            <li>Violates the privacy of any third party.</li>
          </ul>
        </>
      ),
    },
    {
      title: '5. Intellectual Property Rights',
      content: (
        <p>
          All content on TrendBlogHub — including text, graphics, logos, icons, images, and 
          software — is the property of TrendBlogHub or its content suppliers and is protected 
          by Indian and international copyright laws. You may not reproduce, distribute, or 
          create derivative works without our prior written permission.
        </p>
      ),
    },
    {
      title: '6. Prohibited Activities',
      content: (
        <>
          <p className="mb-3">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Use the website for any illegal or unauthorized purpose.</li>
            <li>Attempt to gain unauthorized access to our servers or databases.</li>
            <li>Use bots, scrapers, or automated tools to extract data.</li>
            <li>Interfere with or disrupt the website's functionality.</li>
            <li>Impersonate any person or entity.</li>
          </ul>
        </>
      ),
    },
    {
      title: '7. Third-Party Links',
      content: (
        <p>
          TrendBlogHub may contain links to third-party websites or services that are not 
          owned or controlled by us. We have no control over, and assume no responsibility for, 
          the content, privacy policies, or practices of any third-party websites.
        </p>
      ),
    },
    {
      title: '8. Copyright & DMCA Policy',
      content: (
        <p>
          If you believe that any content on TrendBlogHub infringes your copyright, please 
          contact us at{' '}
          <a href="mailto:admin@trendbloghub.com" className="text-blue-600 hover:underline font-medium">
            admin@trendbloghub.com
          </a>{' '}
          with the details of the alleged infringement. We will respond promptly and take appropriate action.
        </p>
      ),
    },
    {
      title: '9. Termination',
      content: (
        <p>
          We reserve the right to suspend or terminate your account and access to TrendBlogHub 
          at any time, without prior notice, if we believe you have violated these Terms or 
          engaged in conduct harmful to the platform or other users.
        </p>
      ),
    },
    {
      title: '10. Disclaimer of Warranties',
      content: (
        <p>
          TrendBlogHub is provided on an "AS IS" and "AS AVAILABLE" basis. We make no 
          warranties, expressed or implied, regarding the accuracy, reliability, or availability 
          of the website or its content. Your use of the website is at your own risk.
        </p>
      ),
    },
    {
      title: '11. Limitation of Liability',
      content: (
        <p>
          In no event shall TrendBlogHub, its owners, or contributors be liable for any indirect, 
          incidental, special, or consequential damages arising out of or in connection with 
          your use of the website.
        </p>
      ),
    },
    {
      title: '12. Changes to Terms',
      content: (
        <p>
          We reserve the right to modify or replace these Terms at any time. Any changes will be 
          effective immediately upon posting on this page. Your continued use of TrendBlogHub 
          after changes are posted constitutes acceptance of the revised Terms.
        </p>
      ),
    },
    {
      title: '13. Governing Law',
      content: (
        <p>
          These Terms shall be governed and construed in accordance with the laws of India. 
          Any disputes arising under these Terms shall be subject to the exclusive jurisdiction 
          of the courts located in India.
        </p>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      
      {/* HERO HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-500 text-sm">
            Last Updated:{' '}
            <span className="font-medium text-gray-700">
              {new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT: INTRO CARD */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                📋 Overview
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Welcome to <span className="font-semibold text-blue-600">TrendBlogHub</span>. 
                These Terms govern your access to and use of our website, services, and content. 
                By using TrendBlogHub, you agree to be bound by these Terms.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Questions?</p>
                <a 
                  href="mailto:admin@trendbloghub.com" 
                  className="text-sm text-blue-600 hover:underline font-medium break-all"
                >
                  admin@trendbloghub.com
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: SECTIONS */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="space-y-8 text-gray-700 leading-relaxed text-[15px]">
                {sections.map((section, idx) => (
                  <section key={idx} className="scroll-mt-24">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                      {section.title}
                    </h2>
                    {section.content}
                  </section>
                ))}

                {/* CONTACT */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                    14. Contact Information
                  </h2>
                  <p className="mb-4">
                    If you have any questions about these Terms &amp; Conditions, please contact us:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📧</span>
                        <span className="font-medium text-gray-700 text-sm">Email:</span>
                        <a 
                          href="mailto:admin@trendbloghub.com" 
                          className="text-blue-600 hover:underline text-sm break-all"
                        >
                          admin@trendbloghub.com
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🌐</span>
                        <span className="font-medium text-gray-700 text-sm">Website:</span>
                        <Link 
                          to="/contact-us" 
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* FOOTER NOTE */}
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
              <p className="text-sm text-blue-900">
                By using TrendBlogHub, you acknowledge that you have read and agree to these 
                Terms &amp; Conditions.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Terms;