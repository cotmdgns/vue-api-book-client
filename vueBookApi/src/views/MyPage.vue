<template>
  <div class="myPageBox">
    <div v-if="!hanBooks" class="myPageNone">저장된 정보가 없습니다 :[</div>
    <div
      v-for="(book, index) in userInfo.bookInfo"
      :Key="index"
      class="myPageInfo"
    >
      <img :src="book.bookImage" alt="" />
      <div>{{ book.bookAuthor }}</div>
      <div class="myPageInfoTitle">{{ book.bookTitle }}</div>
      <div class="myPageInfoBox">
        <a class="myPageInfoLink" :href="book.bookLink">사이트 바로가기</a>
        <button @click="removeBook(book.bookIsbn)" class="myPageInfoButton">
          삭제하기
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { bookUserInfo, removeBookInfoAPI } from "@/api/bookAPI";
import { Key } from "lucide-vue-next";

const userInfo = reactive({
  bookInfo: [],
});
// computed가 data나 ref, reactive가 변경될 경우 자동으로 다시 계산
const hanBooks = computed(() => {
  return userInfo.bookInfo && userInfo.bookInfo.length > 0;
});

// 유저가 저정한 책 정보 다 가져오기
const userSaveInfoBook = async () => {
  // 토큰으로 너 토큰있냐없냐 확인 후 없으면 로그인해라 or 있으면 정보 보여주기
  const token = sessionStorage.getItem("token");
  const result = await bookUserInfo();
  userInfo.bookInfo = result.data;
  // console.log("페이지 입장");
  // console.log(result.data);
  // console.log(userInfo.bookInfo);
};

// 유저가 저장한 정보 삭제하기
const removeBook = async (data) => {
  console.log("gd");
  await removeBookInfoAPI(data);
  userSaveInfoBook();
  alert("삭제되었습니다.");
};

onMounted(() => {
  userSaveInfoBook();
});
</script>
<style>
.myPageNone {
  background-color: rgb(240, 240, 240);
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
}

.myPageBox {
  width: 1300px;
  margin: auto;
  padding-top: 50px;
}
.myPageInfo {
  background-color: rgb(243, 243, 243);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
}
.myPageInfo img {
  width: 100px;
  height: 150px;
}
.myPageInfoTitle {
  width: 800px;
}

.myPageInfoBox {
  display: flex;
  flex-direction: column;
}
.myPageInfoButton {
  padding: 5px;
  background-color: rgb(104, 161, 142);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
}
.myPageInfoButton:hover {
  background-color: rgb(57, 105, 88);
  color: white;
}
.myPageInfoLink {
  padding: 10px;
  background-color: rgb(104, 161, 142);
  color: white;
  border-radius: 10px;
  margin-bottom: 10px;
}
.myPageInfoLink:hover {
  background-color: rgb(57, 105, 88);
  color: white;
}
</style>
