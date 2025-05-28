<template>
  <div class="sideber">
    <div>총 몇개 봤는지</div>
    <div v-for="(book, index) in bookList" :key="index">
      <img :src="book" class="bookImg" />
    </div>
  </div>
</template>
<script setup>
import { watchEffect } from "vue";
import { serverDetailBookPageAPI } from "@/api/bookAPI";
// 쿠키 가져와서 가공하기
const cookies = document.cookie.split(";");
const bookIsCookis = cookies.reduce((result, cookie) => {
  const [name, value] = cookie.trim().split("=");
  result.push(value);
  return result;
}, []);
// 리스트 뽑기
const bookList = [];
const bookAPiList = async () => {
  for (let i = 0; i < bookIsCookis.length; i++) {
    const result = await serverDetailBookPageAPI(bookIsCookis[i]);
    bookList.push(result.data.items[0].image);
  }
};
// 감지
watchEffect(() => {
  // bookIsCookis;
  // bookAPiList();
});
</script>
<style>
.sideber {
  width: 100px;
  height: 500px;
  background-color: red;
  position: fixed;
  top: 20%;
  right: 0px;
  padding: 10px;
  margin-right: 50px;
}
.bookImg {
  width: 80px;
}
</style>
