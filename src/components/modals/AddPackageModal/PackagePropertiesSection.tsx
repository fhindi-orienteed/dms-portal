import { useTranslation } from "../../../hooks/useTranslation";
interface Props {
  properties: Record<string, boolean>;
  setProperties: (name: string, value: boolean) => void;
}

export default function PackagePropertiesSection({
  properties,
  setProperties,
}: Props) {
  const { t } = useTranslation();


const propsList = [
  { key: "fragile", label: t("AddPackage.fragile") },
  { key: "needsPackaging", label: t("AddPackage.needsPackaging") },
  { key: "recipientFingerprint", label: t("AddPackage.recipientFingerprint") },
  { key: "flammable", label: t("AddPackage.flammable") },
  { key: "destructible", label: t("AddPackage.destructible") },
  { key: "preventOpening", label: t("AddPackage.preventOpening") },
  { key: "deliveryNote", label: t("AddPackage.deliveryNote") },
  { key: "preventMeasuring", label: t("AddPackage.preventMeasuring") },
];

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
       {t(
        "AddPackage.Properties"
       )}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {propsList.map((prop) => {
          const isSelected = properties[prop.key];
          return (
            <div
              key={prop.key}
              onClick={() => setProperties(prop.key, !isSelected)}
              className={`cursor-pointer p-4 rounded-lg border transition ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{prop.label}</span>
                {isSelected && (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
