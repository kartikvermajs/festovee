"use client";
import useSeller from "apps/seller-ui/src/hooks/useSeller";
import useSidebar from "apps/seller-ui/src/hooks/useSidebar";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Box from "../box";
import { Sidebar } from "./sidebar.styles";
import Link from "next/link";
import Logo from "../../../assets/favicon.ico";
import Image from "next/image";

import SidebarItem from "./sidebar.item";
import SidebarMenu from "./sidebar.menu";
import {
  BellPlus,
  BellRing,
  CalendarPlus,
  CircleDollarSign,
  Home,
  ListOrdered,
  LogOut,
  Mail,
  Package,
  Settings,
  Settings2,
  SquarePlus,
  TicketPercent,
} from "lucide-react";

const SideBarWrapper = () => {
  const { activeSidebar, setActiveSidebar } = useSidebar();
  const pathName = usePathname();
  const { seller } = useSeller();

  useEffect(() => {
    setActiveSidebar(pathName);
  }, [pathName, setActiveSidebar]);

  const getIconColor = (route: string) =>
    activeSidebar === route ? "#0085ff" : "#969696";

  return (
    <Box
      css={{
        height: "90vh",
        zIndex: 202,
        position: "sticky",
        padding: "8px",
        top: "0",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
      className="sidebar-wrapper"
    >
      <Sidebar.Header>
        <Box>
          <Link href={"/"} className="flex justify-center gap-2 items-end">
            <Image
              src={Logo}
              width={50}
              height={50}
              alt="logo"
              style={{ filter: "invert(1)" }}
            />
            <h1 className="text-4xl font-bold text-gray-300">Festovee.</h1>
          </Link>
          <br />
          <Box>
            <h3 className="text-xl font-medium text-[#ecedee]">
              {seller?.shop?.name ?? "Loading..."}
            </h3>
            <h5 className="font-medium text-xs text-[#ecedeecf] whitespace-nowrap overflow-hidden text-ellipsis max-w-[170px] ml-2">
              ~ {seller?.shop?.address || "Loading..."}
            </h5>
          </Box>
        </Box>
      </Sidebar.Header>
      <div className="block my-3 h-full">
        <Sidebar.Body className="body sidebar">
          <SidebarItem
            title="Dashboard"
            href="/dashboard"
            icon={<Home size={20} fill={getIconColor("/dashboard")} />}
            isActive={activeSidebar === "/dashboard"}
          />
          <div className="mt-2 block">
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={activeSidebar === "/orders"}
                title="Orders"
                href="/dashboard/orders"
                icon={
                  <ListOrdered
                    width={20}
                    height={20}
                    color={getIconColor("/dashboard/orders")}
                    style={{ filter: "invert(1)" }}
                  />
                }
              />
              <SidebarItem
                isActive={activeSidebar === "/payments"}
                title="Payments"
                href="/dashboard/payments"
                icon={
                  <CircleDollarSign
                    size={20}
                    color={getIconColor("/dashboard/payments")}
                    style={{ filter: "invert(1)" }}
                  />
                }
              />
            </SidebarMenu>

            <SidebarMenu title="Products">
              <SidebarItem
                isActive={activeSidebar === "/dashboard/create-product"}
                title="Create Product"
                href="/dashboard/create-product"
                icon={
                  <SquarePlus
                    size={24}
                    color={getIconColor("/dashboard/create-product")}
                  />
                }
              />
              <SidebarItem
                isActive={activeSidebar === "/dashboard/all-product"}
                title="All Product"
                href="/dashboard/all-product"
                icon={
                  <Package
                    size={24}
                    color={getIconColor("/dashboard/create-product")}
                  />
                }
              />
            </SidebarMenu>
            <SidebarMenu title="Events">
              <SidebarItem
                isActive={activeSidebar === "/dashboard/create-event"}
                title="Create Event"
                href="/dashboard/create-event"
                icon={
                  <CalendarPlus
                    size={20}
                    color={getIconColor("/dashboard/create-event")}
                  />
                }
              />
              <SidebarItem
                isActive={activeSidebar === "/dashboard/all-events"}
                title="All Event"
                href="/dashboard/all-events"
                icon={
                  <BellPlus
                    size={20}
                    color={getIconColor("/dashboard/all-events")}
                  />
                }
              />
            </SidebarMenu>
            <SidebarMenu title="controllers">
              <SidebarItem
                isActive={activeSidebar === "/dashboard/inbox"}
                title="Inbox"
                href="/dashboard/inbox"
                icon={
                  <Mail size={20} color={getIconColor("/dashboard/inbox")} />
                }
              />
              <SidebarItem
                isActive={activeSidebar === "/dashboard/settings"}
                title="Settings"
                href="/dashboard/settings"
                icon={
                  <Settings
                    size={20}
                    color={getIconColor("/dashboard/settings")}
                  />
                }
              />
              <SidebarItem
                isActive={activeSidebar === "/dashboard/notifications"}
                title="Notifications"
                href="/dashboard/notifications"
                icon={
                  <BellRing
                    size={20}
                    color={getIconColor("/dashboard/notification")}
                  />
                }
              />
            </SidebarMenu>
            <SidebarMenu title="extras">
              <SidebarItem
                isActive={activeSidebar === "/dashboard/discount-codes"}
                title="Discount Codes"
                href="/dashboard/discount-codes"
                icon={
                  <TicketPercent
                    size={20}
                    color={getIconColor("/dashboard/discount-codes")}
                  />
                }
              />
              <SidebarItem
                isActive={activeSidebar === "/dashboard/logout"}
                title="Logout"
                href="/dashboard/logout"
                icon={
                  <LogOut
                    size={20}
                    color={getIconColor("/dashboard/logout")}
                  />
                }
              />
            </SidebarMenu>
          </div>
        </Sidebar.Body>
      </div>
    </Box>
  );
};

export default SideBarWrapper;
