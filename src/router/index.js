import Vue from 'vue';
import VueRouter from 'vue-router';

// @在vue cli表示src 他是src路径别名
// 表示从src出发
import Login from '@/views/login';
Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

const router = new VueRouter({
  routes
});

export default router;
