import GenericDataTable from "../../../components/tables/DataTables/GenericDataTable";
import Button from "../../../components/ui/button/Button";

interface PriceItem {
  id: number;
  service: string;
  destination: string;
  price: number;
}

interface PriceListTabProps {
  prices: PriceItem[];
  onAddPrice: (price: PriceItem) => void;
}

export default function PriceListTab({ prices, onAddPrice }: PriceListTabProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Price List</h3>
        <Button
          onClick={() =>
            onAddPrice({
              id: prices.length + 1,
              service: "New Service",
              destination: "New City",
              price: 0,
            })
          }
        >
          + Add Price
        </Button>
      </div>

      <GenericDataTable
        columns={[
          { header: "Service", accessor: "service" },
          { header: "Destination", accessor: "destination" },
          { header: "Price", accessor: "price" },
        ]}
        data={prices}
      />
    </div>
  );
}