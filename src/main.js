import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store'
import Nav from "./components/Nav.vue";//全局组件Nav
import Pagination from "./components/Pagination.vue";//全局组件Nav

// import * as echarts from 'echarts'
// Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.component(Nav.name, Nav);
Vue.component(Pagination.name, Pagination);
Vue.use(ElementUI);
import * as API from '@/api';

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

