import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Accordion from "../../components/common/Accordion";
import { useTranslation } from "../../hooks/useTranslation";

export default function FAQ() {
  const { t } = useTranslation();

  const faqItems = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button on the homepage, fill in your details including name, email, and password, verify your email address through the confirmation link sent to your inbox, and you're ready to start using DMS Portal."
        },
        {
          question: "What information do I need to provide during registration?",
          answer: "You'll need to provide your full name, email address, phone number, and a secure password. For business accounts, you may also need to provide your company name and address."
        }
      ]
    },
    {
      category: "Package Tracking",
      questions: [
        {
          question: "How do I track my package?",
          answer: "You can track your package by entering your tracking number in the tracking section on the homepage, or by logging into your account and viewing 'My Packages'. You'll see real-time updates on your package's location and estimated delivery time."
        },
        {
          question: "What do the different package statuses mean?",
          answer: "Pending: Your package is awaiting pickup. In Transit: Your package is on its way to the destination. Out for Delivery: Your package is with the delivery driver and will arrive today. Delivered: Your package has been successfully delivered. Failed Delivery: There was an issue with delivery - check notifications for details."
        },
        {
          question: "Can I track multiple packages at once?",
          answer: "Yes! In your account dashboard, you can view all your active packages. You can also add tracking numbers to your watchlist for quick access to multiple shipments."
        }
      ]
    },
    {
      category: "Delivery Management",
      questions: [
        {
          question: "How can I change my delivery address?",
          answer: "You can update your delivery address in Account Settings > Delivery Addresses. Note that you cannot change the address once a package is already out for delivery. Contact support immediately if you need urgent address changes."
        },
        {
          question: "Can I schedule a specific delivery time?",
          answer: "Yes, delivery time preferences can be set when creating a package or in the package details. Available time slots depend on your location and the delivery service selected. Premium users have access to more flexible scheduling options."
        },
        {
          question: "What should I do if I'm not home during delivery?",
          answer: "You can set delivery preferences in your account: leave package at door, deliver to neighbor, require signature, or hold at facility. You'll receive notifications before delivery so you can adjust preferences or reschedule."
        }
      ]
    },
    {
      category: "Notifications",
      questions: [
        {
          question: "How do I manage my notification preferences?",
          answer: "Go to Settings > Notifications to customize how you receive updates. You can choose to receive notifications via email, SMS, or in-app alerts. You can also select which events trigger notifications (pickup, in transit, out for delivery, delivered, etc.)."
        },
        {
          question: "Why am I not receiving delivery notifications?",
          answer: "Check that notifications are enabled in Settings > Notifications, verify your email address and phone number are correct, check your email spam folder, and ensure your device allows push notifications from DMS Portal."
        }
      ]
    },
    {
      category: "Issues and Support",
      questions: [
        {
          question: "What should I do if my package is delayed?",
          answer: "Check the tracking page for the latest updates and expected delivery time. Delays can occur due to weather, high package volume, or address issues. If your package is significantly delayed, contact our support team with your tracking number for assistance."
        },
        {
          question: "How do I report a missing or damaged package?",
          answer: "Go to My Packages, select the affected package, and click 'Report Issue'. Choose 'Missing Package' or 'Damaged Package', provide details and photos if applicable, and submit. Our support team will investigate and respond within 24-48 hours."
        },
        {
          question: "What if the delivery address is incorrect?",
          answer: "If the package hasn't shipped yet, you can update the address in package details. If it's already in transit, contact support immediately with your tracking number. We'll attempt to redirect the package, though additional fees may apply."
        }
      ]
    },
    {
      category: "Payments and Pricing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and for business accounts, we offer invoicing with NET-30 terms."
        },
        {
          question: "How is delivery cost calculated?",
          answer: "Delivery costs are based on package weight, dimensions, distance, delivery speed (standard, express, same-day), and any additional services (signature required, insurance, etc.). You can see the exact cost before confirming your delivery."
        }
      ]
    },
    {
      category: "Account Management",
      questions: [
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page, enter your email address, check your email for a password reset link, click the link and create a new password. The reset link expires after 24 hours."
        },
        {
          question: "Can I have multiple delivery addresses?",
          answer: "Yes! You can save multiple addresses in your account. Go to Settings > Addresses to add, edit, or remove delivery locations. You can set a default address or choose a different one for each package."
        },
        {
          question: "How do I delete my account?",
          answer: "Go to Settings > Account > Delete Account. You'll be asked to confirm your decision. Note that deleting your account will remove all your data including delivery history. Active deliveries must be completed before account deletion."
        }
      ]
    }
  ];

  return (
    <div>
      <PageMeta
        title="FAQ | DMS Portal"
        description="Frequently Asked Questions about DMS Portal"
      />
      <PageBreadcrumb pageTitle={t('otherLinks.faq')} />
      
      <ComponentCard 
        title={t('staticPages.faqTitle')}
        desc={t('staticPages.faqDesc')}
      >
        <div className="mx-auto w-full">
          <div className="space-y-8">
            {faqItems.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
                  {category.category}
                </h2>
                <Accordion items={category.questions} />
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-medium text-gray-800 dark:text-white/90 mb-2">
              Still have questions?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Can't find the answer you're looking for? Our support team is here to help you.
            </p>
            <a
              href="/support"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Contact Support
            </a>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}

