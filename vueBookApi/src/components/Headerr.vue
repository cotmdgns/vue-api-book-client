<template>
  <div class="header">
    <div class="headerLeft" @click="goToHome">
      <div class="hederLeftImg">
        <img src="../assets/logo.svg" alt="" />
      </div>
      <div>홈페이지</div>
    </div>

    <div class="headerRight">
      <div @click="goToLogin">로그인</div>
      <div @click="goToSingUp">회원가입</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import "../assets/headerr.css";

const router = useRouter();

// 홈페이지 이동
const goToHome = () => {
  router.push("/");
};
// 로그인페이지 이동
const goToLogin = () => {
  router.push("/login");
};
// 회원가입페이지 이동
const goToSingUp = () => {
  router.push("/singUp");
};
</script>

<style></style>
