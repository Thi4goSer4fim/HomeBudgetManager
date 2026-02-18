import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-blue);
  font-weight: 600;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Label = styled.label`
  font-size: 0.8rem;
  color: var(--color-bluish-gray);
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 0.65rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #d5e4ff;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: var(--color-blue);
    box-shadow: 0 0 0 2px rgba(34, 74, 140, 0.15);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  margin-top: 0.5rem;
`;

export const PrimaryButton = styled.button`
  padding: 0.55rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;

  background: var(--color-blue);
  color: white;

  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const DangerButton = styled.button`
  padding: 0.55rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;

  background: #ef4444;
  color: white;

  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const GhostButton = styled.button`
  padding: 0.55rem 1rem;
  border-radius: 6px;
  border: 1px solid #d5e4ff;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;

  background: white;
  color: var(--color-blue);

  transition: all 0.2s ease;

  &:hover {
    background: #f4f8ff;
  }
`;
