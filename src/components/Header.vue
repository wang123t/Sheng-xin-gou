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
          <li>
            <a href=""><i class="el-icon-s-order"></i>我的订单</a
            ><span class="wall">|</span>
          </li>
          <li>
            <router-link to="/shopcart"
              ><i class="el-icon-shopping-cart-2"></i>我的购物车</router-link
            ><span class="wall">|</span>
          </li>
          <li>
            <a><i class="el-icon-s-promotion"></i>我的省心购</a
            ><span class="wall">|</span>
          </li>
          <li>
            <a><i class="el-icon-info"></i>我的会员</a
            ><span class="wall">|</span>
          </li>
          <li><a><i class="el-icon-office-building"></i>商家后台</a></li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    async LoginOut() {
      try {
        await this.$store.dispatch("userLoginOut"); //派发actions通知mutations清除token
        this.$router.push("/");
      } catch (error) {}
    },
  },
  computed: {
    userName(){
      return this.$store.state.user.userInfo.name;
    }
  },
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
  background-color: #ddd;
  min-width: 1200px;
  height: 40px;
}
header {
  background-color: #ddd;
  width: 1200px;
  height: 40px;
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
.loginList p a {
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
  line-height: 40px;
  padding: 5px;
  vertical-align: middle;
}
.typeList ul li a i {
  font-size: 16px;
  font-weight: 700;
  color: #f66e12;
  margin-right: 5px;
}
.welcome,
.wall {
  line-height: 40px;
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