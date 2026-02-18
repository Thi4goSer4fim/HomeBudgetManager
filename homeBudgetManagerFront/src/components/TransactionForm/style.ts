import styled from 'styled-components';


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #333;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e0e0e0;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
`;

interface InputProps {
  error?: boolean;
}

export const Input = styled.input<InputProps>`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.error ? '#d32f2f' : '#ddd'};
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#d32f2f' : 'var(--color-blue)'};

  &::placeholder {
    color: #999;
  }
`;

export const Select = styled.select<InputProps>`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.error ? '#d32f2f' : '#ddd'};
  border-radius: 4px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#d32f2f' : 'var(--color-blue)'};
  }
`;

export const TextArea = styled.textarea<InputProps>`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.error ? '#d32f2f' : '#ddd'};
  border-radius: 4px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#d32f2f' : ' var(--color-blue)'};
  }
`;

export const ErrorMessage = styled.span`
  color: #d32f2f;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

export const CancelButton = styled.button`
  padding: 10px 24px;
  background: white;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;


`;

export const SaveButton = styled.button`
  padding: 10px 24px;
  background: var(--color-blue);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover{
    background: var(--color-light-blue);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;