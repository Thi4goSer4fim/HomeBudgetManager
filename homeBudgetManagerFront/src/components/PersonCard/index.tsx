import React from "react";
import { Card, Info } from "./style";
import { User } from "lucide-react";


/**
 * Card responsável por exibir as informações de uma pessoa.
 * Permite ação opcional ao clicar.
 */
interface PersonCardProps {
  person: {
    id: string;
    name: string;
    age: number;
  };
  onCardClick?: (personId: string) => void;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, onCardClick }) => {
  const handleClick = () => {
    onCardClick?.(person.id);
  };

  return (
    <Card
      onClick={handleClick}
      style={{ cursor: onCardClick ? "pointer" : "default" }}
    >
      <div className="icon">
        <User size={22} />
      </div>

      <Info>
        <h3>{person.name}</h3>
        <p>{person.age} anos</p>
      </Info>
    </Card>
  );
};

export default PersonCard;
