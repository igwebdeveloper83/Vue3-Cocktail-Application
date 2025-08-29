<template>
  <AppLayout
    :imgUrl="cocktail?.strDrinkThumb"
    :backFunction="goBack"
    :getRandomCocktail="getRandomCocktail"
  >
    <div class="wrapper">
      <div class="info">
        <div class="title">{{ cocktail?.strDrink }}</div>
        <div class="slider">
          <swiper
            class="swiper"
            :slides-per-view="3"
            :space-between="50"
            :scrollbar="{ draggable: true }"
          >
            <swiper-slide v-for="(ingredient, key) in ingredients" :key="key">
              <img :src="`${ING_IMG_URL}${ingredient.name}-Small.png`" />
              <div class="name">{{ ingredient?.name }}</div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="name">Random cocktail</div>
        <div class="list">
          <div v-for="(item, key) in ingredients" :key="key" class="list-item">
            {{ item.name }}
            <template v-if="item.measure">
              |
              {{ item.measure }}
            </template>
          </div>
        </div>
        <div class="category">Category: {{ cocktail?.strCategory }}</div>
        <div class="instructions">
          {{ cocktailInstructions }}
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "../components/AppLayout.vue";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Scrollbar } from "swiper";
import "swiper/scss";
import "swiper/scss/scrollbar";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const cocktail = ref(null);

SwiperCore.use([Scrollbar]);

async function getRandomCocktail() {
  const URL = import.meta.env.VITE_RANDOM_COCKTAIL_URL;
  const response = await axios.get(`${URL}`);
  cocktail.value = response?.data?.drinks[0];
}

const ingredients = computed(() => {
  if (!cocktail.value) {
    return [];
  }

  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    if (!cocktail?.value[`strIngredient${i}`]) break;

    const ingredient = {};
    ingredient.name = cocktail.value[`strIngredient${i}`];
    ingredient.measure = cocktail.value[`strMeasure${i}`];

    ingredients.push(ingredient);
  }
  return ingredients;
});

const router = useRouter();

const ING_IMG_URL = import.meta.env.VITE_RANDOM_ING_IMG;

function goBack() {
  router.go(-1);
}

const { locale } = useI18n({ useScope: "global" });

const cocktailInstructions = computed(() =>
  cocktail.value
    ? cocktail.value[
        "strInstructions" + (locale.value === "en" ? "" : locale.value.toUpperCase())
      ] || cocktail.value.strInstructions || ""
    : ""
);

getRandomCocktail();
</script>

<style lang="sass" scoped>
@import '../assets/styles/main'

.name
    margin-top: 20px

.slider
  padding: 50px 0

.swiper
  width: 568px

.name
  padding-top: 20px
  padding-bottom: 20px
</style>
