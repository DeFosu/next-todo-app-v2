"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/store/useUser";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  if (loading) return null;
  if (user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Button variant="ghost" className="absolute top-4 left-4">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft />
          Home
        </Link>
      </Button>
      {children}
    </div>
  );
}
