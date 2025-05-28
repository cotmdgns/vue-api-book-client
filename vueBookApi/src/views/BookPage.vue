<template>
  <div class="bookPage">
    <div class="bookPageHeader">
      <p class="bookPageHeaderH1">'{{ searchBook.title }}'</p>
      에 대한 검색결과 {{ searchBook.bookListLength }}개 나왔습니다.
    </div>
    <div
      v-for="(book, index) in searchBook.bookList"
      :key="index"
      class="bookPageList"
      @click="detailPageMove(book.isbn)"
    >
      <div class="bookPageListImg">
        <img :src="book.image" />
      </div>
      <div class="bookPageListBox">
        <div class="bookPageListBoxH1">{{ book.title }}</div>
        <div class="bookPageListBoxDescription">{{ book.description }}</div>
        <div>{{ book.author }} 저자</div>
        <div>{{ book.discount }}원</div>
        <div>{{ book.publisher }} : {{ transDay(book.pubdate) }}</div>
      </div>
    </div>
    <div class="buttonPageing">
      <div class="buttonPageingButton">
        <button @click="pageMinus" :disabled="pageGroupStart === 1"><</button>
      </div>
      <div class="buttonPageingNum">
        <div v-for="num in pages" :key="num">
          <button class="buttonPageingNumInNum" v-on:click="numClick(num)">
            {{ num }}
          </button>
        </div>
      </div>
      <div class="buttonPageingButton">
        <button @click="pagePlus" :disabled="pageGroupStart + 10 > pageMax">
          >
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.buttonPageing {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto;
  background-color: rgb(255, 255, 255);
}
.buttonPageingButton {
  display: flex;
  justify-content: center;
  padding: 10px;
}
.buttonPageingNum {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
}
.buttonPageingNumInNum {
  border: none;
  background-color: none;
  margin: 10px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}
.buttonPageingButton button {
  padding: 7px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: rgb(163, 214, 133);
  color: white;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
}
.buttonPageingButton button:hover {
  background-color: rgb(128, 170, 103);
}

.bookPage {
  width: 1300px;
  margin: auto;
}
.bookPageHeader {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 25px;
}
.bookPageHeaderH1 {
  color: green;
}
.bookPageList {
  display: flex;
  padding: 20px 0px 20px 0px;
  cursor: pointer;
  border-top: 1px solid red;
}
.bookPageListImg img {
  width: 150px;
  cursor: pointer;
}
/* 책 정보 중앙 */
.bookPageListBox {
  width: 100%;
  padding-left: 20px;
}
.bookPageListBoxH1 {
  font-weight: bold;
  font-size: 20px;
}
.bookPageListBoxDescription {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 1100px;
}
</style>

<script setup>
import { userBookSearchAPI } from "@/api/bookAPI";
import { reactive, watch, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

// 한 페이지에 10개씩
// 총 검색결과는 129개
// 그럼 버튼은 13개 나와야함
const pageGroupStart = ref(1); // 이게 11,12,13,14,15 ...

// 총 페이지
const pageMax = computed(() => Math.ceil(searchBook.bookListLength / 10));

// 클릭 시 어디 페이지인지 확인
const numClick = async (num) => {
  searchBook.number = num * 10 - 9;
  const result = await userBookSearchAPI(searchBook);
  searchBook.bookList = result.data.items;
};

const pages = computed(() => {
  let page = [];
  const max = Math.ceil(searchBook.bookListLength / 10);
  for (
    let i = pageGroupStart.value;
    i < pageGroupStart.value + 10 && i <= max;
    i++
  ) {
    page.push(i);
  }
  return page;
});
const pageMinus = () => {
  // 10씩 내려주기
  pageGroupStart.value -= 10;
};
const pagePlus = () => {
  // 10씩 올려주기
  pageGroupStart.value = pageGroupStart.value + 10;
};

const route = useRoute();
const router = useRouter();
const transDay = (data) => {
  const year = data.substring(0, 4);
  const month = data.substring(4, 6);
  const day = data.substring(6, 8);
  return `${year}년 ${month}월 ${day}일`;
};

// 페이지 전역변수
const searchBook = reactive({
  bookList: "",
  bookListLength: 0,
  title: "",
  number: 1,
});

const userBookSearch = async () => {
  const result = await userBookSearchAPI(searchBook);
  searchBook.bookList = result.data.items;
  searchBook.bookListLength = result.data.total;
  // 새로 검색 했을떄 다시 초기화 시키기
  pageGroupStart.value = 1;
  searchBook.number = 1;
};

const detailPageMove = (click) => {
  router.push({ name: "detailBookPage", query: { isbn: click } });
};

watch(
  () => route.query.title,
  async (newTitle) => {
    searchBook.title = newTitle;
    await userBookSearch();
  },
  { immediate: true }
);
</script>
