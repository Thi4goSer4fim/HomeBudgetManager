import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h1 {
    margin: 0;
    color: #333;
  }
`;

export const TotalsSection = styled.section`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;

  h2 {
    margin: 0 0 20px 0;
    color: #444;
    font-size: 1.5rem;
  }
`;

export const TotalsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;

  th {
    background: #f5f5f5;
    padding: 12px;
    text-align: left;
    font-weight: 600;
    border-bottom: 2px solid #ddd;
    color: #555;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #eee;
    color: #666;
  }

  tfoot td {
    background: #f9f9f9;
    font-weight: 600;
    border-top: 2px solid #ddd;
    color: #333;
  }

  .income {
    color: #4caf50;
    font-weight: 500;
  }

  .expense {
    color: #f44336;
    font-weight: 500;
  }

  .positive {
    color: #4caf50;
    font-weight: 600;
  }

  .negative {
    color: #f44336;
    font-weight: 600;
  }

  .empty-message {
    text-align: center;
    color: #999;
    padding: 30px;
    font-style: italic;
  }
`;

export const SummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

interface SummaryCardProps {
  type: 'income' | 'expense' | 'positive' | 'negative';
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  h3 {
    margin: 0 0 10px 0;
    color: #666;
    font-size: 1rem;
    font-weight: 500;
  }

  p {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${props => {
      switch (props.type) {
        case 'income':
          return '#4caf50';
        case 'expense':
          return '#f44336';
        case 'positive':
          return '#4caf50';
        case 'negative':
          return '#f44336';
        default:
          return '#333';
      }
    }};
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1rem;
`;

export const ErrorContainer = styled.div`
  margin: 20px 0;
`;
export const SectionTitle = styled.h2`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.5rem;
  border-bottom: 2px solid var(--color-light-blue);
  padding-bottom: 10px;
  display: inline-block;
`;