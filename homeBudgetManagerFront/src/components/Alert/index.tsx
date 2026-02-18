import React, { useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import {
  AlertContainer,
  AlertContent,
  AlertIcon,
  AlertMessage,
  CloseButton,
  ProgressBar,
} from "./style";

/**
 * Componente de alerta reutilizável para exibir mensagens
 * de sucesso, erro, aviso ou informação.
 * Possui animação de entrada/saída e fechamento automático.
 */
export type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  type: AlertType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 5000,
}) => {
  const [isHiding, setIsHiding] = React.useState(false);

  // Controla o fechamento automático do alerta após o tempo definido
  useEffect(() => {
    if (isVisible) {
      setIsHiding(false);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setIsHiding(true);
        setTimeout(onClose, 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  // Fecha o alerta manualmente aplicando animação antes de remover do DOM
  const handleClose = () => {
    setIsHiding(true);
    setTimeout(onClose, 300);
  };

  const getIcon = () => {
    const iconProps = { size: 20 };

    switch (type) {
      case "success":
        return <CheckCircle {...iconProps} />;
      case "error":
        return <XCircle {...iconProps} />;
      case "warning":
        return <AlertTriangle {...iconProps} />;
      case "info":
        return <Info {...iconProps} />;
      default:
        return <Info {...iconProps} />;
    }
  };

  if (!isVisible) return null;

  return (
    <AlertContainer type={type} isHiding={isHiding}>
      <AlertContent>
        <AlertIcon>{getIcon()}</AlertIcon>

        <AlertMessage>{message}</AlertMessage>

        <CloseButton onClick={handleClose}>
          <X size={16} />
        </CloseButton>
      </AlertContent>

      <ProgressBar duration={duration} isHiding={isHiding} />
    </AlertContainer>
  );
};

export default Alert;
