import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="shadow-md py-4 px-2">
        <div className="container mx-auto">Header</div>
      </header>
      <main className="flex-1 shadow-md">{children}</main>
      <footer className="py-4 px-2">
        <div className="container mx-auto">Footer</div>
      </footer>
    </div>
  );
};

export default MainLayout;
