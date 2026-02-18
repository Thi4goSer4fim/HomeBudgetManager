import NavbarComponent from "../components/Navbar";
import "../styles/global.css";
import { Outlet } from "react-router-dom";

/**
 * Layout padrão para as paginas do sistema.
 * Renderiza Navbar fixa e conteúdo principal.
 */
interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="user-layout">
      <div className="navbar-wrapper">
        <NavbarComponent />
      </div>

      <div className="content-area">
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default UserLayout;
