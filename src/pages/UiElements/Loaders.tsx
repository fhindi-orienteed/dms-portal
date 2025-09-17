import { useState } from "react";
import { Loader } from "../../components/ui";
import { ComponentCard, PageBreadcrumb } from "../../components/common";
import Button from "../../components/ui/button/Button";

const Loaders = () => {
  const [overlayLoading, setOverlayLoading] = useState(false);

  const handleOverlayDemo = () => {
    setOverlayLoading(true);
    setTimeout(() => {
      setOverlayLoading(false);
    }, 3000);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <PageBreadcrumb pageTitle="Loaders" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Spinner Loaders */}
        <ComponentCard
          title="Spinner Loaders"
          desc="Classic spinning circle loaders in different sizes and colors"
        >
          <div className="space-y-6">
            {/* Different Sizes */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Sizes
              </h4>
              <div className="flex items-center gap-4">
                <Loader variant="spinner" size="xs" />
                <Loader variant="spinner" size="sm" />
                <Loader variant="spinner" size="md" />
                <Loader variant="spinner" size="lg" />
                <Loader variant="spinner" size="xl" />
              </div>
            </div>

            {/* Different Colors */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Colors
              </h4>
              <div className="flex items-center gap-4">
                <Loader variant="spinner" color="primary" />
                <Loader variant="spinner" color="secondary" />
                <Loader variant="spinner" color="gray" />
                <div className="bg-gray-800 p-2 rounded">
                  <Loader variant="spinner" color="white" />
                </div>
              </div>
            </div>

            {/* With Text */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                With Text
              </h4>
              <Loader variant="spinner" text="Loading..." />
            </div>
          </div>
        </ComponentCard>

        {/* Dots Loaders */}
        <ComponentCard
          title="Dots Loaders"
          desc="Animated dots loaders with pulsing effect"
        >
          <div className="space-y-6">
            {/* Different Sizes */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Sizes
              </h4>
              <div className="flex items-center gap-4">
                <Loader variant="dots" size="xs" />
                <Loader variant="dots" size="sm" />
                <Loader variant="dots" size="md" />
                <Loader variant="dots" size="lg" />
                <Loader variant="dots" size="xl" />
              </div>
            </div>

            {/* Different Colors */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Colors
              </h4>
              <div className="flex items-center gap-4">
                <Loader variant="dots" color="primary" />
                <Loader variant="dots" color="secondary" />
                <Loader variant="dots" color="gray" />
              </div>
            </div>

            {/* With Text */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                With Text
              </h4>
              <Loader variant="dots" text="Processing..." />
            </div>
          </div>
        </ComponentCard>

        {/* Pulse Loaders */}
        <ComponentCard
          title="Pulse Loaders"
          desc="Simple pulsing circle loaders"
        >
          <div className="space-y-6">
            {/* Different Sizes */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Sizes
              </h4>
              <div className="flex items-center gap-4">
                <Loader variant="pulse" size="xs" />
                <Loader variant="pulse" size="sm" />
                <Loader variant="pulse" size="md" />
                <Loader variant="pulse" size="lg" />
                <Loader variant="pulse" size="xl" />
              </div>
            </div>

            {/* Different Colors */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Colors
              </h4>
              <div className="flex items-center gap-4">
                <Loader variant="pulse" color="primary" />
                <Loader variant="pulse" color="secondary" />
                <Loader variant="pulse" color="gray" />
              </div>
            </div>

            {/* With Text */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                With Text
              </h4>
              <Loader variant="pulse" text="Please wait..." />
            </div>
          </div>
        </ComponentCard>

        {/* Bars Loaders */}
        <ComponentCard
          title="Bars Loaders"
          desc="Animated vertical bars loaders"
        >
          <div className="space-y-6">
            {/* Different Sizes */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Sizes
              </h4>
              <div className="flex items-center gap-4">
                <Loader variant="bars" size="xs" />
                <Loader variant="bars" size="sm" />
                <Loader variant="bars" size="md" />
                <Loader variant="bars" size="lg" />
                <Loader variant="bars" size="xl" />
              </div>
            </div>

            {/* Different Colors */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Colors
              </h4>
              <div className="flex items-center gap-4">
                <Loader variant="bars" color="primary" />
                <Loader variant="bars" color="secondary" />
                <Loader variant="bars" color="gray" />
              </div>
            </div>

            {/* With Text */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                With Text
              </h4>
              <Loader variant="bars" text="Loading data..." />
            </div>
          </div>
        </ComponentCard>

        {/* Skeleton Loaders */}
        <ComponentCard
          title="Skeleton Loaders"
          desc="Content placeholder loaders for better UX"
          className="lg:col-span-2"
        >
          <div className="space-y-6">
            {/* Different Sizes */}
            <div>
              <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Sizes
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="mb-2 text-xs text-gray-500">Extra Small</p>
                  <Loader variant="skeleton" size="xs" />
                </div>
                <div>
                  <p className="mb-2 text-xs text-gray-500">Small</p>
                  <Loader variant="skeleton" size="sm" />
                </div>
                <div>
                  <p className="mb-2 text-xs text-gray-500">Medium</p>
                  <Loader variant="skeleton" size="md" />
                </div>
                <div>
                  <p className="mb-2 text-xs text-gray-500">Large</p>
                  <Loader variant="skeleton" size="lg" />
                </div>
                <div>
                  <p className="mb-2 text-xs text-gray-500">Extra Large</p>
                  <Loader variant="skeleton" size="xl" />
                </div>
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* Overlay Loader */}
        <ComponentCard
          title="Overlay Loader"
          desc="Loader that overlays content with backdrop blur"
          className="lg:col-span-2"
        >
          <div className="space-y-4">
            <Button onClick={handleOverlayDemo} disabled={overlayLoading}>
              {overlayLoading ? "Loading..." : "Demo Overlay Loader"}
            </Button>

            <Loader
              variant="spinner"
              overlay={overlayLoading}
              text="Loading content..."
              size="lg"
            >
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
                  Sample Content
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  This is some sample content that will be overlaid with a loader
                  when you click the button above. The overlay includes a backdrop
                  blur effect for better visual separation.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded dark:bg-gray-600"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-600"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 dark:bg-gray-600"></div>
                </div>
              </div>
            </Loader>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
};

export default Loaders;
