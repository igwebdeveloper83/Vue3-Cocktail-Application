<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" appear>
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style lang="sass">
.fade-enter-active,
.fade-leave-active,
.fade-appear-active
  transition: opacity .2s ease

.fade-enter-from,
.fade-leave-to,
.fade-appear-from
  opacity: 0
</style>