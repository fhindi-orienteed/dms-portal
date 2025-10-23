import { PageBreadcrumb } from "../../../components/common";
import { FacebookIcon, TwitterIcon, LinkedinIcon, MailIcon } from "../../../icons";

export default function MerchantHeader() {
  const socialLinks = {
    facebook: "https://facebook.com/ali.ahmad",
    twitter: "https://twitter.com/ali.ahmad",
    linkedin: "https://linkedin.com/in/aliahmad",
    email: "ali.ahmad@example.com",
  };

  return (
    <div className="mb-6">
      <PageBreadcrumb 
        pageTitle="Ali Ahmad"
        subtitle="Registration No: REG-20394"
        pageLink="/merchant/list"
        pageLinkText="Merchants"
      />

      <div className="flex items-center gap-3 mt-3">
      {socialLinks.facebook && (
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
            <FacebookIcon className="size-5 text-blue-600 hover:text-blue-700" />
          </a>
        )}
        {socialLinks.twitter && (
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <TwitterIcon className="size-5 text-blue-400 hover:text-blue-500" />
          </a>
        )}
        {socialLinks.linkedin && (
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedinIcon className="size-5 text-blue-700 hover:text-blue-800" />
          </a>
        )}
        {socialLinks.email && (
          <a href={`mailto:${socialLinks.email}`}>
            <MailIcon className="size-5 text-gray-600 hover:text-gray-800" />
          </a>
        )}
      </div>
    </div>
  );
}