import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="shadow-md py-4 px-2">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            ToDo App v2
          </Link>
          <Button variant="default">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 shadow-md">{children}</main>
      <footer className="py-4 px-2">
        <div className="container mx-auto">Footer</div>
      </footer>
    </div>
  );
};

export default MainLayout;
