import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <p>HomePage</p>
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout>
            <p>Search page</p>
          </Layout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
