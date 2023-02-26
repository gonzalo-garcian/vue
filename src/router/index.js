import { createRouter, createWebHistory } from "vue-router";
import RegicideView from "../views/RegicideView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "regicide",
      component: RegicideView,
    },
  ],
});

export default router;
