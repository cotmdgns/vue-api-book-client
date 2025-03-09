<template>
  <div class="singBox">
    <div class="singBoxImg" @click="goToHome">
      <img src="../assets/images/BookMoA.png" alt="" />
    </div>
    <div class="singBoxBody">
      <InputBox
        v-model="singMember.memId"
        :placeholder="'아이디를 입력하세요'"
      />
      <input
        type="text"
        v-model="singMember.memId"
        placeholder="아이디 입력해주세요."
      />
      <input
        type="text"
        v-model="singMember.memPwd"
        placeholder="비밀번호 입력해주세요."
      />
      <button class="buttonTop" @click="">회원가입</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import InputBox from "@/components/InputBox.vue";
const router = useRouter();
// 홈페이지로 이동
const goToHome = () => {
  router.push("/");
};

const singMember = reactive({
  memId: "",
  memPwd: "",
});

// gd 값 설정 (inputPlaceHolder로 전달)
const gd = "아이디를 입력해주세요."; // placeholder 텍스트
// 리액트 임펙트처럼 확인할때 사용
// watch(singMember, (newVal) => {
//   console.log(newVal);
// });
</script>

<style scoped>
.singBox {
  width: 400px;
  height: 100vh;
  margin: auto;
  background-color: rgb(250, 250, 250);
}
.singBoxImg {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
}
.singBoxBody {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.singBoxBody input {
  padding: 10px;
  border: 1px solid rgb(196, 196, 196);
  border-radius: 5px;
  margin-bottom: 5px;
}
.singBoxBody button {
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
