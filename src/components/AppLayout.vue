<template>
  <div class="root">
    <div :style="`background-image: url(${bgUrl})`" class="img"></div>
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
          v-if="showLangSwitch"
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
import { computed } from "vue";
import { Back } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import coctail_img from '@/assets/img/cocktail_1.jpg';

const bgUrl = computed(() => props.imgUrl || coctail_img); 


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
  showLangSwitch: { 
    type: Boolean, 
    default: true ,
  }
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
    height: 100vh
    background-repeat: no-repeat
    background-position: 50% 50%
    background-size: cover

.main
    position: relative
    width: 50%

.btn-random-cocktail
    position: absolute
    top: 32px
    right: 40px
    width: 220px
    font-size: 14px
    font-family: 'Raleway', 'Arial', sans-serif
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
  top: 35px
  right: 600px
</style>
