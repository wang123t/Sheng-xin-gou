<template>
  <div class="header">
    <header>
      <div class="loginList">
        <span class="welcome">省心购欢迎您!</span>
        <img src="../assets/logo.png" />
        <p v-if="!userName">
          <router-link to="/login">请登录</router-link
          ><span class="wall">|</span>
          <router-link to="/register">免费注册</router-link>
        </p>
        <p v-else class="loginshow">
          <a>{{ userName }}</a
          ><span class="wall">|</span>
          <a @click="LoginOut">退出登录</a>
        </p>
      </div>
      <div class="typeList">
        <ul>
          <li><a href="">我的订单</a><span class="wall">|</span></li>
          <li><a href="">我的购物车</a><span class="wall">|</span></li>
          <li><a href="">我的省心购</a><span class="wall">|</span></li>
          <li><a href="">我的会员</a><span class="wall">|</span></li>
          <li><a href="">企业采购</a><span class="wall">|</span></li>
          <li><a href="">关注我们</a><span class="wall">|</span></li>
          <li><a href="">合作招商</a><span class="wall">|</span></li>
          <li><a href="">商家后台</a></li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    async LoginOut() {
      try {
        await this.$store.dispatch("userLoginOut"); //派发actions通知mutations清除token
        this.$router.push("/");
      } catch (error) {}
    },
  },
  computed: {
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #ddd;
  min-width: 1200px;
  height: 50px;
}
header {
  background-color: #ddd;
  width: 1200px;
  height: 50px;
  margin: 0 auto;
}
.loginList {
  float: left;
}
.loginList img {
  display: inline-block;
  width: 25px;
  vertical-align: middle;
  margin: 0 10px;
}
.loginList p {
  display: inline-block;
}
.loginList p a{
  vertical-align: middle;
}
.loginList .loginshow a {
  cursor: pointer;
  color: rgb(238, 89, 43);
}
.typeList {
  float: right;
}
.typeList ul li {
  float: left;
}
.typeList ul li a {
  line-height: 50px;
  padding: 5px;
}
.welcome,
.wall {
  line-height: 50px;
  vertical-align: middle;
}
.welcome {
  padding: 0 20px 0 0;
  color: #f66e12;
}
.wall {
  padding: 0 5px;
}
</style>