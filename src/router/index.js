import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Coctail from "../views/Coctail.vue";
import CoctailRandom from "../views/CoctailRandom.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/coctails/:rid",
      name: "coctail",
      component: Coctail,
    },
    {
      path: "/random",
      name: "coctailRandom",
      component: CoctailRandom,
    },
  ],
});

export default router;
