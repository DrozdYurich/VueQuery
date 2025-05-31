import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import PagePage from "@/views/PagePage.vue";
import Arenda from "@/components/Arenda.vue";
import AppArendaLayout from "@/components/AppArendaLayout.vue";
import AppAuth from "@/components/AppAuth.vue";
import AppMany from "@/components/AppMany.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: { requiresAuth: true },
    },
    {
      path: "/many",
      name: "many",

      component: AppMany,
      meta: { requiresAuth: true },
    },
    {
      path: "/auth",
      name: "auth",
      component: AppAuth,
      meta: { requiresAuth: false },
    },
    {
      path: "/page",
      component: AppArendaLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "page",
          component: PagePage,
          meta: { requiresAuth: true },
        },
        {
          path: ":id",
          name: "arenda",
          component: Arenda,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token"); // или другой способ проверки

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/auth");
  } else if (to.path === "/auth" && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});
export default router;
