import axios from "axios";
const instance = axios.create({
    // baseURL: 'http://127.0.0.1:5173/',
    timeout: 6000,
    withCredentials: false, // default
    headers: {'Authorization': 'AUTH_TOKEN'},
    // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    validateStatus: function (status) {
        return status >= 200 && status < 300; // default
    },
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  // 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // console.log(response)
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  export default instance