import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import Button from "../../ui/button/Button";
import Checkbox from "../../form/input/Checkbox";
import Pagination from "../../common/Pagination";

interface User {
  id: number;
  name: string;
  email: string;
  position: string;
  salary: string;
  office: string;
  status: "Hired" | "In Progress" | "Pending";
}

const tableData: User[] = [
  {
    id: 1,
    name: "Lindsey Curtis",
    email: "demoemail@gmail.com",
    position: "Web Designer",
    salary: "$85,000",
    office: "Boston",
    status: "Hired",
  },
  {
    id: 2,
    name: "Kaiya George",
    email: "kaiya@example.com",
    position: "Project Manager",
    salary: "$95,000",
    office: "San Francisco",
    status: "In Progress",
  },
  {
    id: 3,
    name: "Zain Geidt",
    email: "zain@example.com",
    position: "Content Writer",
    salary: "$65,000",
    office: "New York",
    status: "Pending",
  },
  {
    id: 4,
    name: "Abram Schleifer",
    email: "abram@example.com",
    position: "Digital Marketer",
    salary: "$75,000",
    office: "Seattle",
    status: "Hired",
  },
  {
    id: 5,
    name: "Carla George",
    email: "carla@example.com",
    position: "Frontend Developer",
    salary: "$90,000",
    office: "Austin",
    status: "In Progress",
  },
  {
    id: 6,
    name: "John Doe",
    email: "john@example.com",
    position: "Backend Developer",
    salary: "$100,000",
    office: "Chicago",
    status: "Hired",
  },
  {
    id: 7,
    name: "Jane Smith",
    email: "jane@example.com",
    position: "UI/UX Designer",
    salary: "$80,000",
    office: "Denver",
    status: "Pending",
  },
  {
    id: 8,
    name: "Mike Johnson",
    email: "mike@example.com",
    position: "DevOps Engineer",
    salary: "$110,000",
    office: "Portland",
    status: "Hired",
  },
  {
    id: 9,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    position: "Product Manager",
    salary: "$120,000",
    office: "Miami",
    status: "In Progress",
  },
  {
    id: 10,
    name: "Tom Brown",
    email: "tom@example.com",
    position: "Data Analyst",
    salary: "$70,000",
    office: "Phoenix",
    status: "Pending",
  },
];

type SortField = "name" | "position" | "salary" | "office" | "status";
type SortDirection = "asc" | "desc";

const DataTableTwo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = tableData.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.office.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort data
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "salary") {
        aValue = parseFloat(aValue.replace(/[$,]/g, ""));
        bValue = parseFloat(bValue.replace(/[$,]/g, ""));
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection]);

  // Pagination
  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.size === currentData.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(currentData.map((item) => item.id)));
    }
  };

  // Handle individual selection
  const handleSelectItem = (id: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hired":
        return "success";
      case "In Progress":
        return "warning";
      case "Pending":
        return "error";
      default:
        return "primary";
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortDirection === "asc" ? (
      <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Show</label>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600 dark:text-gray-400">entries</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:placeholder-gray-500"
            />
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <Button
            startIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          >
            Download
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  <Checkbox
                    checked={selectedItems.size === currentData.length && currentData.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4"
                  />
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    User
                    <SortIcon field="name" />
                  </button>
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <button
                    onClick={() => handleSort("position")}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    Position
                    <SortIcon field="position" />
                  </button>
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <button
                    onClick={() => handleSort("salary")}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    Salary
                    <SortIcon field="salary" />
                  </button>
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <button
                    onClick={() => handleSort("office")}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    Office
                    <SortIcon field="office" />
                  </button>
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <button
                    onClick={() => handleSort("status")}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    Status
                    <SortIcon field="status" />
                  </button>
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {currentData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="px-5 py-4 text-start">
                    <Checkbox
                      checked={selectedItems.has(user.id)}
                      onChange={() => handleSelectItem(user.id)}
                      className="w-4 h-4"
                    />
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <div>
                      <div className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {user.name}
                      </div>
                      <div className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.position}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.salary}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.office}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <Badge size="sm" color={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DataTableTwo; 