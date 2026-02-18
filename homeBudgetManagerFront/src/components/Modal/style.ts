import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0; /* top:0 right:0 bottom:0 left:0 */

  background: rgba(0, 0, 0, 0.45);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 9999; /* bem alto mesmo */
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 500px;

  background: white;
  border-radius: 12px;
  padding: 24px;

  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);

  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
