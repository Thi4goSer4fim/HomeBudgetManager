import React from "react";
import { CircleButton } from "./style";


/**
 * Botão reutilizável da aplicação.
 */
interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  disabled = false,
}) => {
  return (
    <CircleButton type={type} onClick={onClick} disabled={disabled}>
      {children}
    </CircleButton>
  );
};
