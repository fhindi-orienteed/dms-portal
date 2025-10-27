import { useState } from "react";
import GenericDataTable from "../../../components/tables/DataTables/GenericDataTable";
import Button from "../../../components/ui/button/Button";
import { PlusIcon } from "../../../icons";
import { useTranslation } from "react-i18next"
interface PriceItem {
  id: number;
  service: string;
  destination: string;
  price: number;
}

interface PriceListTableProps {
  prices: PriceItem[];
  onAddPrice: (price: PriceItem) => void;
}

export default function PriceListTable({ prices, onAddPrice }: PriceListTableProps) {
  const [data, setData] = useState(prices || []);
    const { t } = useTranslation();

  const columns = [
    {
      header: "Service",
      accessor: (item: PriceItem) => (
        <span className="font-medium text-gray-800 dark:text-white/90">{item.service}</span>
      ),
    },
    {
      header: "Destination",
      accessor: (item: PriceItem) => (
        <span className="text-gray-600 dark:text-gray-400">{item.destination}</span>
      ),
    },
    {
      header: "Price",
      accessor: (item: PriceItem) => (
        <span className="text-gray-800 dark:text-white/90">${item.price.toFixed(2)}</span>
      ),
    },
  ];

  const handleAdd = () => {
    const newPrice: PriceItem = {
      id: data.length + 1,
      service: "New Service",
      destination: "New City",
      price: 0,
    };
    const updated = [...data, newPrice];
    setData(updated);
    onAddPrice(newPrice);
  };

  return (
    <>
      {/* Add Button */}
      <div className="mb-4 flex justify-end">
        <Button
          variant="primary"
          size="sm"
          onClick={handleAdd}
          startIcon={<PlusIcon className="size-4 fill-white" />}
        >
         {t("pricelist.AddPrice")} 
        </Button>
      </div>

      {/* Table */}
      <GenericDataTable
        data={data}
        columns={columns}
        itemsPerPage={10}
        showPagination={true}
        emptyMessage="No prices found for this merchant."
      />
    </>
  );
}