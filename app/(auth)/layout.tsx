import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center p-2 relative">
      <Button variant="ghost" className="absolute top-4 left-4">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft />
          Home
        </Link>
      </Button>
      {children}
    </div>
  );
};

export default AuthLayout;
