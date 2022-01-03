<template>
  <div class="list-container clearfix">
    <!-- 轮播图 -->
    <div class="center">
      <div class="viewpager-container">
        <!-- 图片显示 -->
        <div class="viewpager-wrapper">
          <div class="viewpager-slide">
            <img src="../assets/images/banner2.jpg" />
          </div>
        </div>
        <!-- 分页器 -->
        <div class="view-pagination"></div>
        <!-- 切换按钮 -->
        <div class="button-prev el-icon-arrow-left"></div>
        <div class="button-next el-icon-arrow-right"></div>
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
export default {
  name: "Listcontainer",
};
</script>

<style scoped>
.list-container {
  width: 1200px;
  margin: 0 auto;
}
.center{
    float: left;
}
.viewpager-wrapper {
  margin-left: 200px;
}
.viewpager-slide {
  height: 460px;
  overflow: hidden;
}
.viewpager-slide img {
  display: block;
  width: 750px;
}
.viewpager-container {
  position: relative;
  width: 950px;
}
.viewpager-container .button-prev {
  position: absolute;
  top: 50%;
  left: 210px;
}
.viewpager-container .button-next {
  position: absolute;
  top: 50%;
  right: 10px;
}
.viewpager-container .button-prev,
.viewpager-container .button-next {
  font-size: 50px;
  font-weight: 700;
  color: #555;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-50%);
  border-radius: 50%;
  cursor: pointer;
}
/* 右侧信息 */
.right{
    padding: 20px 25px 0 25px;
    float: left;
    height: 460px;
    background-color: rgba(150, 180, 255, 0.3);
}
.right .news h4,img{
    width: 200px;
}
.right .news h4 em{
    font-style: normal;
}
.right .news h4 span{
    float: right;
}
.right .news ul li{
    margin: 10px 0;
    width: 200px;
}
.right .others img{
  margin: 10px 0;
}
</style>