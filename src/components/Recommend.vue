<template>
  <div class="today-recommend">
    <div class="py-container">
      <ul class="recommend">
        <li class="clock">
          <div class="time">
            <img src="../assets/images/recommed/clock.png" />
            <h3>今日推荐</h3>
          </div>
        </li>
        <li class="banner">
          <img src="../assets/images/recommed/today01.png" alt="" />
        </li>
        <li class="banner">
          <img src="../assets/images/recommed/today02.png" />
        </li>
        <li class="banner">
          <img src="../assets/images/recommed/today03.png" />
        </li>
        <li class="banner">
          <img src="../assets/images/recommed/today04.png" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
};
</script>

<style scoped>
.today-recommend .py-container {
  width: 1200px;
  margin: 50px auto 20px;
}
.today-recommend .py-container .recommend {
  height: 165px;
  background-color: #eaeaea;
  margin: 10px 0;
  display: flex;
}
.today-recommend .py-container .recommend .clock {
  width: 16.67%;
  background-color: #5c5251;
  color: #fff;
  font-size: 18px;
  text-align: center;
}
.today-recommend .py-container .recommend .clock .time {
  padding: 30px 0;
}
.today-recommend .py-container .recommend .clock h3 {
  margin: 9px 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 30.06px;
}
.today-recommend .py-container .recommend .banner {
  width: 20.83%;
}
.today-recommend .py-container .recommend .banner img {
  width: 100%;
  height: 100%;
  transition: all 400ms;
}
.today-recommend .py-container .recommend .banner img:hover {
  opacity: 0.7;
}
</style>