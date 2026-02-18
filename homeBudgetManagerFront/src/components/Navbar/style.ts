import styled from "styled-components";

export const NavbarContainer = styled.nav<{ $expanded: boolean }>`
  height: 100vh;
  background: var(--color-blue);
  border-right: 1px solid #d3d8e2;
  display: flex;
  flex-direction: column;
  width: ${({ $expanded }) => ($expanded ? "230px" : "74px")};
  transition: width 0.3s ease;
  overflow: hidden;
  box-sizing: border-box;

  .navbar-header {
    display: flex;
    align-items: center;
    justify-content: ${({ $expanded }) =>
      $expanded ? "flex-start" : "center"};
    padding: 16px;
    cursor: pointer;
    border-bottom: 1px solid #d0d6e2;
  }

  .navbar-logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo-img {
    width: 32px;
    height: 32px;
  }

  .navbar-title {
    font-family: var(--font-bebas);
    font-size: 1rem;
    color: var(--color-gray);
    white-space: nowrap;
  }

  .navbar-menu {
    display: flex;
    flex-direction: column;
    padding: 8px;
    gap: 6px;
  }

  .menu-item {
    display: flex;
    align-items: center;
    justify-content: ${({ $expanded }) =>
      $expanded ? "flex-start" : "center"};
    gap: 12px;
    padding: 10px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    color: var(--color-bluish-gray);
    transition: background 0.2s ease;
  }

  .menu-item:hover {
    background-color: rgba(117, 139, 165, 0.12);
  }

  .menu-item.active {
    background-color: var(--color-bluish-gray);
    color: var(--color-white);
  }

  .menu-icon {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }

  .menu-label {
    white-space: nowrap;
  }
`;
