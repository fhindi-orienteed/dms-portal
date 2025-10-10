import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { useTranslation } from "../../hooks/useTranslation";

export default function AboutUs() {
  const { t } = useTranslation();

  const stats = [
    { number: "50K+", label: "Deliveries Per Month" },
    { number: "5,000+", label: "Active Users" },
    { number: "99.8%", label: "On-Time Delivery Rate" },
    { number: "24/7", label: "Customer Support" }
  ];

  const team = [
    { name: "User User", role: "CEO & Founder", image: "" },
    { name: "User User", role: "Chief Technology Officer", image: "" },
    { name: "User User", role: "Head of Operations", image: "" },
    { name: "User User", role: "Customer Success Manager", image: "" }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Customer First",
      description: "Our customers are at the heart of everything we do. We continuously innovate to exceed their expectations."
    },
    {
      icon: "⚡",
      title: "Speed & Efficiency",
      description: "We leverage cutting-edge technology to ensure fast, reliable delivery services that meet modern demands."
    },
    {
      icon: "🤝",
      title: "Trust & Transparency",
      description: "We build lasting relationships through honest communication and transparent business practices."
    },
    {
      icon: "🌱",
      title: "Sustainability",
      description: "We're committed to eco-friendly delivery solutions and reducing our environmental footprint."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "We embrace new technologies and ideas to constantly improve our services and user experience."
    },
    {
      icon: "🌍",
      title: "Community Impact",
      description: "We actively contribute to the communities we serve and support local businesses."
    }
  ];

  return (
    <div>
      <PageMeta
        title="About Us | DMS Portal"
        description="Learn about DMS Portal and our mission"
      />
      <PageBreadcrumb pageTitle={t('otherLinks.aboutUs')} />
      
      <div className="space-y-6">
        {/* Hero Section */}
        <ComponentCard 
          title={t('staticPages.aboutTitle')}
          desc={t('staticPages.aboutDesc')}
        >
          <div className="space-y-6">
            {/* Mission Statement */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                To empower businesses and individuals with a seamless, efficient, and reliable delivery management system that brings transparency and trust to every delivery.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ComponentCard>

        {/* Our Story */}
        <ComponentCard 
          title="Our Story"
          desc="How we started and where we're headed"
        >
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
              <p>
                Founded in 2022, DMS Portal emerged from a simple observation: delivery management was unnecessarily complicated, opaque, and frustrating for both businesses and customers. Our founders, having experienced these challenges firsthand, set out to create a solution that would transform the delivery experience.
              </p>
              <p>
                Starting with a small team of passionate developers and logistics experts, we built a platform from the ground up that prioritizes user experience, real-time transparency, and operational efficiency. What began as a local delivery tracking system has evolved into a comprehensive delivery management platform serving thousands of users across the region.
              </p>
              <p>
                Today, DMS Portal powers deliveries for businesses of all sizes—from individual entrepreneurs to large enterprises. Our platform handles everything from package creation and tracking to route optimization and customer notifications, all while maintaining the simplicity and reliability that our users have come to expect.
              </p>
              <p>
                As we continue to grow, our commitment remains unchanged: to make delivery management simple, transparent, and accessible to everyone.
              </p>
            </div>
          </div>
        </ComponentCard>

        {/* Our Values */}
        <ComponentCard 
          title="Our Values"
          desc="The principles that guide everything we do"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </ComponentCard>

        {/* Leadership Team */}
        <ComponentCard 
          title="Leadership Team"
          desc="Meet the people behind DMS Portal"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-4xl text-white font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white/90 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </ComponentCard>

        {/* What We Offer */}
        <ComponentCard 
          title="What We Offer"
          desc="Comprehensive delivery management solutions"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white/90 mb-1">Real-Time Tracking</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Track your packages in real-time with GPS-enabled live updates and accurate ETAs.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white/90 mb-1">Smart Notifications</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Stay informed with automated notifications via email, SMS, and push notifications.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white/90 mb-1">Analytics Dashboard</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Gain insights with comprehensive analytics and reporting tools.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white/90 mb-1">Route Optimization</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered route planning to ensure the fastest and most efficient deliveries.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white/90 mb-1">Multi-Platform Access</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Access your deliveries from web, mobile apps (iOS & Android), or API integration.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white/90 mb-1">24/7 Support</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Round-the-clock customer support to assist you whenever you need help.</p>
                </div>
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* Join Us */}
        <ComponentCard 
          title="Join Our Journey"
          desc="Be part of the delivery revolution"
        >
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Whether you're a business looking to streamline your delivery operations or an individual seeking reliable package tracking, we're here to help you every step of the way.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/signup"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Get Started Today
              </a>
              <a
                href="/support"
                className="inline-block px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Contact Us
              </a>
            </div>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}

