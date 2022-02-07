<template>
  <div class="paysuccess">
    <div class="success">
      <h3><i class="el-icon-circle-check"></i>恭喜您，支付成功啦</h3>
      <div class="paydetail">
        <p class="button">
          <router-link class="btn-look" to="/center">查看订单</router-link>
          <router-link class="btn-goshop" to="/">继续购物</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Paysuccess",
  //组件内守卫
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    if (from.path.includes("/pay")) {
      next();
    } else {
      next(false);
    }
  },
};
</script>

<style lang="less" scoped>
.paysuccess {
  margin: 20px auto;
  padding: 25px;
  border: 1px solid rgb(211, 211, 211);
  width: 1200px;
  width: 1148px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;

  .success {
    margin: 0 auto;

    h3 {
      margin: 20px 0;
      text-align: center;
      font-weight: 700;
      font-size: 20px;
      line-height: 30px;
      i {
        margin-right: 10px;
        font-weight: 700;
        font-size: 20px;
        color: rgb(108, 236, 22);
      }
    }

    .paydetail {
      font-size: 15px;

      .button {
        margin: 30px 0;
        line-height: 26px;

        a {
          display: inline-block;
          box-sizing: border-box;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          border-radius: 2px;
          user-select: none;
          font-size: 18px;
          padding: 4px 20px;
          line-height: 22px;
          text-decoration: none;

          &.btn-look {
            margin-right: 13px;
            color: #fff;
            background-color: #e16a1b;
          }

          &.btn-goshop {
            color: #666;
            background-color: #eee;
            border: 1px solid #e1e1e1;
          }
        }
      }
    }
  }
}
</style>