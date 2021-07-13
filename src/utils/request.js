/**
* 基于axios请求封装模块
*/

import axios from 'axios';

// 创建一个axios实例
const request = axios.create({
  'baseURL': 'http://api-toutiao-web.itheima.net/' // 请求基础路径
});

// 请求拦截器

// 响应拦截器

// 导出请求方法
export default request;

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })