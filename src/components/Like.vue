<template>
  <div class="like">
    <div class="py-container">
      <div class="title">
        <h3 class="fl">猜你喜欢</h3>
        <a href="javascript:;" class="fr tip changeBnt">换一换</a>
      </div>
      <div class="bd">
        <ul class="favourate">
          <li v-for="like in likeList" :key="like.id">
            <img :src="like.imgUrl" />
            <div class="like-text">
              <p>{{ like.skuDec }}</p>
              <h3>¥{{ like.price }}</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  computed: {
    ...mapState({
      likeList: (state) => state.home.likeList,
    }),
  },
  mounted() {
    this.$store.dispatch("getLikeList");
  },
};
</script>

<style scoped lang="less">
.like {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      overflow: hidden;

      .fl {
        float: left;
        font-size: 20px;
        line-height: 30px;
      }

      .fr {
        float: right;
        background-image: url(../assets/images/icons.png);
        width: 66px;
        height: 25px;
        background-position: 182px -104px;
        line-height: 30px;
        font-size: 12px;
        font-weight: 400;
        color: #666;
        text-decoration: none;
      }
    }

    .bd {
      .favourate {
        border: 1px solid #e4e4e4;
        overflow: hidden;
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;

        li {
          width: 250px;
          padding: 30px;
          overflow: hidden;
          background: #fff;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;

          img {
            display: block;
            width: 150px;
            height: 200px;
            background-size: cover;
            transition: all 400ms;

            &:hover {
              opacity: 0.8;
              transform: scale(1.1);
            }
          }

          .like-text {
            padding: 0;
            width: 150px;

            p {
              overflow: hidden;
              height: 60px;
              margin: 5px;
            }

            h3 {
              color: #df3033;
              font-size: 20px;
              line-height: 30px;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}
</style>
