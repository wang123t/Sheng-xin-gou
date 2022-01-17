<template>
  <div class="cart">
    <h4>购物车商品</h4>  
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="changeChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="changeNum('minus', -1, cart)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @click="changeNum('change', $event.target.value * 1, cart)"
            />
            <a class="plus" @click="changeNum('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(cart)">删除</a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isNoChecked"
          @change="isAllChecked($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCart">删除选中的商品</a>
        <a>移到我的关注</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalChecked }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价 :</em>
          <i class="summoney">￥{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "Shopcart",
  data() {
    return {};
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["shopcartList"]),
    cartList() {
      return this.shopcartList.cartInfoList || [];
    },
    
    //是否全选
    isNoChecked() {
      return this.cartList.length > 0 ? this.cartList.every((item) => item.isChecked == 1) : 0;
    },
    //已选择商品种类数
    totalChecked() {
      return this.cartList.filter((item) => item.isChecked == 1).length;
    },
    //总合计价格
    totalPrice() {
      return this.cartList
        .filter((item) => item.isChecked == 1)
        .map((item) => item.skuNum * item.skuPrice)
        .reduce((total, value) => total + value, 0);
    },
  },
  methods: {
    //发请求获取购物车数据
    getData() {
      this.$store.dispatch("getShopcart");
    },
    //改变购物车产品数量
    //type:为了区分这三个元素
    //disNum形参:+ 变化量（1）  -变化量（-1）   input最终的个数（并不是变化量）
    //cart:哪一个产品【身上有id】
    //向服务器发请求，修改数量
    //throttle()节流，一段时间内，多次点击后只发送一次请求
    changeNum: throttle(async function (type, disNum, cart) {
      switch (type) {
        //加add
        case "add":
          disNum = 1;
          break;
        //减操作
        case "minus":
          disNum = cart.skuNum <= 1 ? 0 : -1;
          break;
        //输入数量
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch("getAddshopcart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        //再次发送请求刷新页面
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 500),
    //修改产品的选中状态
    async changeChecked(cart, event) {
      try {
        await this.$store.dispatch("changeCartChecked", {
          skuId: cart.skuId,
          isChecked: event.target.checked * 1,
        }); //请求参数isChecked为 0 || 1
        this.getData(); //再次发请求
      } catch (error) {
        alert(error.message);
      }
    },
    //切换全选
    async isAllChecked(event) {
      try {
        this.cartList.forEach((item) => {
          item.isChecked = event.target.checked * 1;
        });
        await this.$store.dispatch("isAllCartChecked");
        this.getData();
      } catch (error) {
        alert('购物车为空');
      }
    },

    //删除某个商品
    async deleteCart(cart) {
      try {
        await this.$store.dispatch("deleteCart", cart.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除所有勾选的商品
    async deleteAllCart() {
      try {
        await this.$store.dispatch("deleteAllCheckedCart");
        this.getData();
      } catch (error) {
        alert('购物车为空');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            text-align: center;
            padding: 8px;
            cursor: pointer;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 39px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            text-align: center;
            padding: 8px;
            cursor: pointer;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    margin: 0 0 20px 0;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;
      display: flex;
      justify-content: center;
      align-items: center;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #e65310;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e65310;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
