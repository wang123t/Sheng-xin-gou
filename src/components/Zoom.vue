<template>
  <div class="spec-preview">
    <img :src="skuimg[curIndex].imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="skuimg[curIndex].imgUrl" ref="zoom"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      curIndex: 0,
    };
  },
  //移动放大镜
  methods: {
    handler(e) {
      let mask = this.$refs.mask;
      let zoom = this.$refs.zoom;
      let Left = e.offsetX - mask.offsetWidth / 2;
      let Top = e.offsetY - mask.offsetHeight / 2;
      if (Left < 0) Left = 0;
      if (Left > mask.offsetWidth) Left = mask.offsetWidth;
      if (Top < 0) Top = 0;
      if (Top > mask.offsetHeight) Top = mask.offsetHeight;
      //修改放大镜的位置
      mask.style.left = Left + "px";
      mask.style.top = Top + "px";
      //显示放大的图片
      zoom.style.left = -2 * Left + "px";
      zoom.style.top = -2 * Top + "px";
    },
  },
  props: {
    skuimg: {
      type: Array,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return [{}];
      },
    },
  },
  //全局事件，接受index
  mounted() {
    this.$bus.$on("getCurIndex", (index) => {
      this.curIndex = index;
    });
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(243, 111, 35, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
