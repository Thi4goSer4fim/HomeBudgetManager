import styled from "styled-components";

export const CircleButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;

  width: 60px;
  height: 60px;
  border-radius: 50%;

  background: var(--color-blue);
  border: 2px solid var(--color-blue);
  color: var(--color-gray);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  font-weight: 600;
  font-size: 1.5rem;

  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    background: var(--color-light-blue);
    color: var(--color-white);
    border-color: var(--color-light-blue);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(54, 132, 219, 0.3);
  }
`;
