<template>
  <div class="detailBookPage">
    <div class="detailBookPageBox">
      <div class="detailBookPageBoxImg">
        <img :src="detailBook[0]?.image" />
      </div>
      <div class="detailBookPageBoxInform">
        <h2 class="detailBookPageBoxH2">{{ detailBook[0]?.title }}책 제목</h2>
        <div class="detailBookPageBoxInformBox">
          <div class="detailBookPageBoxInformText">
            <div>저자 이름 : {{ detailBook[0]?.author }}</div>
            <div>출판사 : {{ detailBook[0]?.publisher }}</div>
            <div>출간일 : {{ detailBook[0]?.pubdate }}</div>
            <div>판매 가격 : {{ detailBook[0]?.discount }}</div>
          </div>

          <div class="detailBookPageBoxInformButton">
            <a class="detailBookPageBoxInformLink" :href="detailBook[0]?.link"
              >해당 사이트 바로가기</a
            >
            <button @click="handleBookButton">
              {{ boxButton.bookBoolean ? "추가하기" : "삭제하기" }}
            </button>
          </div>
        </div>
        <div
          class="detailBookPageBoxInformBoxBox"
          v-if="detailBook[0]?.description.length > 700"
        >
          <div ref="descRef" :style="descInfoScript">
            <div>{{ detailBook[0]?.description }}</div>
          </div>
          <div @click="buttonInfo">
            <button class="buttonInfoBox">
              {{ box.button ? "닫기" : "열기" }}
            </button>
          </div>
        </div>
        <div class="detailBookPageBoxInformBoxBox" v-else>
          <div>
            <div>{{ detailBook[0]?.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  serverDetailBookPageAPI,
  createBookInfoAPI,
  serverDetailBookCheckAPI,
  removeBookInfoAPI,
} from "@/api/bookAPI";
import { onMounted, ref, nextTick, computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const isbn = route.query.isbn;
const detailBook = ref([]);
const descRef = ref(null);

const handleBookInfo = {
  bookTitle: "",
  bookAuthor: "",
  bookImage: "",
  bookLink: "",
  bookIsbn: "",
};

const box = ref({
  button: false,
  fullHeight: 0,
});
const boxButton = reactive({
  bookBoolean: true,
});

const descInfoScript = computed(() => ({
  maxHeight: box.value.button ? `${box.value.fullHeight}px` : "95px",
  overflow: "hidden",
  transition: "max-height 0.4s ease",
}));

const buttonInfo = async () => {
  box.value.button = !box.value.button;
  await nextTick();
  if (box.value.button && descRef.value) {
    box.value.fullHeight = descRef.value.scrollHeight;
  }
};

// 불리언값에 따라 추가하고 삭제하기
const handleBookButton = async () => {
  const token = sessionStorage.getItem("token");
  if (boxButton.bookBoolean) {
    if (token) {
      await createBookInfoAPI(handleBookInfo);
      serverDetailBookCheck();
      alert("추가되었습니다.");
    } else {
      alert("로그인을 해주세요");
      router.push("/login");
    }
  } else {
    if (token) {
      await removeBookInfoAPI(isbn);
      serverDetailBookCheck();
      alert("삭제되었습니다.");
    }
  }
};

// 책 추기용
const serverDetailBookPage = async () => {
  const result = await serverDetailBookPageAPI(isbn);
  detailBook.value = result.data.items;
  handleBookInfo.bookTitle = result.data.items[0].title;
  handleBookInfo.bookAuthor = result.data.items[0].author;
  handleBookInfo.bookImage = result.data.items[0].image;
  handleBookInfo.bookLink = result.data.items[0].link;
  handleBookInfo.bookIsbn = result.data.items[0].isbn;
};

// 책 추가체크용
const serverDetailBookCheck = async () => {
  const result = await serverDetailBookCheckAPI(isbn);
  boxButton.bookBoolean = Boolean(result.data);
};

onMounted(() => {
  serverDetailBookCheck();
  serverDetailBookPage();
});
</script>
<style>
.detailBookPage {
  width: 1300px;
  margin: auto;
  padding-top: 50px;
}
.detailBookPageBox {
  display: flex;
}

.detailBookPageBoxImg img {
  width: 250px;
  height: 350px;
  background-color: rgb(233, 233, 233);
  padding: 15px;
}
.detailBookPageBoxInform {
  width: 100%;
}
.detailBookPageBoxH2 {
  background-color: rgb(104, 161, 142);
  font-size: 21px;
  font-weight: bold;
  padding: 20px;
  color: aliceblue;
}
.detailBookPageBoxInformBox {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.detailBookPageBoxInformButton {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  font-size: 15px;
}
.detailBookPageBoxInformButton a {
  padding: 10px;
  background-color: rgb(104, 161, 142);
  color: white;
  margin-bottom: 10px;
  border-radius: 5px;
}
.detailBookPageBoxInformButton button {
  padding: 5px;
  border: none;
  font-size: 15px;
  background-color: rgb(104, 161, 142);
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.detailBookPageBoxInformButton button:hover,
.detailBookPageBoxInformLink:hover {
  background-color: rgb(57, 105, 88);
}
.detailBookPageBoxInformText {
  font-size: 15px;
}
.detailBookPageBoxInformBoxBox {
  padding: 20px;
}

.buttonInfoBox {
  margin-top: 17px;
  border: none;
  width: 100%;
}
</style>
