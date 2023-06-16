import axios from "axios";
import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    ingredients: [],
    ingredient: null,
    coctails: [],
  }),
  actions: {
    async getIngredients() {
      const URL = import.meta.env.VITE_ING_URL;
      const response = await axios.get(`${URL}`);
      this.ingredients = response?.data?.drinks;
    },
    async getCoctails(ingredient) {
      const URL = import.meta.env.VITE_ING_SEARCH_URL;
      const response = await axios.get(`${URL}${ingredient}`);
      this.coctails = response?.data?.drinks;
    },
    setIngredient(val) {
      this.ingredient = val;
    },
  },
});
