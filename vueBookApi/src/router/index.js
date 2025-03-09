import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import SingUp from "@/views/SingUp.vue";

import InputBox from "@/components/InputBox.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    // },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { hideHeader: true },
    },
    {
      path: "/singUp",
      name: "singUp",
      component: SingUp,
      meta: { hideHeader: true },
    },
    {
      path: "/inputBox",
      name: "inputBox",
      component: InputBox,
      meta: { hideHeader: true },
    },
  ],
});

export default router;
