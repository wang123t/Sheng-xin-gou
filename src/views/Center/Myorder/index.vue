<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table
          class="order-item"
          v-for="order in orderList.records"
          :key="order.id"
        >
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >{{ order.createTime }} 订单编号:{{ order.outTradeNo }}
                  <span class="pull-right delete"><img src="" /></span
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in order.orderDetailList" :key="item.id">
              <td width="60%">
                <div class="typographic">
                  <img :src="item.imgUrl" style="width: 100px; heigth: 100px" />
                  <a href="#" class="block-text">{{ item.skuName }}</a>
                  <span>x{{item.skuNum}}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                v-show="index == 0"
                width="8%"
                class="center"
              >
                {{ order.consignee }}
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                v-show="index == 0"
                width="13%"
                class="center"
              >
                <ul class="unstyled">
                  <li>总金额¥{{ order.totalAmount }}.00</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                v-show="index == 0"
                width="8%"
                class="center"
              >
                <a href="#" class="btn">{{ order.orderStatusName }}</a>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                v-show="index == 0"
                width="13%"
                class="center"
              >
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
        <!-- 分页器 -->
        <Pagination
          :pageNo="page"
          :pageSize="limit"
          :total="this.orderList.total"
          :continues="5"
          @changePage="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Myorder",
  data() {
    return {
      page: 1,
      limit: 3,
      //存放订单列表
      orderList: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //获取订单列表
    async getData() {
      const { page, limit } = this;
      let result = await this.$API.reqMyOrderList(page, limit);
      if (result.code == 200) {
        this.orderList = result.data;
      } else {
        alert(result.message);
      }
    },
    //改变页数
    changePage(page) {
      this.page = page;
      //再次发送请求
      this.getData();
    },
  },
};
</script>

<style scoped lang="less">
//右边
.order-right {
  float: right;
  width: 83.33%;

  //订单部分
  .order-content {
    margin: 0 20px;
    color: #666;

    //标题
    .title {
      margin-bottom: 22px;
      border: 1px solid #ddd;

      h3 {
        text-align: center;
        padding: 12px 10px;
        font-size: 15px;
        background-color: #f1f1f1;
      }
    }

    //表头
    .chosetype {
      margin-bottom: 15px;
      color: #666;

      table {
        border: 1px solid #e6e6e6;
        border-collapse: separate;
        border-radius: 2px;
        width: 100%;
        max-width: 100%;
        border-spacing: 0;

        th {
          padding: 6px 8px;
          color: #666;
          font-weight: 700;
          vertical-align: bottom;
          background-color: #f4f4f4;
          line-height: 18px;
          border-bottom: 1px solid #e6e6e6;
          font-size: 12px;
          text-align: left;
        }
      }
    }

    // 表单内容
    .orders {
      font-size: 12px;

      a {
        &:hover {
          color: #4cb9fc;
        }
      }

      table {
        border: 1px solid #e6e6e6;
        border-collapse: collapse;
        border-radius: 2px;
        width: 100%;
        margin-bottom: 18px;
        max-width: 100%;

        th {
          padding: 6px 8px;
          line-height: 18px;
          text-align: left;
          vertical-align: bottom;
          background-color: #f4f4f4;
          font-size: 12px;
          color: #666;

          .pull-right {
            float: right;
            cursor: pointer;

            img {
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }

        td {
          font-size: 12px;
          color: #666;
          padding: 6px 8px;
          line-height: 18px;
          text-align: left;
          vertical-align: middle;
          border: 1px solid #e6e6e6;

          &.center {
            text-align: center;
          }

          .typographic {
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              float: left;
              margin-right: 10px;
            }

            a {
              float: left;
              min-width: 80px;
              max-width: 250px;
              color: #e1251b;

              &.service {
                color: #666;
              }
            }

            span {
              float: left;
              min-width: 80px;
              max-width: 250px;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>