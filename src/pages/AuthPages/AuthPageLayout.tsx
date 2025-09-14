import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import BranchesCarousel from "../../components/common/BranchesCarousel";
import {
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  AppStoreIcon,
  GooglePlayIcon,
} from "../../icons";
import { useAppConfig } from "../../hooks/useAppConfig";
import type { SocialLink, AppStoreLink } from "../../types";

const iconMap = {
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  AppStoreIcon,
  GooglePlayIcon,
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    companyName,
    companyTagline,
    companyLogo,
    enabledSocialLinks,
    enabledAppStoreLinks,
    enabledBranches,
    contactInfo,
    isFeatureEnabled
  } = useAppConfig();

  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
  };

  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1 w-full h-full">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center justify-center w-full max-w-md px-6 py-8">
              {/* Logo and Company Name */}
              <div className="text-center mb-8">
                <Link to="/" className="block mb-3">
                  <img
                    width={180}
                    height={38}
                    src={companyLogo.auth}
                    alt={`${companyName} Logo`}
                    className="mx-auto"
                  />
                </Link>
                <p className="text-gray-300 dark:text-white/70 text-base font-normal">
                  {companyTagline}
                </p>
              </div>

              {/* Social Links */}
              {isFeatureEnabled('showSocialLinks') && enabledSocialLinks.length > 0 && (
                <div className="flex justify-center space-x-4 mb-8">
                  {enabledSocialLinks.map((link: SocialLink) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
                    >
                      {renderIcon(link.icon)}
                    </a>
                  ))}
                </div>
              )}

              {/* Mobile App Links */}
              {isFeatureEnabled('showAppStoreLinks') && enabledAppStoreLinks.length > 0 && (
                <div className="flex justify-center space-x-3 mb-8">
                  {enabledAppStoreLinks.map((link: AppStoreLink) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 border border-white/20"
                    >
                      {renderIcon(link.icon)}
                      <span className="text-sm font-medium text-white">{link.name}</span>
                    </a>
                  ))}
                </div>
              )}

              {/* Company Branches */}
              {isFeatureEnabled('showBranches') && enabledBranches.length > 0 && (
                <div className="w-full mb-6">
                  <BranchesCarousel branches={enabledBranches} />
                </div>
              )}

              {/* Contact Information */}
              {isFeatureEnabled('showContactInfo') && contactInfo.enabled && (
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-white mb-4 text-center">Contact Us</h3>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Email:</span>
                        <span className="text-gray-300">{contactInfo.email}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Support:</span>
                        <span className="text-gray-300">{contactInfo.support}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Sales:</span>
                        <span className="text-gray-300">{contactInfo.sales}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">24/7 Hotline:</span>
                        <span className="text-gray-300">{contactInfo.hotline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {isFeatureEnabled('showThemeToggle') && (
          <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
            <ThemeTogglerTwo />
          </div>
        )}
      </div>
    </div>
  );
}
