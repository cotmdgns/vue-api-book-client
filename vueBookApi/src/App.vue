<template>
  <Headerr v-if="!route.meta.hideHeader" />
  <!-- <Sideber v-if="!route.meta.hideHeader" /> -->
  <!-- 페이지 전환을 위해 RouterView 유지 -->

  <RouterView />
  <Footer v-if="!route.meta.hideHeader"></Footer>
</template>

<style></style>

<script setup>
import { useRoute } from "vue-router";
import { RouterLink, RouterView, useRouter } from "vue-router";
import { ref, reactive } from "vue";
import "./assets/reset.css";
import Headerr from "./components/Headerr.vue";
import Sideber from "./components/Sideber.vue";
import Footer from "./components/Footer.vue";
const route = useRoute();
</script>
