<template>
  <!-- 商品分类导航 -->
  <div class="nav">
    <div class="clearfix container">
      <div @mouseenter="showCategorys" @mouseleave="hideCategorys">
        <h2 class="all">商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isShow" @click="goSearch">
            <!-- 一级分类列表 -->
            <div
              class="item"
              v-for="(c1, index) in baseCategoryList"
              :key="c1.categoryId"
            >
              <h3
                :class="{ cur: currentIndex == index }"
                @mouseenter="changeIndex(index)"
              >
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                >
                  {{ c1.categoryName }}</a
                >
              </h3>
              <div
                class="item-list"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div class="subitem">
                  <!-- 二级分类列表 -->
                  <dl
                    class="fore clearfix"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <!-- 三级分类列表 -->
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav>
        <a href="#">服装城</a>
        <a href="#">美妆管</a>
        <a href="#">省心超市</a>
        <a href="#">全球购</a>
        <a href="#">团购</a>
        <a href="#">闪购</a>
        <a href="#">有趣</a>
        <a href="#">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Nav",
  data() {
    return {
      // 当前一级分类的下标(2/3级分类需要显示)
      currentIndex: -1, //初始不显示
      isShow: true,
    };
  },
  mounted() {
    //如果当前不是home页，隐藏一级列表
    if (this.$route.path !== "/") {
      this.isShow = false;
    }
  },
  computed: {
    // 从vuex管理的state中读取数据到当前组件
    ...mapState({
      // 读取home模块的所有分类数组
      baseCategoryList: (state) => state.home.baseCategoryList.slice(0, 13),
    }),
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index;
    },
    showCategorys() {
      this.isShow = true;
    },
    hideCategorys() {
      this.currentIndex = -1;
      //如果当前不是home页，隐藏一级列表
      if (this.$route.path !== "/") {
        this.isShow = false;
      }
    },
    goSearch(event) {
      //event.target:获取到的是出发事件的元素(div、h3、a、em、dt、dl)
      let node = event.target;
      //给a标签添加自定义属性data-categoryName,全部的字标签当中只有a标签带有自定义属性
      let { categoryname, category1id, category2id, category3id } =
        node.dataset;
      //第二个问题解决了：点击的到底是不是a标签（只要这个标签身上带有categoryname）一定是a标签
      //当前这个if语句：一定是a标签才会进入
      if (categoryname) {
        //准备路由跳转的参数对象
        let loction = { name: "searchGo" };
        let query = { categoryName: categoryname };
        //一定是a标签：一级目录
        if (category1id) {
          query.category1Id = category1id;
          //一定是a标签：二级目录
        } else if (category2id) {
          query.category2Id = category2id;
          //一定是a标签：三级目录
        } else {
          query.category3Id = category3id;
        }
        //判断：如果路由跳转的时候，带有params参数传递过去
        if (this.$route.params) {
          loction.params = this.$route.params;
          //动态给location配置对象添加query属性
          loction.query = query;
          //路由跳转
          this.$router.push(loction);
        }
      }
    },
  },
};
</script>

<style scoped>
a{
  cursor: pointer;
}
.nav {
  width: 100%;
  margin: 100px 0 0 0;
  border-bottom: 2px solid #f66e12;
}
.nav .container {
  width: 1200px;
  display: flex;
  margin: 0 auto;
  position: relative;
}
.nav .container h2 {
  width: 200px;
  padding: 10px;
  text-align: center;
  margin-bottom: 1px;
  background-color: #f66e12;
  color:#fff;
}
.nav .container h2,
.nav .container nav {
  float: left;
  height: 50px;
}
.nav .container nav a {
  display: inline-block;
  line-height: 50px;
  padding: 0 20px;
  color: #333;
  font-size: 16px;
}
.nav .container .sort {
  left: 0;
  top: 50px;
  width: 200px;
  height: 460px;
  margin-top: 3px;
  background-color: #f66e12;
  position: absolute;
  z-index: 999;
}
.nav .container .sort .item h3 {
  height: 35px;
  line-height: 35px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  background-color: #f66e12;
  border-top: 1px solid #ddd;
  text-align: center;
}
.nav .container .sort .item h3 a {
  color: #fff;
}
.nav .container .sort .item h3:hover {
  background-color: #ddd;
}
.nav .container .sort .item h3:hover a {
  color: #f66e12;
}
.nav .container .sort .item .item-list {
  display: none;
  position: absolute;
  width: 750px;
  height: 462px;
  overflow: auto;
  background-color: #eee;
  left: 200px;
  top: 0;
  z-index: 999;
}
.nav .container .sort .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 10px;
}
.nav .container .sort .item .item-list .subitem dl {
  padding: 8px 0;
}
.nav .container .sort .item .item-list .subitem dl dt {
  float: left;
  width: 80px;
  line-height: 22px;
  text-align: left;
  padding: 4px 8px 0 0;
  font-weight: 700;
}
.nav .container .sort .item .item-list .subitem dl dd {
  float: left;
  width: 500px;
  padding: 4px 0 0;
  overflow: hidden;
}
.nav .container .sort .item .item-list .subitem dl dd em {
  float: left;
  height: 14px;
  font-size: 14px;
  font-style: normal;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 4px;
  border-left: 1px solid #ccc;
}
/* 过渡动画 */
.sort-enter-active,
.sort-leave-active {
  transition: opacity 0.2s;
}
.sort-enter,
.sort-leave-to {
  opacity: 0;
}
</style>