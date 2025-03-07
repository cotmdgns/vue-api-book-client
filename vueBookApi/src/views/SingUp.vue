<template>
  <div class="singUpBox">
    <button @click="$emit('close-modal')">닫기</button>
    <h1>회원가입 페이지</h1>
    <p>여기서 회원가입 페이지 내용이 나옵니다.</p>
  </div>
</template>

<script setup></script>
<style scoped>
.singUpBox {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: red;
  width: 500px;
  height: 400px;
}
</style>
