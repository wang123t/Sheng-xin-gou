<template>
  <div class="home">
    <div class="navlist">
      <Nav />
      <Listcontainer />
      <Recommend />
      <Rank />
      <Like />
      <Brand />
    </div>
  </div>
</template>

<script>
import Listcontainer from "../components/Listcontainer.vue";
import Recommend from "../components/Recommend.vue";
import Rank from "../components/Rank.vue";
import Like from "../components/Like.vue";
import Brand from "../components/Brand.vue";
export default {
  name: "Home",
  components: {
    Listcontainer,
    Recommend,
    Rank,
    Like,
    Brand,
  },
  mounted() {
    this.$store.dispatch("getUserInfo");
  }
};
</script>

<style scoped>
</style>
