<template>
  <AppLayout
    :imgUrl = "cocktail_img"
    :backFunction="removeIngredient"
    :isBackButtonVisible="!!ingredient"
  >
    <div class="wrapper">
      <div v-if="!ingredient || !coctails" class="info">
        <div class="title">{{ $t("choose") }}</div>
        <div class="line"></div>
        <div class="select-wrapper">
          <el-select
            class="select"
            v-model="mainStore.ingredient"
            :placeholder="$t('placeholder')"
            size="large"
            filterable
            allow-create
            @change="mainStore.getCoctails(ingredient)"
          >
            <el-option
              v-for="item in ingredients"
              :key="item.strIngredient1"
              :label="item.strIngredient1"
              :value="item.strIngredient1"
            />
          </el-select>
        </div>
        <div class="text">
          {{ $t("text") }}
        </div>
        <img src="../assets/img/cocktails.png" alt="Coctails" class="img" />
      </div>
      <div v-else class="info">
        <div class="title">COCKTAILS WITH {{ ingredient }}</div>
        <div class="line"></div>
        <div class="coctails">
          <SelectedCoctails
            v-for="coctail in coctails"
            :key="coctail.idDrink"
            :coctail="coctail"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "../components/AppLayout.vue";
import SelectedCoctails from "../components/SelectedCoctails.vue";
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import cocktail_img from '@/assets/img/cocktail_1.jpg';


const mainStore = useMainStore();
mainStore.getIngredients();

const { ingredients, ingredient, coctails } = storeToRefs(mainStore);

function removeIngredient() {
  mainStore.setIngredient(null);
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/main'

.select-wrapper
  padding-top: 50px

.select
  width: 220px

.text
  max-width: 516px
  padding-top: 50px
  font-weight: 400
  line-height: 36px
  letter-spacing: 0.1em
  color: $textMuted

.img
  margin-top: 60px

.coctails
  display: flex
  align-items: center
  margin-top: 60px
  max-height: 400px
  overflow-y: auto
  flex-wrap: wrap

/* Hide scrollbar for Chrome, Safari and Opera */
.coctails::-webkit-scrollbar
    display: none

/* Hide scrollbar for IE, Edge and Firefox */
.coctails
  -ms-overflow-style: none
  scrollbar-width: none
</style>
