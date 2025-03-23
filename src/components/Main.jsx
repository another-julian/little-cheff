import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../api.js";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  let [recipe, setRecipe] = React.useState(""); //

  const recipeSection = React.useRef(null);

  React.useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      //recipeSection.current.scrollIntoView({ behavior: "smooth" });
      const yCoord =
        recipeSection.current.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: yCoord,
        behavior: "smooth",
      });
    }
  }, [recipe]);

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  async function getRecipe() {
    setRecipe("# Loading...");
    try {
      const recipeMarkdown = await getRecipeFromMistral(ingredients);
      setRecipe(recipeMarkdown);
    } catch (error) {
      setRecipe("#Error");
    }
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
          required
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          toggleShown={getRecipe}
        />
      )}

      {<ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
