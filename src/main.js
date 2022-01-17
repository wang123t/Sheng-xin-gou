import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store'
import Nav from "./components/Nav.vue";//引入全局组件Nav，Pagination
import Pagination from "./components/Pagination.vue";

Vue.config.productionTip = false
//注册全局组件Nav，Pagination
Vue.component(Nav.name, Nav);
Vue.component(Pagination.name, Pagination);

Vue.use(ElementUI);
//引入swiper样式
import 'swiper/swiper-bundle.css'
import * as API from '@/api';
//引入mockServe.js---mock数据
import '@/mock/mockServer.js'

const vm = new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;//安装全局事件总线
    Vue.prototype.$API = API
  },
  router,
  store,//注册一个store对象，所有组件对象身上都有$store属性
});

