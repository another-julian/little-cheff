import ReactMarkdown from "react-markdown";
export default function ClaudeRecipe({ recipe }) {
  return (
    <section>
      {recipe.length > 20 ? <h2>Little Cheff Recomend:</h2> : null}
      <article className="suggested-recipe-container" aria-live="polite">
        <ReactMarkdown>{recipe}</ReactMarkdown>
      </article>
    </section>
  );
}
