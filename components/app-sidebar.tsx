import * as React from "react";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { navigationItems, currentUser } from "@/lib/mock-data";

import {
  Home,
  BookOpen,
  BarChart,
  Trophy,
  Plus,
  List,
  Users,
  Database,
  Settings,
} from "lucide-react";
import { NavUser } from "./nav-user";
import Link from "next/link";

const icons = {
  home: Home,
  book: BookOpen,
  chart: BarChart,
  trophy: Trophy,
  plus: Plus,
  list: List,
  users: Users,
  database: Database,
  settings: Settings,
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Get navigation items based on user role
  const userNavigation = navigationItems[currentUser.role];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/">
          <Image
            src="/Pave_Logo.svg"
            alt="Pave Logo"
            width={120}
            height={40}
            className="m-4"
          />
        </Link>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {userNavigation.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.href} className="flex items-center gap-2">
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.title}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
