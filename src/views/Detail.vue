<template>
  <div class="detail">
    <!-- 商品分类导航 -->
    <Nav />
    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域 -->
      <div class="conPoin">
        <span>{{ categoryView.category1Name }}</span>
        <span>{{ categoryView.category2Name }}</span>
        <span>{{ categoryView.category3Name }}</span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom :skuimg="skuInfo.skuImageList" />
          <!-- 小图列表 -->
          <ImageList :skuimg="skuInfo.skuImageList" />
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">
              {{ skuInfo.skuName }}
            </h3>
            <p class="news">
              {{ skuInfo.skuDesc }}
            </p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">
                  价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
                </div>
                <div class="price">
                  <i>¥</i>
                  <em>{{ skuInfo.price }}</em>
                  <span>降价通知</span>
                </div>
                <div class="remark">
                  <i>累计评价</i>
                  <em>65545</em>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                </div>
                <div class="fixWidth">
                  <i class="red-bg">加价购</i>
                  <em class="t-gray"
                    >满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em
                  >
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">
                  支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
                </div>
                <div class="fixWidth">
                  以旧换新，闲置手机回收 4G套餐超值抢 礼品购
                </div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <div class="fixWidth">广东省 深圳市 宝安区</div>
              </div>
            </div>
          </div>
          <!-- 参数详情参数 -->
          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
                <dt class="title">{{ saleAttr.saleAttrName }}</dt>
                <dd
                  v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                  :key="saleAttrValue.id"
                  :class="{ active: saleAttrValue.isChecked == 1 }"
                  @click="
                    changeActive(saleAttrValue, saleAttr.spuSaleAttrValueList)
                  "
                >
                  <!-- 点击事件选择参数高亮，传入对象以及对象所在的数组 -->
                  {{ saleAttrValue.saleAttrValueName }}
                </dd>
              </dl>
            </div>
            <!--加入购物车  -->
            <div class="cartWrap">
              <div class="controls">
                <input
                  autocomplete="off"
                  class="itxt"
                  autofocus
                  v-model="Num"
                  @click="getNum"
                />
                <a class="plus" @click="Num++">+</a>
                <a class="mins" @click="Num > 1 ? Num-- : Num">-</a>
              </div>
              <div class="add">
                <a @click="getAddshopcart">加入购物车</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ImageList from "../components/ImageList";
import Zoom from "../components/Zoom";

import { mapGetters } from "vuex";
export default {
  name: "Detail",
  data() {
    return {
      Num: 1,
    };
  },
  components: {
    Zoom,
    ImageList,
  },
  mounted() {
    this.$store.dispatch("getGoodsInfo", this.$route.params.skuId);
  },
  computed: {
    ...mapGetters(["categoryView", "skuInfo", "spuSaleAttrList"]),
  },
  methods: {
    changeActive(saleAttrValue, Arr1) {
      //清除对象的默认属性isChecked
      Arr1.forEach((item) => {
        item.isChecked = 0;
      });
      //点击选择高亮
      saleAttrValue.isChecked = 1;
    },
    //校验用户输入的Num
    getNum(event) {
      const value = event.target.value * 1;
      if (isNaN(value) || value < 1) {
        this.Num = 1;
      } else {
        this.Num = parseInt(value);
      }
    },
    //加入购物车,提示用户是否加入成功，函数调用返回的是一个Promise对象
    getAddshopcart() {
      try {
        this.$store.dispatch("getAddshopcart", {
          skuId: this.$route.params.skuId,
          skuNum: this.Num,
        });
        this.$router.push({ name: "addshopcart", query: { skuNum: this.Num } });
        //会话存储商品信息对象(存储的为字符串，需要字符串化，JSON.stringfy)
        sessionStorage.setItem("ADDSHOPCARTINFO", JSON.stringify(this.skuInfo));
        sessionStorage.setItem(
          "ADDSHOPCARTINFO1",
          JSON.stringify(this.spuSaleAttrList)
        );
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  .con {
    width: 1200px;
    margin: 15px auto 0;

    .conPoin {
      padding: 9px 15px 9px 0;

      & > span + span:before {
        content: "/\00a0";
        padding: 0 5px;
        color: #ccc;
      }
    }

    .mainCon {
      overflow: hidden;
      margin: 5px 0 15px;

      .previewWrap {
        float: left;
        width: 400px;
        position: relative;
      }

      .InfoWrap {
        width: 700px;
        float: right;

        .InfoName {
          font-size: 14px;
          line-height: 21px;
          margin-top: 15px;
        }

        .news {
          color: #f66e12;
          margin-top: 15px;
        }

        .priceArea {
          background: #fee9eb;
          padding: 7px;
          margin: 13px 0;

          .priceArea1 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              float: left;
              margin-right: 15px;
            }

            .price {
              float: left;
              color: #f66e12;

              i {
                font-size: 16px;
              }

              em {
                font-size: 24px;
                font-weight: 700;
              }

              span {
                font-size: 12px;
              }
            }

            .remark {
              float: right;
            }
          }

          .priceArea2 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;

              .red-bg {
                background: #f66e12;
                color: #fff;
                padding: 3px;
              }

              .t-gray {
                color: #999;
              }
            }
          }
        }

        .support {
          border-bottom: 1px solid #ededed;
          padding-bottom: 5px;

          .supportArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;
              color: #999;
            }
          }
        }

        .choose {
          .chooseArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            dl {
              overflow: hidden;
              margin: 13px 0;

              dt {
                margin-right: 15px;
                float: left;
              }

              dd {
                float: left;
                margin-right: 5px;
                color: #666;
                line-height: 24px;
                padding: 2px 14px;
                border-top: 1px solid #eee;
                border-right: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
                border-left: 1px solid #eee;
                cursor: pointer;

                &.active {
                  color: #f66e12;
                  border: 1px solid #f66e12;
                }
              }
            }
          }

          .cartWrap {
            overflow: hidden;
            display: flex;
            justify-content: center;
            .controls {
              width: 48px;
              position: relative;
              float: left;
              margin-right: 25px;

              .itxt {
                width: 38px;
                height: 37px;
                border: 1px solid #ddd;
                color: #555;
                float: left;
                text-align: center;
                outline: none;
              }

              .plus,
              .mins {
                width: 15px;
                text-align: center;
                height: 17px;
                line-height: 17px;
                background: #f1f1f1;
                color: #666;
                position: absolute;
                right: -8px;
                border: 1px solid #ccc;
                cursor: pointer;
              }

              .mins {
                right: -8px;
                top: 19px;
                border-top: 0;
              }

              .plus {
                right: -8px;
              }
            }

            .add {
              float: left;

              a {
                background-color: #f66e12;
                padding: 0 25px;
                font-size: 16px;
                color: #fff;
                height: 36px;
                line-height: 36px;
                display: block;
                cursor: pointer;

                &:hover {
                  color: #666;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
