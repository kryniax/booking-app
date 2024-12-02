import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import RegisterPage from "./pages/RegisterPage";

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
      <Route
        path="/register"
        element={
          <Layout>
            <RegisterPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
