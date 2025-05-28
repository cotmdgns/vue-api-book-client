import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/book",
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

// 추천작가책
export const recommendationAuthorBook = async (title) => {
  return await instance.get("recommendationAuthorBook/" + title);
};

// 디테일 책 페이지
export const serverDetailBookPageAPI = async (code) => {
  return await instance.get("serverDetailBookPage/" + code);
};

// 유저 검색
export const userBookSearchAPI = async (data) => {
  return await instance.get(
    "userBookSearchAPI/?title=" + data.title + "&number=" + data.number
  );
};

// 책 추가하기
export const createBookInfoAPI = async (data) => {
  return await instance.post("createBookInfoAPI", data);
};

// 책 삭제하기
export const removeBookInfoAPI = async (data) => {
  return await instance.post("removeBookInfoAPI", data);
};

// 책 체크하기
export const serverDetailBookCheckAPI = async (data) => {
  return await instance.get("serverDetailBookCheckAPI/" + data);
};

// 책 정보 가져오기
export const bookUserInfo = async () => {
  return await instance.post("bookUserInfo");
};
