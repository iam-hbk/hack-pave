"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useScrollPosition } from "@/app/hooks/useScrollPosition";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { User } from "@/lib/dal";

export function LandingPageNav({ user }: { user: User | null }) {
  const scrolled = useScrollPosition();

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full bg-transparent p-4 backdrop-blur-lg transition-all duration-200",
        scrolled && "shadow-sm",
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="w-32">
          <Image
            src="/Pave_Logo.svg"
            alt="Pave Logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/#features"
                className="hover:text-primary hover:bg-background px-2 text-gray-100 transition-colors"
              >
                Features
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/#team"
                className="hover:text-primary hover:bg-background px-2 text-gray-100 transition-colors"
              >
                Team
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/#about"
                className="hover:text-primary hover:bg-background px-2 text-gray-100 transition-colors"
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden sm:block">
              <Button variant="ghost" className="text-gray-100" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden sm:block">
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile auth buttons */}
        <div className="flex gap-2 sm:hidden">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
