import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { useTranslation } from "../../hooks/useTranslation";
import { Link } from "react-router";

export default function HelpCenter() {
  const { t } = useTranslation();

  const helpTopics = [
    {
      icon: "📦",
      title: "Package Management",
      description: "Learn how to create, track, and manage your packages effectively.",
      articles: [
        { title: "Creating a New Package", link: "#" },
        { title: "Tracking Your Deliveries", link: "#" },
        { title: "Understanding Package Status", link: "#" },
        { title: "Batch Package Creation", link: "#" }
      ]
    },
    {
      icon: "🚚",
      title: "Delivery Services",
      description: "Everything you need to know about our delivery options and services.",
      articles: [
        { title: "Delivery Time Slots", link: "#" },
        { title: "Express vs Standard Delivery", link: "#" },
        { title: "International Shipping", link: "#" },
        { title: "Delivery Confirmation Methods", link: "#" }
      ]
    },
    {
      icon: "💳",
      title: "Billing & Payments",
      description: "Manage your payments, invoices, and subscription plans.",
      articles: [
        { title: "Payment Methods", link: "#" },
        { title: "Understanding Your Invoice", link: "#" },
        { title: "Refund Policy", link: "#" },
        { title: "Subscription Plans", link: "#" }
      ]
    },
    {
      icon: "👤",
      title: "Account Settings",
      description: "Customize your account, security, and notification preferences.",
      articles: [
        { title: "Profile Management", link: "#" },
        { title: "Security & Privacy", link: "#" },
        { title: "Notification Settings", link: "#" },
        { title: "Two-Factor Authentication", link: "#" }
      ]
    },
    {
      icon: "🔧",
      title: "Troubleshooting",
      description: "Solutions to common problems and technical issues.",
      articles: [
        { title: "Login Issues", link: "#" },
        { title: "Tracking Not Updating", link: "#" },
        { title: "Payment Failed", link: "#" },
        { title: "App Performance Issues", link: "#" }
      ]
    },
    {
      icon: "📱",
      title: "Mobile App",
      description: "Get the most out of our mobile application.",
      articles: [
        { title: "Download & Installation", link: "#" },
        { title: "Mobile App Features", link: "#" },
        { title: "Push Notifications", link: "#" },
        { title: "Offline Mode", link: "#" }
      ]
    }
  ];

  const quickActions = [
    { icon: "📞", title: "Contact Support", description: "Get help from our support team", link: "/support" },
    { icon: "❓", title: "FAQ", description: "Browse frequently asked questions", link: "/faq" },
    { icon: "📄", title: "Terms of Service", description: "Read our terms and conditions", link: "/terms" },
    { icon: "🔒", title: "Privacy Policy", description: "Learn about data protection", link: "/privacy" }
  ];

  return (
    <div>
      <PageMeta
        title="Help Center | DMS Portal"
        description="Get help and find answers to your questions"
      />
      <PageBreadcrumb pageTitle={t('otherLinks.helpCenter')} />
      
      <ComponentCard 
        title={t('staticPages.helpTitle')}
        desc={t('staticPages.helpDesc')}
      >
        <div className="mx-auto w-full max-w-[1100px]">
          
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all bg-white dark:bg-gray-800/50"
                >
                  <div className="text-3xl mb-2">{action.icon}</div>
                  <h3 className="font-medium text-gray-800 dark:text-white/90 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Topics */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Browse by Topic
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpTopics.map((topic, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/50"
                >
                  <div className="text-4xl mb-3">{topic.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {topic.description}
                  </p>
                  <ul className="space-y-2">
                    {topic.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <a
                          href={article.link}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                        >
                          <span className="mr-2">→</span>
                          {article.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Video Tutorials */}
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Video Tutorials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Getting Started with DMS Portal", duration: "5:32" },
                { title: "Creating Your First Package", duration: "3:45" },
                { title: "Advanced Tracking Features", duration: "7:18" }
              ].map((video, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800/50"
                >
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 dark:text-white/90 mb-1">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Duration: {video.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Need More Help */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
              Need More Help?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Can't find what you're looking for? Our support team is available 24/7 to assist you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/support"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Contact Support
              </Link>
              <a
                href="tel:+970591234567"
                className="inline-block px-6 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                Call Us: +970 59 123 4567
              </a>
            </div>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}

