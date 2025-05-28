<template>
  <div class="mainBodyBox">
    <div
      v-if="bookList.author && bookList.author.length > 0"
      class="headerBook"
    >
      "{{ bookList.author[0].author }}" 작가님의 책 작품
    </div>
    <div class="mainBodyBoxBooks">
      <div
        v-for="(book, index) in bookList.author"
        :key="index"
        @click="detailBookPage(book.isbn)"
      >
        <div class="mainBodyBoxBook">
          <img :src="book.image" class="imgBox" />
          <div class="mainBodyBoxBookTitle">{{ book.title }}</div>
        </div>
      </div>
    </div>
    <div class="headerBook">개발자들을 위한 자기개발</div>
    <div class="mainBodyBoxBooks">
      <div
        v-for="(developer, index) in bookList.developer"
        :key="index"
        @click="detailBookPage(developer.isbn)"
      >
        <div class="mainBodyBoxBook">
          <img :src="developer.image" class="imgBox" />
          <div class="mainBodyBoxBookTitle">{{ developer.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { recommendationAuthorBook } from "@/api/bookAPI";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const bookList = reactive({
  author: [],
  authorAPI: "한강",
  developer: [],
  developerAPI: "개발자",
});
// 추천도서책
const authorBook = async () => {
  const result = await recommendationAuthorBook(bookList.authorAPI);
  bookList.author = result.data.items;
  console.log(bookList);
};
// 추천도서책
const developerBook = async () => {
  const result = await recommendationAuthorBook(bookList.developerAPI);
  bookList.developer = result.data.items;
};

// 시작하자마 불러져야하는 API
onMounted(() => {
  authorBook();
  developerBook();
});

const detailBookPage = (click) => {
  // 이제 이걸로 디테일 페이지 들어가면 끝
  router.push({ name: "detailBookPage", query: { isbn: click } });
};
</script>

<style>
.headerBook {
  font-size: 25px;
  padding: 30px 10px 10px 10px;
  border-bottom: 1px solid rgb(184, 184, 184);
  margin-bottom: 20px;
}
.mainBodyBox {
  width: 1300px;
  margin: auto;
  padding-top: 50px;
}
.mainBodyBoxBooks {
  flex-wrap: wrap;
  display: flex;
  padding-bottom: 50px;
  justify-content: space-between;
}
.mainBodyBoxBook {
  flex: 1 1 200px; /* 부모의 20% 차지 → 한 줄에 5개 */
  max-width: 200px;
  box-sizing: border-box;
  cursor: pointer;
}
.imgBox {
  width: 140px;
  height: 230px;
}
.mainBodyBoxBookTitle {
  width: 140px;
  font-size: 12px;
  padding-top: 10px;
}
</style>
