<template>
  <!-- 分页器 -->
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <!-- 前面部分 -->
        <li
          class="prev"
          :class="{ disabled: pageNo == 1 }"
          @click="$emit('changePage', pageNo == 1 ? pageNo : pageNo - 1)"
        >
          <a>上一页</a>
        </li>
        <li v-show="startNumorendNum.start > 1" @click="$emit('changePage', 1)">
          <a>1</a>
        </li>
        <li class="dotted" v-show="startNumorendNum.start > 2">
          <span>...</span>
        </li>
        <!-- 中间部分 -->
        <li
          v-for="(page, index) in startNumorendNum.end"
          :key="index"
          v-show="page >= startNumorendNum.start"
          :class="{ active: pageNo === page }"
          @click="getPage(page)"
        >
          <a>{{ page }}</a>
        </li>
        <!-- 后面部分 -->
        <li class="dotted" v-show="startNumorendNum.end < totalPages - 1">
          <span>...</span>
        </li>
        <li
          v-show="startNumorendNum.end < totalPages"
          @click="$emit('changePage', totalPages)"
        >
          <a>{{ totalPages }}</a>
        </li>
        <li
          class="next"
          :class="{ disabled: pageNo == totalPages }"
          @click="$emit('changePage', pageNo == totalPages ? totalPages : pageNo + 1)"
        >
          <a>下一页</a>
        </li>
      </ul>
      <div>
        <span>共{{ total }}条&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  //计算出总计多少页totalPages,连续页数的start和end页码数
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    //定义一个start页和end页
    startNumorendNum() {
      const { pageNo, totalPages, continues } = this;
      let start = 1,
        end = totalPages;
      //如果连续页数设定为大于总页数，特殊情况
      if (continues > totalPages) {
        start = 1;
        end = totalPages;
      } else {
        start = pageNo - parseInt(continues / 2); //可能小于1
        end = pageNo + parseInt(continues / 2); //可能大于totalPages
        //分如下情况讨论：
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPages) {
          end = totalPages;
          start = totalPages - continues + 1;
        }
      }
      return { start, end }; //记得一定要有返回值start,end
    },
  },
  methods: {
    getPage(page) {
      this.$emit("changePage", page); //子组件传递参数给父组件
    },
  },
};
</script>



<style lang='less' scoped>
.page {
  height: 66px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  .sui-pagination {
    margin: 18px 0;

    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
      float: left;

      li {
        line-height: 18px;
        display: inline-block;
        margin: 0 5px;

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
          cursor: pointer;
        }

        &.active {
          a {
            background-color: #eb591f;
            color: #fff;
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
            color: #ccc;
            cursor: not-allowed; //禁止点击事件
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
      float: left;
      margin: 0 10px;

      span {
        line-height: 38px;
        vertical-align: middle;
      }
    }
  }
}
</style>