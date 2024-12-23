import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

type LayoutProps = {
  children: React.ReactNode;
  showSearchBar?: boolean;
};

const Layout = ({ children, showSearchBar = false }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto">{showSearchBar && <SearchBar />}</div>
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
