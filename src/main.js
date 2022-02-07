import Vue from 'vue'
import router from './router'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import store from './store'
import Nav from "./components/Nav.vue";//引入全局组件Nav，Pagination
import Pagination from "./components/Pagination.vue";
import { Button, Icon, MessageBox, Message } from 'element-ui';

Vue.config.productionTip = false
//按需引入element-Ui
Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon)
//注册全局组件Nav，Pagination
Vue.component(Nav.name, Nav);
Vue.component(Pagination.name, Pagination);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

//注册懒加载插件
Vue.use(VueLazyload, {
  error: '/images/lazyload/error.jpg',//错误时展示的图片
  loading: '/images/lazyload/loading.gif',// 加载时展示的图片
  attempt: 1//尝试次数
})

//引入swiper样式
import 'swiper/swiper-bundle.css'
//接口函数统一注册到全局，方便在组件发请求
import * as API from '@/api';
//引入mockServe.js---mock数据
import '@/mock/mockServer.js';

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

