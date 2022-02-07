<template>
  <div>
    <Search :trademark="this.searchParams.trademark" />
    <!-- 商品分类三级列表 -->
    <Nav />
    <div class="main">
      <div class="py-container clearfix">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a>全部结果</a>
            </li>
          </ul>
          <!-- 面包屑tag -->
          <ul class="fl sui-tag">
            <li
              class="with-x"
              v-show="searchParams.categoryName"
              @click="removeCategoryName"
            >
              {{ searchParams.categoryName }}<i class="el-icon-close"></i>
            </li>
            <li
              class="with-x"
              v-show="searchParams.keyword"
              @click="removeKeyword"
            >
              {{ searchParams.keyword }}<i class="el-icon-close"></i>
            </li>
            <li
              class="with-x"
              v-show="searchParams.trademark"
              @click="removetrademark"
            >
              {{ searchParams.trademark.split(":")[1] }}
              <i class="el-icon-close"></i>
            </li>
          </ul>
        </div>

        <!-- 自定义事件，子传父，在父组件上绑定自定义事件，定义事件名@'xxx',回调名'xxxx' -->
        <SearchSelector @trademark="gettrademark" />

        <!--排序-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 综合排序 -->
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<i
                      :class="{
                        'el-icon-bottom': isDesc,
                        'el-icon-top': isAsc,
                      }"
                      v-show="isOne"
                    ></i
                  ></a>
                </li>
                <!-- 价格排序 -->
                <li :class="{ active: isTow }" @click="changeOrder('2')">
                  <a
                    >价格<i
                      :class="{
                        'el-icon-bottom': isDesc,
                        'el-icon-top': isAsc,
                      }"
                      v-show="isTow"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 产品详细列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 动态绑定路由跳转，带上参数id（params）参数 -->
                    <router-link :to="`/detail/${good.id}`"
                      ><img v-lazy="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${good.id}`">{{
                      good.title
                    }}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <router-link
                      class="sui-btn btn-bordered btn-danger"
                      :to="`/detail/${good.id}`"
                    >
                      加入购物车</router-link
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 自定义事件，子传父，在父组件上绑定自定义事件，定义事件名@'xxx',回调名'xxxx' -->
        <Pagination
          :pageNo="searchParams.pageNo"
          :pageSize="searchParams.pageSize"
          :total="total"
          :continues="5"
          @changePage="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
import SearchSelector from "../components/SearchSelector.vue";
import { mapGetters, mapState } from "vuex";
export default {
  name: "SearchGo",
  components: {
    Search,
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        //产品相应的id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //产品的名字
        categoryName: "",
        //搜索的关键字
        keyword: "",
        //排序:初始状态应该是综合且降序
        order: "2:desc",
        //当前第几页
        pageNo: 1,
        //每一页展示条数
        pageSize: 10,
        //平台属性的操作
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  beforeMount() {
    //合并参数，发送请求之前整理参数，利用ES6语法Object.assign
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData(); //只会发一次请求
  },
  computed: {
    //mapGetters里面的写法：传递的数组，因为getters计算是没有划分模块【home,search】
    ...mapGetters(["goodsList"]),
    //mapState拿到仓库里的total数据
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
    isOne() {
      return this.searchParams.order.includes("1");
    },
    isTow() {
      return this.searchParams.order.includes("2");
    },
    isAsc() {
      return this.searchParams.order.includes("asc");
    },
    isDesc() {
      return this.searchParams.order.includes("desc");
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams); //随时调用
    },
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.pageNo = 1; //重置pageNo当前页为1
      this.getData(); //清空后发一次请求，展示默认信息
      this.$router.push({ name: "searchGo", params: this.$route.params }); //清空路由的query参数，保留keyword参数
    },
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.searchParams.pageNo = 1; //重置pageNo当前页为1
      this.getData();
      this.$bus.$emit("clear"); //全局事件总线$emit触发回调
      this.$router.push({ name: "searchGo", query: this.$route.query }); //清空keyword，但考虑保留query参数
    },
    //自定义事件的回调
    gettrademark(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`; //拿到value,组合成新对象
      this.searchParams.pageNo = 1; //重置pageNo当前页为1
      this.getData();
    },
    removetrademark() {
      this.searchParams.trademark = "";
      this.searchParams.pageNo = 1; //重置pageNo当前页为1
      this.getData();
    },
    changeOrder(flag) {
      //获取初始的order类型flag以及排序升降sort
      const originOrder = this.searchParams.order;
      const originFlag = originOrder.split(":")[0];
      const originSort = originOrder.split(":")[1];
      let newOrder = ""; //重新定义order
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`; //重新赋值给newOrder
      } else {
        //每次切换，初始的order的排序状态均为desc
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOrder; //重新赋值给data里的order
      this.getData(); //再次发送请求
    },
    //自定义事件的回调
    changePage(pageNo) {
      //拿到pageNo后，重新整理searchParams参数
      this.searchParams.pageNo = pageNo;
      //重新发送请求
      this.getData();
    },
  },
  watch: {
    //数据监听：监听组件实例身上的属性变化
    $route(newValue, oldValue) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.searchParams.pageNo = 1; //重置pageNo当前页为1
      this.getData();
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>
 
<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 3px 7px;
          height: 27px;
          line-height: 21px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #f66e12;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 100%;
                a {
                  color: #666;

                  img {
                    vertical-align: middle;
                    width: 200px;
                    height: 215px;
                  }
                }
              }

              .price {
                display: flex;
                justify-content: center;
                padding: 0 15px;
                font-size: 18px;
                color: #f66e12;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                  em {
                    margin-right: 10px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 50px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #f66e12;
                  color: #f66e12;

                  &:hover {
                    border: 1px solid #f66e12;
                    background-color: #f66e12;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #f66e12;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
