import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 添加全局样式
import './styles/index.less';
// 加载完整element ui 组件
import ElementUI from 'element-ui';

// 按需加载element ui 组件
import '@/plugins/element';
import 'element-ui/lib/theme-chalk/index.css';
// 注册element ui 组件库
Vue.use(ElementUI);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  'render': h => h(App)
}).$mount('#app');
