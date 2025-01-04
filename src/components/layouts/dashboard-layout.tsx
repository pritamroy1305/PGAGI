"use client";

import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

import { UserNav } from "@/components/user-nav";
import Link from 'next/link';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" flex h-14 items-center justify-between px-4">
          <div className="mr-4 flex">
            <Button
              variant="ghost"
              className="mr-2 px-2 hover:bg-transparent"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Toggle sidebar</span>
              <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
              >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={sidebarOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
          />
              </svg>
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold">Analytics Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center justify-end space-x-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>

      
      <div
        className={`fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 transform border-r bg-background transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <nav className="space-y-2 p-4">
        <Link
            href="/"
            className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            Dashboard
          </Link>
         
          <Link
            href="/finance"
            className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            Finance
          </Link>
      
        </nav>
      </div>


      
      <main
        className={`min-h-[calc(100vh-3.5rem)] transition-all duration-200 ease-in-out ${
          sidebarOpen ? "ml-0 sm:ml-0" : "hidden sm:block ml-64"
        }`}
      >
        {children}
      </main>
    </div>
  );
}