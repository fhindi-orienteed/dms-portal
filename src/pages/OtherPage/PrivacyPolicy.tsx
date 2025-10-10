import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { useTranslation } from "../../hooks/useTranslation";

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  
  return (
    <div>
      <PageMeta
        title="Privacy Policy | DMS Portal"
        description="Privacy Policy for DMS Portal"
      />
      <PageBreadcrumb pageTitle={t('otherLinks.privacyPolicy')} />
      
      <ComponentCard 
        title={t('staticPages.privacyTitle')}
        desc={t('staticPages.privacyDesc')}
      >
        <div className="mx-auto w-full">
          <div className="space-y-6 text-gray-600 dark:text-gray-400">
            
            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                1. Information We Collect
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-3">
                We collect information to provide better services to our users. The types of information we collect include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base ml-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and delivery addresses</li>
                <li><strong>Package Information:</strong> Tracking numbers, delivery details, package contents descriptions, and delivery preferences</li>
                <li><strong>Account Information:</strong> Username, password (encrypted), account settings, and preferences</li>
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on platform, and interaction patterns</li>
                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers, and mobile network information</li>
                <li><strong>Location Data:</strong> GPS data for delivery tracking and route optimization (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                2. How We Use Your Information
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-3">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base ml-4">
                <li>Process and manage your deliveries and track packages</li>
                <li>Communicate with you about your orders, deliveries, and account</li>
                <li>Send notifications and updates about delivery status</li>
                <li>Improve our services, develop new features, and enhance user experience</li>
                <li>Optimize delivery routes and scheduling</li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>Detect, prevent, and address technical issues, fraud, and security threats</li>
                <li>Comply with legal obligations and enforce our terms</li>
                <li>Conduct analytics and research to improve our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                3. Information Sharing and Disclosure
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-3">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base ml-4">
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
                <li><strong>Delivery Partners:</strong> Sharing necessary information with courier services to complete deliveries</li>
                <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our platform (cloud hosting, payment processing, analytics)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Protection of Rights:</strong> To protect our rights, property, safety, or that of our users</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                4. Data Security
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                We implement industry-standard security measures to protect your personal information, including encryption, secure socket layer (SSL) technology, firewalls, and secure server infrastructure. We regularly update our security practices and conduct security audits. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                5. Data Retention
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we securely delete or anonymize it. Delivery records are typically retained for 7 years to comply with legal and accounting requirements.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                6. Your Rights and Choices
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-3">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data we hold</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal requirements)</li>
                <li><strong>Objection:</strong> Object to processing of your data for certain purposes</li>
                <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
                <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
              </ul>
              <p className="text-sm sm:text-base leading-relaxed mt-3">
                To exercise these rights, please contact us through your account settings or our support team.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                7. Cookies and Tracking Technologies
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our service. We use session cookies, persistent cookies, and analytics tools to improve our platform.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                8. Children's Privacy
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information immediately.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                9. International Data Transfers
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                11. Contact Us
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm">Email: privacy@dmsportal.com</p>
                <p className="text-sm mt-1">Phone: +970 59 XXX XXXX</p>
                <p className="text-sm mt-1">Or use our Contact Support page</p>
              </div>
            </section>

            <section className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {t('staticPages.lastUpdated')}: October 10, 2025
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                {t('staticPages.version')} 1.0
              </p>
            </section>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}

