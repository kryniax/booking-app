import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

function AppRoutes() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>} />
    </Routes>
  );
}

export default AppRoutes;
