import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/member",
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 로그인
export const loginAPI = async (data) => {
  try {
    return await instance.post("login", data);
  } catch {
    alert("아이디와 비밀번호가 틀립니다.");
  }
};

// 회원가입
export const signUpAPI = async (data) => {
  return await instance.post("signUp", data);
};

// 회원가입 아이디 체크
export const idCheckAPI = async (id) => {
  return await instance.post("idCheck/" + id);
};
