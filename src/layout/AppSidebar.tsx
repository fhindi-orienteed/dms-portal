import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  PieChartIcon,
  PlugInIcon,
  UserCircleIcon,
  BoxIcon,
  DollarLineIcon,
  ArrowRightIcon,
  DocsIcon,
  SearchIcon,
  TaskIcon,
  GroupIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { useLanguage } from "../context/LanguageContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

type NavItemKey = {
  nameKey: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { nameKey: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <PieChartIcon />,
    name: "Summary",
    subItems: [
      { name: "Overview", path: "/summary/overview", pro: false },
      { name: "Analytics", path: "/summary/analytics", pro: false },
      { name: "Performance", path: "/summary/performance", pro: false },
    ],
  },
  {
    icon: <BoxIcon />,
    name: "Package List",
    subItems: [
      { name: "All Packages", path: "/packages", pro: false },
      { name: "In Transit", path: "/packages/in-transit", pro: false },
      { name: "Delivered", path: "/packages/delivered", pro: false },
      { name: "Pending", path: "/packages/pending", pro: false },
      { name: "Failed Delivery", path: "/packages/failed", pro: false },
    ],
  },
  {
    icon: <TaskIcon />,
    name: "Follow-ups",
    subItems: [
      { name: "Customer Follow-ups", path: "/follow-ups/customers", pro: false },
      { name: "Delivery Follow-ups", path: "/follow-ups/deliveries", pro: false },
      { name: "Payment Follow-ups", path: "/follow-ups/payments", pro: false },
      { name: "Return Follow-ups", path: "/follow-ups/returns", pro: false },
    ],
  },
  {
    icon: <PieChartIcon />,
    name: "Reports",
    subItems: [
      { name: "Delivery Reports", path: "/reports/delivery", pro: false },
      { name: "Financial Reports", path: "/reports/financial", pro: false },
      { name: "Performance Reports", path: "/reports/performance", pro: false },
      { name: "Customer Reports", path: "/reports/customers", pro: false },
      { name: "Export Data", path: "/reports/export", pro: false },
    ],
  },
  {
    icon: <DollarLineIcon />,
    name: "Payments",
    subItems: [
      { name: "Payment History", path: "/payments/history", pro: false },
      { name: "Pending Payments", path: "/payments/pending", pro: false },
      { name: "Payment Methods", path: "/payments/methods", pro: false },
      { name: "Billing", path: "/payments/billing", pro: false },
      { name: "Invoices", path: "/payments/invoices", pro: false },
    ],
  },
  {
    icon: <ArrowRightIcon />,
    name: "Returns",
    subItems: [
      { name: "Return Requests", path: "/returns/requests", pro: false },
      { name: "Return Processing", path: "/returns/processing", pro: false },
      { name: "Return History", path: "/returns/history", pro: false },
      { name: "Refund Management", path: "/returns/refunds", pro: false },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <SearchIcon />,
    name: "Tracking",
    subItems: [
      { name: "Track Package", path: "/tracking", pro: false },
      { name: "Bulk Tracking", path: "/tracking/bulk", pro: false },
      { name: "Tracking History", path: "/tracking/history", pro: false },
    ],
  },
  {
    icon: <UserCircleIcon />,
    name: "Customers",
    subItems: [
      { name: "Customer List", path: "/customers", pro: false },
      { name: "Customer Details", path: "/customers/details", pro: false },
      { name: "Customer Support", path: "/customers/support", pro: false },
    ],
  },
  {
    icon: <GroupIcon />,
    name: "Drivers",
    subItems: [
      { name: "Driver List", path: "/drivers", pro: false },
      { name: "Driver Performance", path: "/drivers/performance", pro: false },
      { name: "Driver Assignments", path: "/drivers/assignments", pro: false },
    ],
  },
  {
    icon: <CalenderIcon />,
    name: "Schedule",
    subItems: [
      { name: "Delivery Schedule", path: "/schedule/delivery", pro: false },
      { name: "Driver Schedule", path: "/schedule/driver", pro: false },
      { name: "Route Planning", path: "/schedule/routes", pro: false },
    ],
  },
  {
    icon: <DocsIcon />,
    name: "Other Links",
    subItems: [
      { name: "Terms of Service", path: "/terms", pro: false },
      { name: "Privacy Policy", path: "/privacy", pro: false },
      { name: "FAQ", path: "/faq", pro: false },
      { name: "Help Center", path: "/help", pro: false },
      { name: "Contact Support", path: "/support", pro: false },
      { name: "About Us", path: "/about", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Settings",
    subItems: [
      { name: "Profile Settings", path: "/profile", pro: false },
      { name: "Account Settings", path: "/settings/account", pro: false },
      { name: "Notification Settings", path: "/settings/notifications", pro: false },
      { name: "System Settings", path: "/settings/system", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { t, isRTL } = useLanguage();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`${isRTL ? 'mr-auto' : 'ml-auto'} w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className={`mt-2 space-y-1 ${isRTL ? 'mr-9' : 'ml-9'}`}>
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 ${isRTL ? 'right-0' : 'left-0'} bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 ${isRTL ? 'border-l' : 'border-r'} border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  t('sidebar.mainMenu')
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  t('sidebar.additionalFeatures')
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
