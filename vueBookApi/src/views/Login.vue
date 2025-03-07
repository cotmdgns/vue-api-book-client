<template>
  <div class="loginBox">
    <button @click="$emit('close-modal')">닫기</button>
    <div>
      <input type="text" v-model="loginMember.memId" placholder="아이디 입력" />
      <input
        type="text"
        v-model="loginMember.memPwd"
        placholder="비밀번호 입력"
      />
      <button @click="userLogin">로그인</button>
    </div>
  </div>
</template>

<script setup>
import { login } from "@/api/member";
import { reactive, watch } from "vue";
const loginMember = reactive({
  memId: "",
  memPwd: "",
});

const userLogin = async () => {
  const result = await login(loginMember);
  console.log(result);
};

// watch(loginMember, (newVal) => {
//   console.log(newVal);
// });
</script>

<style scoped>
.loginBox {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: red;
  width: 500px;
  height: 400px;
}
</style>
