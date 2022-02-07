<template>
  <div class="list-container clearfix">
    <div class="center">
      <!-- 轮播图 -->
      <div class="swiper" ref="myswiper">
        <!-- 图片显示 -->
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="banner in bannerList"
            :key="banner.id"
          >
            <img :src="banner.imgUrl" />
          </div>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 切换按钮 -->
        <div class="swiper-button-next swiper-button-hidden"></div>
        <div class="swiper-button-prev swiper-button-hidden"></div>
      </div>
    </div>
    <!-- 右侧信息 -->
    <div class="right">
      <div class="news">
        <h4 class="clearfix">
          <em class="newscontent">省心购快报</em>
          <span class="more">更多 ></span>
        </h4>
        <ul class="news-list unstyled">
          <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
          <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
          <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
          <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
          <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
        </ul>
      </div>
      <div class="others">
        <img src="../assets/images/ab1.png" />
      </div>
    </div>
  </div>
</template>

<script>
import Swiper, { Navigation, Grid, Autoplay, Pagination } from "swiper";
import { mapState } from "vuex";
export default {
  name: "Listcontainer",
  //派发actions获取banners数据
  mounted() {
    this.$store.dispatch("getBannersList");
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
    }),
  },
  watch: {
    //监听数据
    bannerList(newVal, oldVal) {
      this.$nextTick(() => {
        //轮播图实例
        new Swiper(this.$refs.myswiper, {
          // 如果你使用的是Swiper的核心版本，请安装Grid模块(swiper7.0+)
          modules: [Navigation, Grid, Autoplay, Pagination],
          speed: 500,
          autoplay: {
            delay: 5000,
          },
          //分页器
          pagination: {
            el: ".swiper-pagination",
          },
          //前进后退设置
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            hideOnClick: true,
          },
          grid: {
            rows: 1, //水平排列1排
            fill: "row",
          },
          loop: true, //循环切换
          slidesPerView: 1, //展示1个
          slidesPerGroup: 1, //一次切换1个
        });
      });
    },
  },
};
</script>

<style scoped>
.list-container {
  width: 1200px;
  margin: 0 auto;
}
.center {
  float: left;
  margin-left: 200px;
}
.swiper {
  position: relative;
  width: 750px;
  --swiper-pagination-color: #ddd;
}
.swiper-wrapper {
  width: 750px;
}
.swiper-slide {
  height: 460px;
  overflow: hidden;
}
.swiper-slide img {
  width: 750px;
  height: 100%;
  display: block;
  background-size: cover;
}
.swiper .swiper-button-hidden {
  opacity: 0;
}
.swiper .swiper-button-prev {
  position: absolute;
  top: 50%;
  left: 20px;
}
.swiper .swiper-button-next {
  position: absolute;
  top: 50%;
  right: 20px;
}
.swiper .swiper-button-prev,
.swiper .swiper-button-next {
  font-size: 20px;
  font-weight: 400;
  color: rgba(172, 216, 219, 0.6);
  display: block;
}
/* 右侧信息 */
.right {
  padding: 20px 25px 0 25px;
  float: left;
  height: 460px;
  background-color: rgba(150, 180, 255, 0.3);
}
.right .news h4,
img {
  width: 200px;
}
.right .news h4 em {
  font-style: normal;
}
.right .news h4 span {
  float: right;
}
.right .news ul li {
  margin: 10px 0;
  width: 200px;
}
.right .others img {
  margin: 10px 0;
}
</style>