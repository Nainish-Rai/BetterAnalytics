"use client";

import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, LineChart, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: LineChart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-16 items-center gap-4 border-b px-6">
        <Link href="/dashboard" className="font-semibold">
          Analytics
        </Link>
        <div className="ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="flex">
        <div className="w-64 border-r min-h-[calc(100vh-4rem)]">
          <nav className="flex flex-col gap-1 p-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors",
                    pathname === item.href && "bg-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}