<template>
  <div class="signBox">
    <div class="signBoxImg" @click="goToHome">
      <img src="../assets/images/BookMoA.png" alt="" />
    </div>
    <div class="signBoxBody">
      <div class="signBoxBodyInput">
        <InputBox
          v-model="signUpMember.memId"
          :placeholder="'아이디을 입력하세요'"
          @input="signUpIdBoo = true"
          :style="styles.memId"
        />
        <div @click="clientIdCheck" class="signBoxBodyCheckBox">중복체크</div>
      </div>

      <InputBox
        v-model="signUpMember.memPwd"
        :placeholder="'비밀번호를 입력하세요'"
        @input="signUpPwdBoo = true"
        :style="styles.memPwd"
      />
      <InputBox
        v-model="signUpMember.memName"
        :placeholder="'이름를 입력하세요'"
        @input="signUpNameBoo = true"
        :style="styles.memName"
      />
      <InputBox
        v-model="signUpMember.email"
        :placeholder="'이메일를 입력하세요'"
        @input="signUpEmailBoo = true"
        :style="styles.memEmail"
      />
      <div class="wrongBox">
        <div v-if="signUpNameBoo && !signUpName.test(signUpMember.memName)">
          이름 : 옳바르게 입력해주세요.
        </div>
        <div v-if="signUpIdBoo && !signUpId.test(signUpMember.memId)">
          아이디 : 5~20자의 영문 소문자로만 가능합니다.
        </div>
        <div v-if="signUpPwdBoo && !signUpPwd.test(signUpMember.memPwd)">
          비밀번호 : 최소 5글자 이상이며 영문자 또는 특수문자 하나씩
          들어가야합니다
        </div>
        <div v-if="signUpEmailBoo && !signUpEmail.test(signUpMember.email)">
          이메일 : 제대로 입력해주세요
        </div>
      </div>
      <button class="buttonTop" @click="">회원가입</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, watchEffect, ref } from "vue";
import { useRouter } from "vue-router";
import InputBox from "@/components/InputBox.vue";
import { idCheckAPI } from "@/api/member";

const router = useRouter();
// 홈페이지로 이동
const goToHome = () => {
  router.push("/");
};

// 아이디 체크 API
const clientIdCheck = async () => {
  const result = await idCheckAPI(signUpMember.memId);
};

const signUpMember = reactive({
  memName: "",
  memId: "",
  memPwd: "",
  email: "",
});

const signUpName = /^[가-힣]{2,}$/;
const signUpNameBoo = ref(false);

const signUpId = /^[a-z0-9]{5,12}$/;
const signUpIdBoo = ref(false);

const signUpPwd = /^(?=.*[a-z])(?=.*[\W]).{5,}$/;
const signUpPwdBoo = ref(false);

const signUpEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const signUpEmailBoo = ref(false);

const styles = reactive({
  memName: { border: "1px solid #ccc" },
  memId: { border: "1px soild #ccc" },
  memPwd: { border: "1px soild #ccc" },
  memEmail: { border: "1px soild #ccc" },
});
watchEffect(() => {
  if (signUpNameBoo.value && !signUpName.test(signUpMember.memName)) {
    styles.memName = { border: "1px solid red" };
  } else {
    styles.memName = { border: "1px solid #ccc" };
  }

  if (signUpIdBoo.value && !signUpId.test(signUpMember.memId)) {
    styles.memId = { border: "1px solid red" };
  } else {
    styles.memId = { border: "1px solid #ccc" };
  }

  if (signUpPwdBoo.value && !signUpPwd.test(signUpMember.memPwd)) {
    styles.memPwd = { border: "1px solid red" };
  } else {
    styles.memPwd = { border: "1px solid #ccc" };
  }

  if (signUpEmailBoo.value && !signUpPwd.test(signUpMember.memEmail)) {
    styles.memEmail = { border: "1px solid red" };
  } else {
    styles.memEmail = { border: "1px solid #ccc" };
  }
});
</script>

<style scoped>
.signBoxBodyInput {
  display: flex;
  width: 100%;
}
.signBoxBodyCheckBox {
  background-color: rgb(110, 110, 212);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 5px;
  font-size: 13px;
  font-weight: bold;
  color: white;
  width: 100%;
  height: 35px;
  margin-left: 10px;
  cursor: pointer;
}
.signBoxBodyCheckBox:active {
  background-color: rgb(83, 83, 165);
}

.signBox {
  width: 400px;
  height: 100vh;
  margin: auto;
  background-color: rgb(250, 250, 250);
}
.signBoxImg {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
}
.signBoxBody {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
}

.signBoxBody button {
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
.wrongBox {
  font-size: 12px;
  color: red;
  padding-top: 20px;
}
</style>
