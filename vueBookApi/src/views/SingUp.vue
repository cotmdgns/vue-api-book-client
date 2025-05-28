<template>
  <div class="signBox">
    <div class="signBoxImg" @click="goToHome">
      <img src="../assets/images/BookMoA.png" alt="" />
    </div>
    <div class="signBoxBody">
      <div class="signBoxBodyInput">
        <InputBox
          v-model="signUpMember.member.memId"
          :placeholder="'아이디을 입력하세요'"
          @input="signUpMember.memberBoolean.MemIdBoo = true"
          :style="signUpMember.memberStyle.memId"
          inputType="text"
        />
        <div @click="clientIdCheck" class="signBoxBodyCheckBox">중복체크</div>
      </div>

      <InputBox
        v-model="signUpMember.member.memPwd"
        :placeholder="'비밀번호를 입력하세요'"
        @input="signUpMember.memberBoolean.MemPwdBoo = true"
        :style="signUpMember.memberStyle.memPwd"
        inputType="password"
      />
      <InputBox
        v-model="signUpMember.member.memName"
        :placeholder="'이름를 입력하세요'"
        @input="signUpMember.memberBoolean.MemNameBoo = true"
        :style="signUpMember.memberStyle.memName"
      />
      <InputBox
        v-model="signUpMember.member.email"
        :placeholder="'이메일를 입력하세요'"
        @input="signUpMember.memberBoolean.MemEmailBoo = true"
        :style="signUpMember.memberStyle.memEmail"
      />
      <div class="wrongBox">
        <div
          v-if="
            signUpMember.memberBoolean.IdBoo &&
            !signUpId.test(signUpMember.member.memId)
          "
        >
          아이디 : 5~20자의 영문 소문자로만 가능합니다.
        </div>
        <div
          v-if="
            signUpMember.memberBoolean.PwdBoo &&
            !signUpPwd.test(signUpMember.member.memPwd)
          "
        >
          비밀번호 : 최소 5글자 이상이며 영문자 또는 특수문자 하나씩
          들어가야합니다
        </div>
        <div
          v-if="
            signUpMember.memberBoolean.NameBoo &&
            !signUpName.test(signUpMember.member.memName)
          "
        >
          이름 : 옳바르게 입력해주세요.
        </div>
        <div
          v-if="
            signUpMember.memberBoolean.EmailBoo &&
            !signUpEmail.test(signUpMember.member.email)
          "
        >
          이메일 : 제대로 입력해주세요
        </div>
      </div>
      <button class="buttonTop" @click="signUp">회원가입</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, watchEffect, ref } from "vue";
import { useRouter } from "vue-router";
import InputBox from "@/components/InputBox.vue";
import { idCheckAPI, signUpAPI } from "@/api/member";

const router = useRouter();
// 홈페이지로 이동
const goToHome = () => {
  router.push("/");
};
const signUpId = /^[a-z]{5,12}$/;
const signUpPwd = /^(?=.*[a-z])(?=.*[\W]).{5,}$/;
const signUpName = /^[가-힣]{2,}$/;
const signUpEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const signUpMember = reactive({
  member: {
    memId: "",
    memPwd: "",
    memName: "",
    email: "",
  },
  memberBoolean: {
    MemNameBoo: false,
    MemIdBoo: false,
    MemPwdBoo: false,
    MemEmailBoo: false,
  },
  memberStyle: {
    memName: { border: "1px solid #ccc" },
    memId: { border: "1px soild #ccc" },
    memPwd: { border: "1px soild #ccc" },
    memEmail: { border: "1px soild #ccc" },
  },
  signUpMember: [
    {
      field: "memId",
      valid: () =>
        signUpId.test(signUpMember.member.memId) &&
        signUpMember.member.memId.trim() !== "",
      error: "아이디가 옳바르지 않습니다",
      flag: "MemIdBoo",
    },
    {
      field: "memPwd",
      valid: () =>
        signUpPwd.test(signUpMember.member.memPwd) &&
        signUpMember.member.memPwd.trim() !== "",
      error: "비밀번호가 옳바르지 않습니다",
      flag: "MemPwdBoo",
    },
    {
      field: "memName",
      valid: () =>
        signUpName.test(signUpMember.member.memName) &&
        signUpMember.member.memName.trim() !== "",
      error: "이름이 옳바르지 않습니다",
      flag: "MemNameBoo",
    },
    {
      field: "memEmail",
      valid: () =>
        signUpEmail.test(signUpMember.member.email) &&
        signUpMember.member.email.trim() !== "",
      error: "이메일이 옳바르지 않습니다",
      flag: "MemEmailBoo",
    },
  ],
});
// 아이디 체크 API
let idCheckBoo = false;
const clientIdCheck = async () => {
  if (signUpMember.signUpMember[0].valid()) {
    await idCheckAPI(signUpMember.member.memId);
    idCheckBoo = true;
    alert("가능한 아이디입니다!");
  } else {
    alert("5~20자의 영문 소문자로만 가능합니다");
  }
};
// 회원가입 로직
const signUp = async () => {
  const check = signUpMember.signUpMember.find((v) => !v.valid());
  if (check) {
    signUpMember.memberBoolean[check.flag] = true;
    alert(check.error);
  } else if (!idCheckBoo) {
    alert("아이디 중복 체크를 해주세요.");
  } else {
    await signUpAPI(signUpMember.member);
    alert("회원가입 되었습니다!");
    router.push("/");
  }
};

watchEffect(() => {
  signUpMember.signUpMember.forEach((check) => {
    if (signUpMember.memberBoolean[check.flag]) {
      if (!check.valid()) {
        signUpMember.memberStyle[check.field] = { border: "1px solid red" };
      } else {
        signUpMember.memberStyle[check.field] = { border: "1px solid green" };
      }
    }
  });
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
  cursor: pointer;
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
