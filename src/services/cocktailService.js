import { loadCocktails } from "@/api/cocktailApi";

/**
 * Returns all cocktails from the local JSON database.
 */
export async function getAllCocktails() {
  return await loadCocktails();
}

/**
 * Returns a cocktail by its unique ID.
 */
export async function getCocktailById(id) {
  const cocktails = await loadCocktails();

  return cocktails.find(
    cocktail => cocktail.idDrink === String(id)
  );
}

/**
 * Extracts unique ingredients from all cocktails.
 * Used to populate the ingredient dropdown.
 */
/**
 * Extracts unique main ingredients from all cocktails.
 * Used to populate the ingredient dropdown.
 */
export async function getIngredients() {
  const cocktails = await loadCocktails();

  const ingredients = [...new Set(
    cocktails
      .map(cocktail => cocktail.strIngredient1)
      .filter(Boolean)
  )];

  return ingredients
    .sort()
    .map(item => ({
      strIngredient1: item,
    }));
}

/**
 * Returns all cocktails containing the selected ingredient.
 */
export async function getCocktailsByIngredient(ingredient) {
  const cocktails = await loadCocktails();

  return cocktails.filter(cocktail => {
    for (let i = 1; i <= 15; i++) {
      if (cocktail[`strIngredient${i}`] === ingredient) {
        return true;
      }
    }

    return false;
  });
}

/**
 * Returns a random cocktail.
 */
export async function getRandomCocktail() {
  const cocktails = await loadCocktails();

  const randomIndex = Math.floor(Math.random() * cocktails.length);

  return cocktails[randomIndex];
}