import { useState } from "react";
import { Button, Loader } from "../../components/ui";
import { IntegrationCard } from "../../components/integrations";

interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  isActive: boolean;
}

const Integrations: React.FC = () => {
  const [isLoading] = useState(false);
  
  // Hardcoded integrations data based on the provided image
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "mailchimp",
      name: "Mailchimp",
      description: "Connect Mailchimp to streamline your email marketing - automate campaigns.",
      logo: "https://cdn.worldvectorlogo.com/logos/mailchimp-freddie-icon.svg",
      isActive: true,
    },
    {
      id: "google-meet",
      name: "Google Meet",
      description: "Connect your Google Meet account for seamless video conferencing.",
      logo: "https://cdn.worldvectorlogo.com/logos/google-meet-2020-.svg",
      isActive: false,
    },
    {
      id: "zoom",
      name: "Zoom",
      description: "Integrate Zoom to streamline your virtual meetings and team collaborations.",
      logo: "https://cdn.worldvectorlogo.com/logos/zoom-communications-logo.svg",
      isActive: false,
    },
    {
      id: "loom",
      name: "Loom",
      description: "Integrate Loom to easily record, share, and manage video messages.",
      logo: "https://cdn.worldvectorlogo.com/logos/loom-icon.svg",
      isActive: false,
    },
    {
      id: "linear",
      name: "Linear",
      description: "Integrate Linear to manage issues, track progress, and streamline your team's.",
      logo: "https://cdn.worldvectorlogo.com/logos/linear-logo.svg",
      isActive: false,
    },
    {
      id: "gmail",
      name: "Gmail",
      description: "Integrate Gmail to send, receive, and manage emails directly from your workspace.",
      logo: "https://cdn.worldvectorlogo.com/logos/gmail-icon.svg",
      isActive: false,
    },
    {
      id: "trello",
      name: "Trello",
      description: "Capture, organize, and tackle your to-dos from anywhere.",
      logo: "https://cdn.worldvectorlogo.com/logos/trello.svg",
      isActive: false,
    },
    {
      id: "notion",
      name: "Notion",
      description: "Capture, organize, and tackle your to-dos from anywhere.",
      logo: "https://cdn.worldvectorlogo.com/logos/notion-logo-1.svg",
      isActive: false,
    },
    {
      id: "jira",
      name: "Jira",
      description: "Track issues and manage projects with ease and full team visibility.",
      logo: "https://cdn.worldvectorlogo.com/logos/jira-1.svg",
      isActive: false,
    },
  ]);

  const handleToggleIntegration = (id: string, isActive: boolean) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, isActive }
          : integration
      )
    );
    console.log(`Integration ${id} ${isActive ? 'activated' : 'deactivated'}`);
  };

  const handleIntegrationDetails = (id: string) => {
    console.log(`View details for integration: ${id}`);
    // Placeholder function - will be implemented later
  };

  const handleIntegrationSettings = (id: string) => {
    console.log(`Open settings for integration: ${id}`);
    // Placeholder function - will be implemented later
  };

  const handleAddNewIntegration = () => {
    console.log("Add new integration clicked");
    // Placeholder function - will be implemented later
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader variant="modern" size="lg" text="Loading integrations..." />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Integrations
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Connect your favorite tools and services to streamline your workflow
          </p>
        </div>
        
        <Button
          variant="primary"
          size="md"
          onClick={handleAddNewIntegration}
          className="mt-4 sm:mt-0"
          startIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          Add New Integration
        </Button>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            id={integration.id}
            name={integration.name}
            description={integration.description}
            logo={integration.logo}
            isActive={integration.isActive}
            onToggle={handleToggleIntegration}
            onDetails={handleIntegrationDetails}
            onSettings={handleIntegrationSettings}
          />
        ))}
      </div>

      {/* Empty State (if no integrations) */}
      {integrations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No integrations available
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Get started by adding your first integration to connect your tools.
          </p>
          <Button
            variant="primary"
            onClick={handleAddNewIntegration}
            startIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Add Integration
          </Button>
        </div>
      )}
    </div>
  );
};

export default Integrations;
