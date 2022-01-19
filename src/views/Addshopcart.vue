<template>
  <div class="addcart">
    <div class="cart-complete-wrap">
      <div class="cart-complete">
        <h3><i class="el-icon-circle-check"></i>商品已成功加入购物车!</h3>
        <div class="goods">
          <div class="left-good">
            <div class="left-pic">
              <img :src="skuInfo.skuDefaultImg" />
            </div>
            <div class="right-info">
              <p class="title">
                {{ skuInfo.skuName }}
              </p>
              <p
                class="attr"
                v-for="(skuAttr, index) in skuInfo.skuSaleAttrValueList"
                :key="skuAttr.id"
              >
                {{ skuAttr.saleAttrName }}<span>:</span
                >{{
                  newArr.length == 0 ? '未知': newArr[index].filter((item) => item.isChecked == 1)[0]
                    .saleAttrValueName
                }}
              </p>
              数量<span>{{ $route.query.skuNum }}</span>
            </div>
          </div>
          <div class="right-gocart">
            <router-link :to="`/detail/${skuInfo.id}`" class="btn-danger"
              >查看商品详情</router-link
            >
            <router-link to="/shopcart">去购物车结算 </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search";
export default {
  name: "Addshopcart",
  data() {
    return {
      skuInfo: {},
      spuSaleAttrList: [],
    };
  },
  components: {
    Search,
  },
  mounted() {
    let skuInfo = JSON.parse(sessionStorage.getItem("ADDSHOPCARTINFO"));
    this.skuInfo = skuInfo;
    let spuSaleAttrList = JSON.parse(
      sessionStorage.getItem("ADDSHOPCARTINFO1")
    );
    this.spuSaleAttrList = spuSaleAttrList;
  },
  //计算属性，从数组中取数组
  computed: {
    newArr() {
      return this.spuSaleAttrList.map((item) => item.spuSaleAttrValueList);
    },
  },
  
};
</script>

<style lang="less" scoped>
.cart-complete-wrap {
  background-color: #f4f4f4;

  .cart-complete {
    width: 1200px;
    padding: 50px 0;
    margin: 0 auto;

    h3 {
      font-weight: 400;
      font-size: 16px;
      color: rgb(30, 221, 62);
      padding-top: 15px;
      padding-bottom: 15px;
      margin: 0;

      .el-icon-circle-check {
        display: inline-block;
        background-color: #fff;
        padding: 3px;
        margin-right: 8px;
        border-radius: 15px;
      }
    }

    .goods {
      overflow: hidden;
      padding: 10px 0;
      position: relative;

      .left-good {
        float: left;

        .left-pic {
          margin: 0 20px;
          width: 80px;
          float: left;
          img {
            width: 80px;
            height: 80px;
          }
        }

        .right-info {
          color: #444;
          float: left;
          margin-left: 10px;

          .title {
            width: 100%;
            line-height: 28px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
          }

          .attr {
            color: #ec6206;
          }
          span {
            font-size: 16px;
            padding: 0 10px;
            color: #ec6206;
          }
        }
      }

      .right-gocart {
        position: absolute;
        right: 0;
        bottom: 10px;
        a {
          padding: 7px 36px;
          font-size: 15px;
          line-height: 22px;
          color: #333;
          background-color: #eee;
          text-decoration: none;
          box-sizing: border-box;
          cursor: pointer;
        }

        a:active {
          background-color: #e1e1e1;
        }

        .btn-danger {
          background-color: #ec6206;
          color: #fff;
        }
      }
    }
  }
}
</style>
