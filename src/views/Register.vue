<template>
  <div class="register">
    <h3>
      <span class="user">注册新用户</span>
      <span class="gologin"
        >已有账号，去<router-link to="/login">登录</router-link></span
      >
    </h3>
    <form>
      <div class="content">
        <label>手机号</label>
        <input type="tel" placeholder="请输入手机号" v-model="phone" />
        <span class="error-msg"></span>
      </div>
      <div class="content">
        <label>验证码</label>
        <input type="number" placeholder="请输入验证码" v-model="code" />
        <button style="width: 100px; height: 35px" @click="getCode">
          获取验证码
        </button>
      </div>
      <div class="content">
        <label>登录密码</label>
        <input type="password" placeholder="请输入密码" v-model="password" />
      </div>
      <div class="content">
        <label>确认密码</label>
        <input
          type="password"
          placeholder="请再次确认密码"
          v-model="password1"
        />
      </div>
      <div class="controls">
        <input type="checkbox" v-model="agree" />
        <span>同意协议并注册《省心购用户协议》</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register", //注册的组件
  data() {
    return {
      phone: "",
      code: "",
      password: "",
      password1: "",
      agree: true,
    };
  },
  methods: {
    //获取验证码
    async getCode() {
      //简单判断一下---至少用数据
      try {
        //如果获取到验证码
        const { phone } = this;
        phone && (await this.$store.dispatch("GetCode", phone));
        //将组件的code属性值变为仓库中验证码[验证码直接自己填写了]
        this.code = this.$store.state.user.code;
      } catch (error) {}
    },

    //用户注册
    async userRegister() {
      // console.log(this.code)
      //全部表单验证成功，在向服务器发请求
      //只要有一个表单没有成功，不会发请求
      try {
        const { phone, password, code, password1 } = this;
        phone &&
          code &&
          password == password1 &&
          (await this.$store.dispatch("UserRegister", {
            phone,
            code,
            password,
          }));
        this.$router.push("/login");
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style scoped>
.register {
  width: 1200px;
  height: 450px;
  border: 1px solid #dfdfdf;
  margin: 0 auto;
}

.register h3 {
  position: relative;
  background: #ececec;
  margin: 0;
  padding: 0 15px;
  color: #333;
  border-bottom: 1px solid #dfdfdf;
  font-size: 20px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: end;
}
.register h3 .user {
  display: block;
  position: absolute;
  left: 50%;
  top: 0;
  color: #f66e12;
  transform: translateX(-50%);
}
.register h3 .gologin {
  font-size: 14px;
  font-weight: normal;
}
.register h3 span a {
  color: #f66e12;
}
.register div:nth-of-type(1) {
  margin-top: 40px;
}
.register form .content {
  padding-left: 390px;
  margin-bottom: 18px;
  position: relative;
}
.register form .content label {
  font-size: 14px;
  width: 96px;
  text-align: right;
  display: inline-block;
}
.register form .content input {
  width: 270px;
  height: 35px;
  padding-left: 8px;
  box-sizing: border-box;
  margin-left: 5px;
  outline: none;
  border: 1px solid #999;
  vertical-align: middle;
}
.register form .content button {
  vertical-align: middle;
  margin-left: 10px;
}
.register form .content .error-msg {
  position: absolute;
  top: 100%;
  left: 495px;
  color: #f66e12;
}
.register form .controls {
  margin-left: 55px;
  text-align: center;
  position: relative;
}
.register form .controls input,
.register form .controls span {
  vertical-align: middle;
  color: skyblue;
  margin-left: 5px;
}
.register form .controls .error-msg {
  position: absolute;
  top: 100%;
  left: 495px;
  color: #f66e12;
}
.register form .btn {
  display: flex;
  justify-content: center;
  margin: 18px 0 0 55px;
}
.register form .btn button {
  border: none;
  width: 270px;
  height: 40px;
  background: #f66e12;
  color: #fff !important;
  display: block;
  font-size: 16px;
}
</style>