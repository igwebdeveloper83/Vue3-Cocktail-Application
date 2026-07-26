import axios from "axios";

let cocktails = null;

export async function loadCocktails() {
  if (cocktails) {
    return cocktails;
  }

  const response = await axios.get("/cocktails.json");

  cocktails = response.data;

  return cocktails;
}