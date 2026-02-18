import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  padding: 40px 24px;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 32px;
  text-align: center;
`;

export const SearchSection = styled.section`
  width: 100%;
  max-width: 600px;
  margin-bottom: 32px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  font-size: 15px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
`;

export const ResultsSection = styled.section`
  width: 100%;
  max-width: 1000px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  margin-top: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;


export const MessageText = styled.p`
  font-size: 16px;
  color: #64748b;
  text-align: center;
  margin-top: 20px;
`;
