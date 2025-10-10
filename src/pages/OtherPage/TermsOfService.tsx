import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { useTranslation } from "../../hooks/useTranslation";

export default function TermsOfService() {
  const { t } = useTranslation();
  
  return (
    <div>
      <PageMeta
        title="Terms of Service | DMS Portal"
        description="Terms of Service for DMS Portal"
      />
      <PageBreadcrumb pageTitle={t('otherLinks.termsOfService')} />
      
      <ComponentCard 
        title={t('staticPages.termsTitle')}
        desc={t('staticPages.termsDesc')}
      >
      <div className="mx-auto w-full" >
          <div className="space-y-6 text-gray-600 dark:text-gray-400">
            
            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                1. Acceptance of Terms
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                By accessing and using the DMS Portal delivery management system, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service. Your continued use of the service constitutes acceptance of any modifications to these terms.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                2. Service Description
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                DMS Portal provides a comprehensive delivery management platform that enables businesses and individuals to track, manage, and coordinate package deliveries. Our services include real-time tracking, delivery scheduling, package status updates, and customer notifications.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                3. User Account and Registration
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-3">
                To access certain features of our service, you must register for an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base ml-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security and confidentiality of your account credentials</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                4. Acceptable Use Policy
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-3">
                You agree not to use the service to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit harmful, fraudulent, or deceptive content</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Attempt to gain unauthorized access to any portion of the service</li>
                <li>Use the service for any illegal or unauthorized purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                5. Service Availability and Modifications
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                We strive to maintain continuous service availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time, with or without notice. We shall not be liable for any modification, suspension, or discontinuance of the service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                6. Intellectual Property Rights
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                All content, features, and functionality of the DMS Portal, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are the exclusive property of DMS Portal or its licensors and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                7. Delivery Terms and Liability
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-3">
                Regarding package deliveries:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base ml-4">
                <li>Delivery times are estimates and not guaranteed</li>
                <li>We are not responsible for delays due to circumstances beyond our control</li>
                <li>Customers must provide accurate delivery information</li>
                <li>Packages must comply with our prohibited items policy</li>
                <li>Claims for lost or damaged packages must be filed within 30 days</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                8. Limitation of Liability
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                To the maximum extent permitted by law, DMS Portal shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or other intangible losses resulting from your use of or inability to use the service. Our total liability shall not exceed the amount paid by you for the service in the past 12 months.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                9. Indemnification
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                You agree to indemnify, defend, and hold harmless DMS Portal, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or related to your use of the service, violation of these terms, or violation of any rights of another party.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                10. Termination
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                We reserve the right to terminate or suspend your account and access to the service at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties, or for any other reason. Upon termination, your right to use the service will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                11. Governing Law and Dispute Resolution
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                These terms shall be governed by and construed in accordance with applicable laws. Any disputes arising out of or relating to these terms or the service shall be resolved through binding arbitration, except that either party may seek injunctive relief in court to prevent infringement of intellectual property rights.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                12. Changes to Terms
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on this page and updating the "Last updated" date. Your continued use of the service after any such changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-gray-800 text-xl dark:text-white/90">
                13. Contact Information
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                If you have any questions about these Terms of Service, please contact us through our support page or email us at legal@dmsportal.com.
              </p>
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

