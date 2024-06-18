import Index from "../pages/index.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/welcome",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
