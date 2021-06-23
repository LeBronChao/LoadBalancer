import { BASE_URL } from "./../constant/index";
import axios from "axios";



/*
* 请求函数
* */
export const getData = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(BASE_URL)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
