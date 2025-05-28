<template>
  <div class="header">
    <div class="headerBox">
      <div class="headerLeft" @click="goToHome">
        <div class="hederLeftImg">BookMoA</div>
      </div>

      <div class="headerBody">
        <input
          type="text"
          placeholder="검색할 단어를 적어주세요"
          v-model="textSearch"
          @keyup.enter="userSearch"
        />
        <div @click="userSearch"><Search /></div>
      </div>
      <div v-if="memId === null">
        <div class="headerRight">
          <div @click="goToLogin">로그인</div>
          <div @click="goToSingUp">회원가입</div>
        </div>
      </div>
      <div v-if="memId !== null">
        <div class="headerRight">
          <div @click="clickLogout">로그아웃</div>
          <div @click="goToMyPage">마이페이지</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import "../assets/headerr.css";
import { ref, onMounted, watch, onUpdated } from "vue";
import { Search } from "lucide-vue-next";

const router = useRouter();
const textSearch = ref("");

const memId = ref(null);
onMounted(() => {
  memId.value = sessionStorage.getItem("token");
});
// 홈페이지 이동
const goToHome = () => {
  router.push("/");
};
// 유저 검색 or 유저 엔터처리
const userSearch = () => {
  if (textSearch.value !== "" || textSearch !== undefined) {
    router.push({ name: "bookPage", query: { title: textSearch.value } });
  } else {
    alert("검색할 단어를 입력해주세요");
  }
};

// 로그인페이지 이동
const goToLogin = () => {
  router.push("/login");
};
// 회원가입페이지 이동
const goToSingUp = () => {
  router.push("/singUp");
};
// 마이페이지 이동
const goToMyPage = () => {
  router.push("/myPage");
};
// 로그아웃
const clickLogout = () => {
  sessionStorage.removeItem("token");
  alert("로그아웃 되었습니다.");
  memId.value = null;
  router.push("/");
};
</script>

<style>
.header {
  background-color: rgb(163, 214, 133);
  box-shadow: 0px 2px 10px rgb(150, 150, 150);
}
.headerBox {
  width: 1300px;
  height: 77px;
  display: flex;
  justify-content: space-between;
  margin: auto;
}
/*헤더 왼쪽*/
.headerLeft {
  display: flex;
  justify-content: center;
  align-items: center;
}
.headerLeft:hover {
  cursor: pointer;
}
.hederLeftImg {
  font-size: 30px;
  font-weight: bold;
}
/*헤더 오른쪽*/
.headerRight {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.headerRight div {
  font-size: 14px;
  margin-right: 10px;
}
.headerRight div:hover {
  cursor: pointer;
}
.headerBody {
  display: flex;
  margin: auto;
  width: 400px;
  height: 35px;
}
.headerBody input {
  padding: 10px 5px 10px 5px;
  width: 90%;
  border-radius: 10px 0px 0px 10px;
  border: 0px;
}
.headerBody input:focus {
  outline: none;
}
.headerBody div {
  border-radius: 0px 10px 10px 0px;
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(209, 209, 209);
  font-weight: bold;
  color: rgb(114, 114, 114);
  cursor: pointer;
}
.headerBody div:hover {
  background-color: rgb(255, 180, 180);
}
.headerBody div svg {
  width: 20px;
}
</style>
