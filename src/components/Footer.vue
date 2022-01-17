<template>
  <div class="footer">
    <div class="footerlist">
      <ul>
        <h4>购物指南</h4>
        <li>购物流程</li>
        <li>会员介绍</li>
        <li>生活团购</li>
        <li>常见问题</li>
      </ul>
      <ul>
        <h4>配送方式</h4>
        <li>上门自取</li>
        <li>限时配送</li>
        <li>配送服务</li>
        <li>运费标准</li>
      </ul>
      <ul>
        <h4>支付方式</h4>
        <li>货到付款</li>
        <li>在线支付</li>
        <li>分期付款</li>
        <li>其他方式</li>
      </ul>
      <ul>
        <h4>售后服务</h4>
        <li>服务政策</li>
        <li>价格保护</li>
        <li>退款说明</li>
        <li>取消订单</li>
      </ul>
    </div>
    <ul class="footerabout">
      <li><a href="#">关于我们</a><span>|</span></li>
      <li><a href="#">维护隐私</a><span>|</span></li>
      <li><a href="#">关于我们</a><span>|</span></li>
      <li><a href="#">维护隐私</a></li>
    </ul>
    <div class="about">
      <p>
        Copyright © 2020-2021 Goshopping.com，All Rights Reserved
        使用本网站即表示接受 省心购用户协议。版权所有 武汉省心购电子商务有限公司
      </p>
      <p>
        鄂公网安备 111122221111号 鄂ICP备123456789号
        增值业务经营许可证:鄂111222333
        网络文化经营许可证:鄂网文20211209-2020号
      </p>
      <p>违法和不良信息举报电话:123456789；举报邮箱:1507101635@vipshop.com</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
};
</script>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  padding-top: 50px;
}
p {
  text-align: center;
  padding: 5px;
}
.footer .footerlist ul{
  float: left;
  margin: 0 100px;
}
.footer .footerabout {
  display: flex;
  margin: 50px 0;
}
h4{
  margin: 10px 0;
}
a {
  padding: 0 10px;
}
.about {
  padding: 20px;
}
</style>