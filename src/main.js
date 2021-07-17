import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 添加全局样式
import './styles/index.less';

// id为大数据的处理
// import JSONbig from 'json-bigint'

// const str = '{ "id": 1253585734669959168 }'

// console.log(JSON.parse(str)) // 1253585734669959200

// 它会把超出 JS 安全整数范围的数字转为一种类型为 BigNumber 的对象
// 我们在使用的时候需要把这个 BigNumber.toString() 就能得到原来正确的数据了
// console.log(JSONbig.parse(str))
// console.log(JSONbig.parse(str).id.toString()) // 1253585734669959168

// const data = JSONbig.parse(str)

// console.log(JSON.stringify(data))
// console.log(JSONbig.stringify(data))

// 加载完整element ui 组件
import ElementUI from 'element-ui';

// 按需加载element ui 组件
import '@/plugins/element';
import 'element-ui/lib/theme-chalk/index.css';
import { message } from '@/utils/resetMessage'

// 注册element ui 组件库
Vue.use(ElementUI);

// 注意一定要在element 下面
Vue.prototype.$message = message;

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  'render': h => h(App)
}).$mount('#app');
