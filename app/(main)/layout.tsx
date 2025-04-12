"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/store/useUser";
import Link from "next/link";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, signOut, loading } = useUser();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="shadow-md py-4 px-2">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            ToDo App v2
          </Link>

          {user ? (
            <Button
              variant="default"
              onClick={() => signOut()}
              disabled={loading}
            >
              Sign Out {loading ? "..." : ""}
            </Button>
          ) : (
            <Link href="/sign-in">
              <Button variant="default" className="cursor-pointer">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </header>
      <main className="flex-1 shadow-md">{children}</main>
      <footer className="py-4 px-2">
        <div className="container mx-auto">
          <h2>Footer</h2>
          <p>{user?.email}</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
