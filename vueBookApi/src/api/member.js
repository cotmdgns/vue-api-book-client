import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/member",
});

// 로그인
export const login = async (data) => {
  console.log(data);
  return await instance.post("login", data);
};

// 회원가입
