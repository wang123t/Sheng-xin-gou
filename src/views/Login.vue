<template>
  <div class="login-box">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="##" style="border-right: 0">扫描登录</a>
            </li>
            <li>
              <a href="##" class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <form id="phone">
              <div class="input-text clearFix">
                <input
                  type="text"
                  name="phone"
                  placeholder="手机号"
                  v-model="phone"
                />
              </div>
              <div class="input-text clearFix">
                <span class="pwd"></span>
                <input
                  type="password"
                  placeholder="请输入密码"
                  v-model="password"
                />
              </div>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" v-model="checked" />
                  <span>自动登录</span>
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <!-- 利用修饰符prevent阻止表单默认行为 -->
              <button class="btn" type="submit" @click.prevent="login">
                登&nbsp;&nbsp;录
              </button>
            </form>
            <div class="call clearFix">
              <ul>
                <li><img src="../assets/images/qq.png" alt="" /></li>
                <li><img src="../assets/images/sina.png" alt="" /></li>
                <li><img src="../assets/images/ali.png" alt="" /></li>
                <li><img src="../assets/images/wechat.png" alt="" /></li>
              </ul>
              <router-link
                class="register"
                :to="{ path: '/register', query: $route.query }"
                >注册</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      password: "",
      checked: true,
    };
  },
  methods: {
    async login() {
      try {
        const { phone, password } = this;
        if (phone && password) {
          await this.$store.dispatch("userLogin", {
            phone,
            password,
          });
          this.$router.push("/");//登录成功跳转至home页
          console.log('登录成功')
        } else{
          alert('手机号或密码不能为空')
        } 
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style scoped>
.login-wrap {
  height: 460px;
  background-color: #fff;
  margin: 40px auto 0;
}
.login-wrap .login {
  width: 1200px;
  height: 460px;
  margin: 0 auto;
  background: url(../assets/images/loginbg.png) no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .loginform {
  width: 420px;
  height: 406px;
  background: #fff;
  padding: 20px;
}
.login-wrap .loginform .tab li {
  width: 50%;
  float: left;
  text-align: center;
}
.login-wrap .loginform .tab li a {
  width: 100%;
  display: block;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-weight: 700;
  color: #333;
  border: 1px solid #ddd;
  text-decoration: none;
}
.login-wrap .loginform .tab li .current {
  border-bottom: none;
  border-top-color: #28a3ef;
  color: #f66e12;
}
.login-wrap .loginform .content {
  width: 380px;
  height: 316px;
  border: 1px solid #ddd;
  border-top: none;
  padding: 18px;
}
.login-wrap .loginform .content form {
  margin: 15px 0 18px 0;
  font-size: 12px;
  line-height: 18px;
}
.login-wrap .loginform .content form .input-text {
  margin-bottom: 22px;
  position: relative;
}
.login-wrap .loginform .content form .input-text i {
  float: left;
  width: 37px;
  height: 32px;
  border: 1px solid #ccc;
  background: url(../assets/images/icons.png) no-repeat -10px -201px;
  border-radius: 2px 0 0 2px;
}
.login-wrap .loginform .content form .input-text .pwd {
  background-position: -72px -201px;
}
.login-wrap .loginform .content form .input-text input {
  width: 100%;
  height: 32px;
  border: 1px solid #ccc;
  float: left;
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 14px;
  line-height: 22px;
  padding-right: 8px;
  padding-left: 8px;
  border-radius: 0 2px 2px 0;
  outline: none;
}
.login-wrap .loginform .content form .input-text .error-msg {
  position: absolute;
  top: 100%;
  left: 40px;
  color: #f66e12;
}
.login-wrap .loginform .content form .setting label {
  float: left;
}
.login-wrap .loginform .content form .setting label input,
.login-wrap .loginform .content form .setting label span {
  vertical-align: middle;
  margin-right: 10px;
}
.login-wrap .loginform .content form .setting .forget {
  float: right;
}
.login-wrap .loginform .content form .btn {
  background-color: #f66e12;
  padding: 6px;
  border-radius: 0;
  font-size: 16px;
  font-family: 微软雅黑;
  word-spacing: 4px;
  border: 1px solid #f66e12;
  color: #fff;
  width: 100%;
  height: 36px;
  margin-top: 25px;
  outline: none;
}
.login-wrap .loginform .content .call {
  margin-top: 30px;
}
.login-wrap .loginform .content .call ul {
  float: left;
}
.login-wrap .loginform .content .call ul li {
  float: left;
  margin: 0 15px;
}
.login-wrap .loginform .content .call ul li img {
  display: block;
  height: 35px;
}
.login-wrap .loginform .content .call .register {
  float: right;
  font-size: 15px;
  line-height: 38px;
}
.login-wrap .loginform .content .call .register:hover {
  color: #4cb9fc;
  text-decoration: underline;
}
</style>