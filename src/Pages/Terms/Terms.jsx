import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* HEADER */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6 border border-gray-100">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-500 text-sm">
            Last Updated: <span className="font-medium">{new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Welcome to <span className="font-semibold text-blue-600">TrendBlogHub</span>. 
            These Terms &amp; Conditions ("Terms") govern your access to and use of our website, 
            services, and content. By accessing or using TrendBlogHub, you agree to be bound by 
            these Terms. If you do not agree with any part of these Terms, please do not use our website.
          </p>
        </div>

        {/* CONTENT */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 space-y-8 text-gray-700 leading-relaxed">

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or using TrendBlogHub, you acknowledge that you have read, 
              understood, and agreed to be bound by these Terms and our Privacy Policy. These Terms 
              apply to all visitors, users, and others who access or use the service.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Eligibility</h2>
            <p>
              You must be at least 13 years of age to use this website. By using TrendBlogHub, 
              you represent and warrant that you meet this requirement and that you have the legal 
              capacity to enter into these Terms.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
            <p className="mb-2">
              To access certain features, you may be required to create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide accurate, current, and complete information during registration.</li>
              <li>Maintain the security of your password and account credentials.</li>
              <li>Promptly update any information that becomes outdated.</li>
              <li>Accept full responsibility for all activities that occur under your account.</li>
              <li>Notify us immediately of any unauthorized use of your account.</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. User-Generated Content</h2>
            <p className="mb-2">
              You retain ownership of any content you submit, post, or display on TrendBlogHub 
              ("User Content"). However, by posting content, you grant us a worldwide, non-exclusive, 
              royalty-free license to use, reproduce, modify, and display such content.
            </p>
            <p className="mb-2">You agree <span className="font-semibold">NOT</span> to post content that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Is unlawful, defamatory, abusive, hateful, or discriminatory.</li>
              <li>Infringes any copyright, trademark, or intellectual property rights.</li>
              <li>Contains viruses, malware, or harmful code.</li>
              <li>Constitutes spam, phishing, or unauthorized advertising.</li>
              <li>Violates the privacy of any third party.</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Intellectual Property Rights</h2>
            <p>
              All content on TrendBlogHub — including text, graphics, logos, icons, images, and 
              software — is the property of TrendBlogHub or its content suppliers and is protected 
              by Indian and international copyright laws. You may not reproduce, distribute, or 
              create derivative works without our prior written permission.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Prohibited Activities</h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the website for any illegal or unauthorized purpose.</li>
              <li>Attempt to gain unauthorized access to our servers or databases.</li>
              <li>Use bots, scrapers, or automated tools to extract data.</li>
              <li>Interfere with or disrupt the website's functionality.</li>
              <li>Impersonate any person or entity.</li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Third-Party Links</h2>
            <p>
              TrendBlogHub may contain links to third-party websites or services that are not 
              owned or controlled by us. We have no control over, and assume no responsibility for, 
              the content, privacy policies, or practices of any third-party websites.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Copyright &amp; DMCA Policy</h2>
            <p>
              If you believe that any content on TrendBlogHub infringes your copyright, please 
              contact us at <a href="mailto:admin@trendbloghub.com" className="text-blue-600 hover:underline">admin@trendbloghub.com</a> with 
              the details of the alleged infringement. We will respond promptly and take appropriate action.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account and access to TrendBlogHub 
              at any time, without prior notice, if we believe you have violated these Terms or 
              engaged in conduct harmful to the platform or other users.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Disclaimer of Warranties</h2>
            <p>
              TrendBlogHub is provided on an "AS IS" and "AS AVAILABLE" basis. We make no 
              warranties, expressed or implied, regarding the accuracy, reliability, or availability 
              of the website or its content. Your use of the website is at your own risk.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">11. Limitation of Liability</h2>
            <p>
              In no event shall TrendBlogHub, its owners, or contributors be liable for any indirect, 
              incidental, special, or consequential damages arising out of or in connection with 
              your use of the website.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">12. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. Any changes will be 
              effective immediately upon posting on this page. Your continued use of TrendBlogHub 
              after changes are posted constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">13. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India. 
              Any disputes arising under these Terms shall be subject to the exclusive jurisdiction 
              of the courts located in India.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">14. Contact Information</h2>
            <p>
              If you have any questions about these Terms &amp; Conditions, please contact us:
            </p>
            <ul className="list-none pl-0 mt-3 space-y-1">
              <li>📧 Email: <a href="mailto:admin@trendbloghub.com" className="text-blue-600 hover:underline">admin@trendbloghub.com</a></li>
              <li>🌐 Website: <Link to="/contact-us" className="text-blue-600 hover:underline">Contact Us</Link></li>
            </ul>
          </section>

        </div>

        {/* FOOTER NOTE */}
        <p className="text-center text-sm text-gray-500 mt-8">
          By using TrendBlogHub, you acknowledge that you have read and agree to these Terms &amp; Conditions.
        </p>

      </div>
    </div>
  );
};

export default Terms;