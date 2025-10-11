import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Pagination from "../../common/Pagination";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface GenericDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  showPagination?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

function GenericDataTable<T extends { id: number | string }>({
  data,
  columns,
  itemsPerPage = 10,
  showPagination = true,
  emptyMessage = "No data found",
  onRowClick
}: GenericDataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getCellValue = (row: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor] as React.ReactNode;
  };

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    isHeader
                    className={`px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 ${column.className || ''}`}
                  >
                    {column.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {currentData.length === 0 ? (
                <TableRow>
                  <TableCell className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                currentData.map((row) => (
                  <TableRow 
                    key={row.id}
                    onClick={() => onRowClick?.(row)}
                    className={onRowClick ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" : ""}
                  >
                    {columns.map((column, colIndex) => (
                      <TableCell 
                        key={colIndex} 
                        className={`px-5 py-4 text-start ${column.className || ''}`}
                      >
                        {getCellValue(row, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          showPageNumbers={true}
        />
      )}
    </div>
  );
}

export default GenericDataTable;

