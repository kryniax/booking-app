import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBarForm from "../forms/search-bar-form/SearchBarForm";

type LayoutProps = {
  children: React.ReactNode;
  showSearchBar?: boolean;
};

const Layout = ({ children, showSearchBar = false }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-zinc-900">
      <Header />
      <Hero />
      <div className="container">{showSearchBar && <SearchBarForm />}</div>
      <div className="container mx-auto py-10 flex flex-col flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
