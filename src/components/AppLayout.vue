<template>
  <div class="root">
    <div :style="`background-image: url(${imgUrl})`" class="img"></div>
    <div class="main">
      <div class="btns">
        <el-button
          v-if="isBackButtonVisible"
          type="primary"
          :icon="Back"
          circle
          class="back"
          @click="backFunction"
        />
        <el-switch
          v-model="sw"
          @change="switchL"
          class="switch"
          inline-prompt
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          active-text="EN"
          inactive-text="DE"
        />
        <RouterLink to="/random"
          ><el-button class="btn-random-cocktail" @click="getRandomCocktail">{{
            $t("button")
          }}</el-button></RouterLink
        >
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { Back } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";
import { ref } from "vue";

const { locale } = useI18n({ useScope: "global" });

const sw = ref(true);

const switchL = () => {
  locale.value = sw.value ? "en" : "de";
  localStorage.setItem("lang", locale.value);
};

const props = defineProps({
  imgUrl: {
    type: String,
    required: false,
  },
  backFunction: {
    type: Function,
    required: true,
  },
  isBackButtonVisible: {
    type: Boolean,
    default: true,
  },
  getRandomCocktail: {
    type: Function,
    required: false,
  },
});
</script>

<style lang="sass" scoped>
@import '../assets/styles/main'

.root
    display: flex
    min-height: 100vh
    background-color: $background

.img
    width: 50%
    background-repeat: no-repeat
    background-position: 50% 50%
    background-size: cover

.main
    position: relative
    width: 50%

.btn-random-cocktail
    position: absolute
    font-size: 14px
    font-family: 'Raleway', 'Arial', sans-sarif
    top: 32px
    right: 40px
    background-color: $accent
    border-color: $accent
    color: $text

    &:hover,
    &:active
        background-color: darken($accent, 10%)
        border-color: darken($accent, 10%)

.btns
    display: flex
    justify-content: space-between
    align-items: center

.back
  background-color: transparent
  border-color: #fff
  margin: 34px 0 0 35px

  &:hover
    border-color: $accent

.switch
  position: absolute
  margin: 34px 0 0 85px
</style>
