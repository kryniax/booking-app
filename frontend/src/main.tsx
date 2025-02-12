import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./AppRoutes.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { SearchContextProvider } from "./contexts/SearchContext.tsx";
import "./config/i18n";
import { CurrencyProvider } from "./contexts/CurrencyContext.tsx";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <CurrencyProvider>
            <SearchContextProvider>
              <BrowserRouter>
                <ScrollToTop />
                <AppRoutes />
              </BrowserRouter>
            </SearchContextProvider>
          </CurrencyProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
