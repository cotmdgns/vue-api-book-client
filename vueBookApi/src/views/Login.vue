<template>
  <div class="loginBox">
    <div class="loginBoxImg" @click="goToHome">
      <img src="../assets/images/BookMoA.png" alt="" />
    </div>
    <div class="loginBoxBody">
      <InputBox
        v-model="loginMember.memId"
        :placeholder="'아이디를 입력하세요'"
      />
      <InputBox
        v-model="loginMember.memPwd"
        :placeholder="'비밀번호 입력해주세요.'"
      />
      <button class="buttonTop" @click="userLogin">로그인</button>
      <button class="buttonBottom" @click="goToSingUp">회원가입</button>
    </div>
  </div>
</template>

<script setup>
import { loginAPI } from "@/api/member";
import { reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";
import InputBox from "@/components/InputBox.vue";

const router = useRouter();
// 회원가입 페이지 이동
const goToSingUp = () => {
  router.push("/singUp");
};
// 홈페이지로 이동
const goToHome = () => {
  router.push("/");
};
// 지역변수 로그인정보
const loginMember = reactive({
  memId: "",
  memPwd: "",
});
watchEffect(() => {
  console.log("변경된 값:", loginMember);
});

// 로그인 API 호출
const userLogin = async () => {
  const result = await loginAPI(loginMember);
  console.log(result);
};
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
