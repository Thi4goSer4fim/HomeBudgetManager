import { useEffect } from "react";


/**
 * Componente responsável por atualizar dinamicamente
 * o título da página e as meta tags para SEO.
 */
interface HeadProps {
  title?: string;
  description?: string;
}

const Head: React.FC<HeadProps> = ({
    title = "BudgetManager - Gerencie suas finanças com simplicidade",
    description = "Plataforma para controle de despesas, receitas e categorias. Organize seu orçamento e acompanhe seus gastos de forma prática e eficiente.",
}) => {
  // Atualiza título e meta tags sempre que title ou description mudarem
  useEffect(() => {
    document.title = title;

    updateMetaTag("name", "description", description);

    updateMetaTag("property", "og:title", title);
    updateMetaTag("property", "og:description", description);
  }, [title, description]);

  const updateMetaTag = (attribute: string, value: string, content: string) => {
    let metaTag = document.querySelector(`meta[${attribute}="${value}"]`);

    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute(attribute, value);
      document.head.appendChild(metaTag);
    }

    metaTag.setAttribute("content", content);
  };

  return null;
};

export default Head;
