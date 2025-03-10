import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/member",
});

// 로그인
export const loginAPI = async (data) => {
  console.log(data);
  return await instance.post("login", data);
};

// 회원가입
export const signUpAPI = async (data) => {
  return await instance.post("signUp", data);
};

// 회원가입 아이디 체크
export const idCheckAPI = async (id) => {
  return await instance.post("idCheck/" + id);
};
