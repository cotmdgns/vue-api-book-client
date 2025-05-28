import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import SingUp from "@/views/SingUp.vue";
import InputBox from "@/components/InputBox.vue";
import BookPage from "@/views/BookPage.vue";
import DetailBookPage from "@/views/DetailBookPage.vue";
import MyPage from "@/views/MyPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/myPage",
      name: "myPage",
      component: MyPage,
    },
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
    {
      path: "/bookPage",
      name: "bookPage",
      component: BookPage,
      props: (route) => ({ detail: route.query.title }),
    },
    {
      path: "/detailBookPage",
      name: "detailBookPage",
      component: DetailBookPage,
      props: (route) => ({ detail: route.query.isbn }),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");

  if (to.path === "/myPage" && !token) {
    alert("로그인이 필요합니다.");
    next("/login");
  } else {
    next();
  }
});

export default router;
