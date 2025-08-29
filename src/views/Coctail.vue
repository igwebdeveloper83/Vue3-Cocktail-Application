<template>
  <div v-if="cocktail" class="wrap">
    <AppLayout :imgUrl="cocktail.strDrinkThumb" :backFunction="goBack">
      <div class="wrapper">
        <div class="info">
          <div class="title">{{ cocktail.strDrink }}</div>
          <div class="line"></div>

          <div class="list">
            <div
              v-for="(item, key) in ingredients"
              :key="key"
              class="list-item"
            >
              {{ item.name }}
              <template v-if="item.measure"> | {{ item.measure }}</template>
            </div>
          </div>

          <div class="instructions">
            {{ cocktailInstructions }}
          </div>
        </div>
      </div>
    </AppLayout>
  </div>
</template>

<script setup>
import AppLayout from "../components/AppLayout.vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const coctailId = computed(() => route.path.split("/").pop());
const cocktail = ref(null);

const { locale } = useI18n({ useScope: "global" });
const cocktailInstructions = computed(() =>
  cocktail.value
    ? cocktail.value[
        "strInstructions" + (locale.value === "en" ? "" : locale.value.toUpperCase())
      ] || cocktail.value.strInstructions || ""
    : ""
);

const ingredients = computed(() => {
  if (!cocktail.value) return [];
  const list = [];
  for (let i = 1; i <= 15; i++) {
    const name = cocktail.value[`strIngredient${i}`];
    if (!name) break;
    list.push({
      name,
      measure: cocktail.value[`strMeasure${i}`] || ""
    });
  }
  return list;
});

async function getCocktail() {
  const URL = import.meta.env.VITE_COCKTAIL_BY_ID;
  const response = await axios.get(`${URL}${coctailId.value}`);
  cocktail.value = response?.data?.drinks?.[0] ?? null;
}

function goBack() {
  router.go(-1);
}

getCocktail();
</script>

<style lang="sass" scoped>
@import '../assets/styles/main'
</style>