import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { NavbarContainer } from "./style";

import dashboardIcon from "../../assets/img/dashboard.svg";
import categoryIcon from "../../assets/img/category.svg";
import personIcon from "../../assets/img/person.svg";
import logoIcon from "../../assets/img/budget.png";

/**
 * Componente de navegação lateral da aplicação.
 * Permite expandir/recolher o menu e mantém estado salvo no localStorage.
 */

const menuItems = [
    { name: "Dashboard", icon: dashboardIcon, path: "/app/" },
    { name: "Pessoas", icon: personIcon, path: "/app/pessoas" },
    { name: "Categorias", icon: categoryIcon, path: "/app/categorias" },
  ];


const NavbarComponent: React.FC = () => {

  // Inicializa o estado do menu com base no valor salvo no localStorage
  const [expanded, setExpanded] = useState(() => {
    const saved = localStorage.getItem("expandMenu");
    return saved === null ? true : saved === "true";
  });

  // Persiste o estado de expansão do menu no localStorage sempre que ele for alterado
  useEffect(() => {
    localStorage.setItem("expandMenu", expanded.toString());
  }, [expanded]);


  return (
    <NavbarContainer $expanded={expanded}>
      <div
        className="navbar-header"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className="navbar-logo">
          <img src={logoIcon} alt="BudgetManager logo" className="logo-img" />
          {expanded && <span className="navbar-title">BUDGET MANAGER</span>}
        </div>
      </div>

      <nav className="navbar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <img src={item.icon} alt={item.name} className="menu-icon" />
            {expanded && <span className="menu-label">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </NavbarContainer>
  );
};

export default NavbarComponent;
