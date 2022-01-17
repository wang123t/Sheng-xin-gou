<template>
  <div class="swiper" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(imgurl, index) in skuimg"
        :key="imgurl.id"
      >
        <img
          :src="imgurl.imgUrl"
          :class="{ active: curIndex === index }"
          @click="changeCurIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper, { Navigation, Grid } from "swiper";
export default {
  data() {
    return {
      curIndex: 0,
    };
  },
  name: "ImageList",
  props: ["skuimg"],
  methods: {
    changeCurIndex(index) {
      this.curIndex = index; //点击加上class类名
      this.$bus.$emit("getCurIndex", index); //触发全局事件回调，传入当前index
    },
  },
  watch: {
    //监听数据
    skuimg(newVal, oldVal) {
      this.$nextTick(() => {
        //轮播图实例
        new Swiper(this.$refs.mySwiper, {
          // 如果你使用的是Swiper的核心版本，请安装Grid模块(swiper7.0+)
          modules: [Navigation, Grid],
          //前进后退设置
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          grid: {
            rows: 1, //水平排列1排
            fill: "row",
          },
          loop: true, //循环切换
          slidesPerView: 3, //展示3个
          slidesPerGroup: 1, //一次切换1个
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.swiper {
  margin: 20px 0 0;
  height: 56px;
  width: 398px;
  box-sizing: border-box;
  position: relative;

  .swiper-wrapper {
    position: absolute;
    left: 40px;
    display: flex;
    justify-content: space-between;
    padding: 3px 0;

    .swiper-slide {
      width: 50px;
      height: 50px;

      img {
        width: 50px;
        border: 1px solid #ccc;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }
  }
  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    background: rgba(235, 235, 235, 0.2);
    border: 1px solid rgb(204, 204, 204);
    border-radius: 50%;
    top: 0;
    margin-top: 13px;
    &::after {
      font-size: 15px;
      font-weight: 700;
    }
  }
}
</style>
