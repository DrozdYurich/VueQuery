import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import PagePage from "@/views/PagePage.vue";
import Arenda from "@/components/Arenda.vue";
import AppArendaLayout from "@/components/AppArendaLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/page",
      component: AppArendaLayout,
      children: [
        { path: "", name: "page", component: PagePage },
        {
          path: ":id",
          name: "arenda",
          component: Arenda,
        },
      ],
    },
  ],
});

export default router;
