import { defineStore } from "pinia";
import { getIngredients, getCocktailsByIngredient } from "@/services/cocktailService";

export const useMainStore = defineStore("main", {
  state: () => ({
    ingredients: [],
    ingredient: null,
    coctails: [],
  }),
  actions: {
    async getIngredients() {
      this.ingredients = await getIngredients();
    },
    async getCoctails(ingredient) {
      this.coctails = await getCocktailsByIngredient(ingredient);
    },
    setIngredient(val) {
      this.ingredient = val;
    },
  },
});
