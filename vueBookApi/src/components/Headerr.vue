<template>
  <div class="header">
    <div class="headerLeft" @click="goToHome">
      <div class="hederLeftImg">
        <img src="../assets/logo.svg" alt="" />
      </div>
      <div>홈페이지</div>
    </div>

    <div class="headerRight">
      <div @click="loginModalButton">로그인</div>
      <div @click="singUpModalButton">회원가입</div>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="modalOpneClose.loginModal">
      <Login @close-modal="modalOpneClose.loginModal = false" />
    </div>
  </Teleport>
  <Teleport to="body">
    <div v-if="modalOpneClose.singUpModal">
      <SingUp @close-modal="modalOpneClose.singUpModal = false" />
    </div>
  </Teleport>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import "../assets/headerr.css";
import Login from "@/views/Login.vue";
import SingUp from "@/views/SingUp.vue";

const router = useRouter();

// 로그인 및 회원가입 모달창 관리
const modalOpneClose = reactive({
  loginModal: false,
  singUpModal: false,
});
// 로그인 버튼 (회원가입은 false)
const loginModalButton = () => {
  modalOpneClose.loginModal = true;
  modalOpneClose.singUpModal = false;
};
// 회원가입 버튼 (로그인은 false)
const singUpModalButton = () => {
  modalOpneClose.singUpModal = true;
  modalOpneClose.loginModal = false;
};

// 홈페이지 이동
const goToHome = () => {
  router.push("/");
};
</script>

<style></style>
