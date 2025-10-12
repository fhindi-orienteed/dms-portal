import GenericDataTable from "../../../components/tables/DataTables/GenericDataTable";
import Badge from "../../../components/ui/badge/Badge";

interface AddressesTabProps {
  addresses: any[];
}

export default function AddressesTab({ addresses }: AddressesTabProps) {
  const columns = [
    {
      header: "Type",
      accessor: (address: any) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800 dark:text-white/90">{address.type}</span>
          {address.isDefault && (
            <Badge color="primary">Default</Badge>
          )}
        </div>
      )
    },
    {
      header: "Address",
      accessor: (address: any) => (
        <span className="text-gray-600 dark:text-gray-400">{address.address}</span>
      )
    }
  ];

  return (
    <GenericDataTable
      data={addresses}
      columns={columns}
      itemsPerPage={10}
      showPagination={false}
      emptyMessage="No addresses found for this customer."
    />
  );
}

