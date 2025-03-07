<template>
  <Headerr />

  <!-- 페이지 전환을 위해 RouterView 유지 -->
  <RouterView />
</template>

<style></style>

<script setup>
import { useRoute } from "vue-router";
import { RouterLink, RouterView, useRouter } from "vue-router";
import { ref, reactive } from "vue";
import "./assets/reset.css";
import Headerr from "./components/Headerr.vue";
</script>
