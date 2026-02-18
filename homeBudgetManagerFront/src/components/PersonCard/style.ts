import styled from "styled-components";

export const Card = styled.div`
  background: var(--color-white);
  border-radius: 6px;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #d5e4ff;
  transition: all 0.2s ease;
  width: 90%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(34, 74, 140, 0.12);
  }

  .icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--color-light-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
    font-size: 0.95rem;
    color: var(--color-blue);
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.8rem;
    color: var(--color-bluish-gray);
  }
`;
