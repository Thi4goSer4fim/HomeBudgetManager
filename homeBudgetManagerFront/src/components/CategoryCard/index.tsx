import React from "react";
import { Card, Info } from "./style";
import { Check, XIcon, Triangle } from "lucide-react";

/**
 * Card responsável por exibir as informações de uma categoria.
 * Permite interação opcional através do evento de clique.
 */
interface categoryCardProps {
  category: {
    id: number;
    description: string;
    purpose: string;
  };
  onCardClick?: (category: any) => void;
}

const IconCard: React.FC<{ value: string }> = ({ value }) => {
  return (
    <div
      className="icon"
      style={{
        background:
          value == "1" ? "#34D399" : value == "3" ? "#FBBF24" : "#F87171",
      }}
    >
      {value == "1" ? (
        <Check size={22} />
      ) : value == "3" ? (
        <Triangle size={22} />
      ) : (
        <XIcon size={22} />
      )}
    </div>
  );
};

// Mapeia o código de finalidade da categoria para sua descrição legível
const CategoryPurpose: Record<string, string> = {
  "1": "Receita",
  "2": "Despesa",
  "3": "Receita e Despesa",
};

const categoryCard: React.FC<categoryCardProps> = ({
  category,
  onCardClick,
}) => {
  const handleClick = () => {
    onCardClick?.(category);
  };

  return (
    <Card
      onClick={handleClick}
      style={{ cursor: onCardClick ? "pointer" : "default" }}
    >
      <div className="icon">
        <IconCard value={category.purpose} />
      </div>

      <Info>
        <h3>{category.description}</h3>
        <p>{CategoryPurpose[category.purpose]}</p>
      </Info>
    </Card>
  );
};

export default categoryCard;
