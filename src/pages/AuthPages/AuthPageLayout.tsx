import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import {
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  AppStoreIcon,
  GooglePlayIcon,
} from "../../icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-md px-6">
              {/* Logo and Company Name */}
              <Link to="/" className="block mb-6">
                <img
                  width={231}
                  height={48}
                  src="/images/logo/auth-logo.svg"
                  alt="Logo"
                />
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60 mb-8">
                Delivery Management System
              </p>

              {/* Social Links */}
              <div className="flex space-x-4 mb-8">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <TwitterIcon className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FacebookIcon className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <LinkedinIcon className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <PinterestIcon className="w-6 h-6" />
                </a>
              </div>

              {/* Mobile App Links */}
              <div className="flex space-x-3 mb-8">
                <a href="#" className="flex items-center space-x-2 bg-black/20 hover:bg-black/30 px-4 py-2 rounded-lg transition-colors">
                  <AppStoreIcon className="w-5 h-5" />
                  <span className="text-sm text-white">App Store</span>
                </a>
                <a href="#" className="flex items-center space-x-2 bg-black/20 hover:bg-black/30 px-4 py-2 rounded-lg transition-colors">
                  <GooglePlayIcon className="w-5 h-5" />
                  <span className="text-sm text-white">Google Play</span>
                </a>
              </div>

              {/* Company Branches */}
              <div className="w-full mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Our Branches</h3>
                <div className="space-y-3">                 
                  <div className="bg-black/20 rounded-lg p-3">
                    <h4 className="text-white font-medium">Palestine - Nablus</h4>
                    <p className="text-gray-400 text-sm">Nablus, Palestine</p>
                    <p className="text-gray-400 text-sm">Nablus, Palestine</p>
                    <p className="text-gray-400 text-sm">+970 59 999 9999</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="w-full">
                <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                <div className="space-y-2 text-center">
                  <p className="text-gray-400 text-sm">
                    <span className="text-white">Email:</span> info@dms.com
                  </p>
                  <p className="text-gray-400 text-sm">
                    <span className="text-white">Support:</span> support@dms.com
                  </p>
                  <p className="text-gray-400 text-sm">
                    <span className="text-white">Sales:</span> sales@dms.com
                  </p>
                  <p className="text-gray-400 text-sm">
                    <span className="text-white">24/7 Hotline:</span> +970 59 999 9999
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
