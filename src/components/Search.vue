<template>
  <div class="search">
    <div class="Logo">
      <router-link to='/'>
        <img src="../assets/logo.png" />
        <span>省心购</span>
      </router-link>
    </div>
    <div class="inputbox">
      <input autofocus type="text" v-model="keyword" /><button
        class="el-icon-search"
        @click="Search"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      keyword: "",
    };
  },
  props: ["trademark"],
  methods: {
    Search() {
      //关键字参数params路由跳转
      this.$router.push({
        name: "searchGo",
        params: { keyword: this.keyword },
      });
    },
  },
  mounted() {
    //全局事件总线 回调 写在需要修改的组件里
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
};
</script>

<style scoped>
.search {
  margin: 50px auto;
  display: flex;
  justify-content: center;
}
.Logo {
  float: left;
}
img {
  width: 60px;
  margin: 0 20px;
  vertical-align: middle;
}
span {
  display: inline-block;
  margin: 0 80px 0 0;
  font-size: 20px;
  color: #f66e12;
}
.inputbox {
  display: flex;
  align-items: center;
}
input,
button {
  margin: 5px 0;
  height: 50px;
}
input {
  width: 500px;
  font-size: 20px;
  border: 2px solid #f66e12;
  padding: 0 0 0 10px;
  outline: none;
}
button {
  width: 100px;
  font-size: 20px;
  color: rgb(255, 255, 255);
  border: 2px solid #f66e12;
  background-color: #f66e12;
}
</style>