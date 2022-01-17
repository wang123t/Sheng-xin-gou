<template>
  <div id="app">
    <Header />
    <Search v-if="$route.meta.isShow"/>
      <router-view></router-view>
    <Footer />
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import Search from "./components/Search.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Search,
    Footer,
  },
  mounted(){
    this.$store.dispatch("getBaseCategoryList"); //页面挂载通知vuex的actions处理一些业务，获取列表信息(放在app里只需要请求一次列表)
  }
};
</script>
<style>
#app {
  min-width: 1200px;
  min-height: 100px;
}
body{
  background-color: #fff;
}
li,
a {
  list-style: none;
  text-decoration: none;
  color: #000;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Microsoft YaHei";
}
.clearfix::after {
  content: "";
  clear: both;
  display: block;
}
</style>
