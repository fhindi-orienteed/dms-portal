import ComponentCard from "../../../components/common/ComponentCard";
import { DriverDetails } from "./mockData";

interface ContactsTabProps {
  driver: DriverDetails;
}

export default function ContactsTab({ driver }: ContactsTabProps) {
  return (
    <div className="space-y-6">
      <ComponentCard title="Emergency Contacts" desc="Driver emergency contact information">
        <div className="space-y-4">
          {driver.emergencyContacts.map((contact, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{contact.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{contact.relationship}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900 dark:text-white">{contact.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ComponentCard>

      {driver.notes && (
        <ComponentCard title="Notes" desc="Additional information about the driver">
          <p className="text-gray-700 dark:text-gray-300">{driver.notes}</p>
        </ComponentCard>
      )}
    </div>
  );
}
