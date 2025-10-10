import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { useTranslation } from "../../hooks/useTranslation";
import { useState } from "react";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import { showToast } from "../../utils/toast";

export default function ContactSupport() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    priority: "",
    message: ""
  });

  const categories = [
    { value: "technical", label: "Technical Issue" },
    { value: "delivery", label: "Delivery Problem" },
    { value: "billing", label: "Billing & Payments" },
    { value: "account", label: "Account Management" },
    { value: "feature", label: "Feature Request" },
    { value: "other", label: "Other" }
  ];

  const priorities = [
    { value: "low", label: "Low - General Inquiry" },
    { value: "medium", label: "Medium - Needs Attention" },
    { value: "high", label: "High - Urgent Issue" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextAreaChange = (value: string) => {
    setFormData({ ...formData, message: value });
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    showToast.success("Support request submitted successfully! We'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      priority: "",
      message: ""
    });
  };

  return (
    <div>
      <PageMeta
        title="Contact Support | DMS Portal"
        description="Get in touch with our support team"
      />
      <PageBreadcrumb pageTitle={t('otherLinks.contactSupport')} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ComponentCard 
            title={t('staticPages.supportTitle')}
            desc={t('staticPages.supportDesc')}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              {/* Phone and Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+970 59 123 4567"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>
              </div>

              {/* Category and Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    options={categories}
                    placeholder="Select a category"
                    defaultValue={formData.category}
                    onChange={handleSelectChange("category")}
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority *</Label>
                  <Select
                    options={priorities}
                    placeholder="Select priority level"
                    defaultValue={formData.priority}
                    onChange={handleSelectChange("priority")}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">Message *</Label>
                <TextArea
                  placeholder="Please provide detailed information about your issue or inquiry..."
                  rows={6}
                  value={formData.message}
                  onChange={handleTextAreaChange}
                />
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Include any relevant details such as tracking numbers, error messages, or steps to reproduce the issue.
                </p>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Submit Support Request
                </button>
              </div>
            </form>
          </ComponentCard>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <ComponentCard 
            title="Contact Information"
            desc="Other ways to reach us"
          >
            <div className="space-y-6">
              {/* Email Support */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800 dark:text-white/90 mb-1">Email Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">support@dmsportal.com</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Response time: 24 hours</p>
                </div>
              </div>

              {/* Phone Support */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800 dark:text-white/90 mb-1">Phone Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">+970 59 123 4567</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Available 24/7</p>
                </div>
              </div>

              {/* Live Chat */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800 dark:text-white/90 mb-1">Live Chat</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Available in app</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Average wait: 2 minutes</p>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800 dark:text-white/90 mb-1">Office Address</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    123 Delivery Street<br />
                    Ramallah, Palestine<br />
                    Postal Code: 12345
                  </p>
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* Business Hours */}
          <ComponentCard 
            title="Business Hours"
            desc="When we're available"
          >
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Monday - Friday</span>
                <span className="font-medium text-gray-800 dark:text-white/90">8:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Saturday</span>
                <span className="font-medium text-gray-800 dark:text-white/90">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Sunday</span>
                <span className="font-medium text-gray-800 dark:text-white/90">10:00 AM - 4:00 PM</span>
              </div>
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  * Emergency support available 24/7 for urgent delivery issues
                </p>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
}

