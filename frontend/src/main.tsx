import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./AppRoutes.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { SearchContextProvider } from "./contexts/SearchContext.tsx";
import "./config/i18n";
import { ModalContextProvider } from "./contexts/ModalContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <ModalContextProvider>
          <SearchContextProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </SearchContextProvider>
        </ModalContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
