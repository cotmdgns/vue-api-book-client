<template>
  <div class="loginBox">
    <div class="loginBoxImg" @click="goToHome">
      <img src="../assets/images/BookMoA.png" alt="" />
    </div>
    <div class="loginBoxBody">
      <input
        type="text"
        v-model="loginMember.memId"
        placeholder="아이디 입력해주세요."
      />
      <input
        type="text"
        v-model="loginMember.memPwd"
        placeholder="비밀번호 입력해주세요."
      />
      <button class="buttonTop" @click="userLogin">로그인</button>
      <button class="buttonBottom" @click="goToSingUp">회원가입</button>
    </div>
  </div>
</template>

<script setup>
import { login } from "@/api/member";
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
// 회원가입 페이지 이동
const goToSingUp = () => {
  router.push("/singUp");
};
// 홈페이지로 이동
const goToHome = () => {
  router.push("/");
};

const loginMember = reactive({
  memId: "",
  memPwd: "",
});

// 로그인 API 호출
const userLogin = async () => {
  const result = await login(loginMember);
  console.log(result);
};

// 리액트 임펙트처럼 확인할때 사용
// watch(loginMember, (newVal) => {
//   console.log(newVal);
// });
</script>

<style scoped>
.loginBox {
  width: 400px;
  height: 100vh;
  margin: auto;
  background-color: rgb(250, 250, 250);
}
.loginBoxImg {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
}
.loginBoxBody {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.loginBoxBody input {
  padding: 10px;
  border: 1px solid rgb(196, 196, 196);
  border-radius: 5px;
  margin-bottom: 5px;
}
.loginBoxBody button {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
}
.buttonTop {
  border: none;
  margin-top: 40px;
  color: white;
  background-color: rgb(131, 131, 255);
}
.buttonTop:hover {
  background-color: rgb(110, 110, 212);
}
.buttonBottom {
  background-color: white;
  border: 0.5px solid rgb(172, 172, 172);
}
.buttonBottom:hover {
  background-color: rgb(241, 241, 241);
}
</style>
