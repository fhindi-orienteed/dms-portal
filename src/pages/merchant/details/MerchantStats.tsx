import ComponentCard from "../../../components/common/ComponentCard";
import Badge from "../../../components/ui/badge/Badge";
import Button from "../../../components/ui/button/Button";
import { StatsCard } from "../../../components/ui/stats";
import { BoxIcon, DollarLineIcon, GroupIcon, PlugInIcon, PencilIcon } from "../../../icons";
import { getStatusColor } from "../../../utils/packageUtils";
import { useState } from "react";
import {

  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  MailIcon,
} from "../../../icons";

interface MerchantStatsProps {
  merchant: any;
}

export default function MerchantStats({ merchant }: MerchantStatsProps) {
  
  const socialLinks = {
    facebook: "https://facebook.com/ali.ahmad",
    twitter: "https://twitter.com/ali.ahmad",
    linkedin: "https://linkedin.com/in/aliahmad",
    email: "ali.ahmad@example.com",
  };
  
  const [enabled, setEnabled] = useState(true); 

  const handleToggle = () => {
    setEnabled(!enabled);

  };


  return (
    <ComponentCard title={merchant.merchantName} desc={merchant.description}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={<BoxIcon className="size-4 text-brand-600 dark:text-brand-400" />}
          label="Total Packages"
          value={merchant.totalPackage}
          color="primary"
        />
        <StatsCard
          icon={<PlugInIcon className="size-4 text-success-600 dark:text-success-400" />}
          label="Branches"
          value={merchant.branchCount}
          color="success"
        />
        <StatsCard
          icon={<GroupIcon className="size-4 text-purple-600 dark:text-purple-400" />}
          label="Users"
          value={merchant.userCount}
          color="purple"
        />
        <StatsCard
          icon={<DollarLineIcon className="size-4 text-orange-600 dark:text-orange-400" />}
          label="Total Collections"
          value={<Badge color={getStatusColor(merchant.status)}>{merchant.status}</Badge>}
          color="orange"
        />
      

     
        
      </div>

      {/* Contact Info */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Main Address</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{merchant.mainAddress}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Created Date</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{merchant.createdDate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Account Status</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{merchant.status}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{merchant.phone}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{merchant.email}</p>
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
      </div>
       

      {/* Actions */}
      <div className="mt-6 flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button variant="primary" size="sm" startIcon={<PencilIcon className="size-4" />}>
          Edit Merchant
        </Button>
        <Button
        variant={enabled ? "danger" : "primary"}
        size="sm"
        onClick={handleToggle}
      >
        {enabled ? "Disable Merchant" : "Enable Merchant"}
      </Button>
      </div>
    </ComponentCard>
  );
}
