import styled, { keyframes, css } from 'styled-components';
import type { AlertType } from './index';

// Animação de entrada do alerta
export const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Animação de saída do alerta
export const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

// Animação da barra de progresso baseada na duração
export const progressBar = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

export const AlertContainer = styled.div<{ 
  type: AlertType; 
  isHiding?: boolean;
}>`
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 320px;
  max-width: 400px;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid;
  overflow: hidden; 
  
  animation: ${slideIn} 0.3s ease-out;
  
  ${props => props.isHiding && css`
    animation: ${slideOut} 0.3s ease-in forwards;
  `}

  /* Estilos base para diferentes tipos de alerta */
  
  ${props => {
    switch (props.type) {
      case 'success':
        return css`
          background: linear-gradient(135deg, #d4edda, #c3e6cb);
          border-color: #28a745;
          color: #155724;
        `;
      case 'error':
        return css`
          background: linear-gradient(135deg, #f8d7da, #f5c6cb);
          border-color: #dc3545;
          color: #721c24;
        `;
      case 'warning':
        return css`
          background: linear-gradient(135deg, #fff3cd, #ffeaa7);
          border-color: #ffc107;
          color: #856404;
        `;
      case 'info':
        return css`
          background: linear-gradient(135deg, #d1ecf1, #bee5eb);
          border-color: #17a2b8;
          color: #0c5460;
        `;
      default:
        return css`
          background: linear-gradient(135deg, #e2e3e5, #d6d8db);
          border-color: #6c757d;
          color: #383d41;
        `;
    }
  }}
`;

export const AlertContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

export const AlertIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const AlertMessage = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`;

// Botão de fechar o alerta
export const CloseButton = styled.button`
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;
  color: inherit;
  
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

// Barra de progresso que indica o tempo restante do alerta
export const ProgressBar = styled.div<{ duration: number; isHiding?: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: currentColor;
  border-radius: 0 0 12px 12px; 
  animation: ${props => css`
    ${progressBar} ${props.duration}ms linear forwards
  `};
  animation-play-state: ${props => props.isHiding ? 'paused' : 'running'};
  opacity: 0.6;
`;