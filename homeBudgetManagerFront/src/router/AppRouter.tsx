import { Routes, Route } from "react-router-dom";

import UserLayout from "../layouts/userLayout";
import Dashboard from "../pages/dashboard";
import Persons from "../pages/persons";
import Categories from "../pages/categories";

/**
 * Define as rotas da aplicação.
 * Rotas dentro de /app utilizam o UserLayout.
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/app/"
        element={
          <UserLayout>
            <Dashboard />
          </UserLayout>
        }
      />

      <Route
        path="/app/pessoas"
        element={
          <UserLayout>
            <Persons />
          </UserLayout>
        }
      />

      <Route
        path="/app/categorias"
        element={
          <UserLayout>
            <Categories />
          </UserLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
