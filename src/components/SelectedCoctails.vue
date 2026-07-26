<template>
  <div class="root">
    <RouterLink :to="`/coctails/${coctail.idDrink}`">
      <img
        :src="coctail.strDrinkThumb"
        :alt="coctail.strDrink"
        class="image"
      />    
    </RouterLink>
    <div class="name">{{ coctail.strDrink }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  coctail: {
    type: Object,
    required: true,
  },
});
</script>
<style lang="sass" scoped>
@import '../assets/styles/main'

.root
    width: calc((100% - 40px)/3)
    margin-right: 20px
    padding-bottom: 20px

    &:nth-child(3n + 3)
        margin-right: 0


.image
    width: 90px
    height: 90px
    display: block
    margin: 0 auto
    object-fit: cover
    object-position: center
    border-radius: 10px
    box-shadow: 0 0 25px rgba(255, 228, 170, .45)    

.name
    width: 100%
    padding-top: 10px
    text-align: center
    font-weight: 500
    font-size: 15px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    letter-spacing: 0.02em
</style>
