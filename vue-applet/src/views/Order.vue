<template>
  <div id="order">
    <div class="container">
      <img class="order-bg" src="@/assets/order.png" alt="">
      <div class="order-content">
        <p class="activity-range">2021-05-15 至 2021-05-30</p>
        <p class="activity-title">花小易</p>
        <p class="activity-subtitle">品牌商家超级特权卡</p>
        <p class="order-time">
          <img src="@/assets/calendar.png" alt="">
          <span>下单日期：</span>
          <span>{{ orderTime }}</span>
        </p>
      </div>

      <Divider />

      <div class="QR-code">
        <p>您还有 <span style="color: #885EFF;">{{ remainTimes }}</span> 次体验机会</p>
        <img src="@/assets/QR-Code.png" alt="">
        <p>请将此二维码出示给商家进行核销</p>
      </div>
    </div>

    <!-- 底部导航栏 -->
    <Tabbar v-model="active">
      <TabbarItem replace to="/" name="home" icon="coupon-o">首页</TabbarItem>
      <TabbarItem replace to="/rule" name="rule" icon="question-o">活动规则</TabbarItem>
      <TabbarItem replace to="/order" name="order" icon="friends-o">我的订单</TabbarItem>
    </Tabbar>
  </div>

</template>

<script>
// @ is an alias to /src
import {
  // Button,
  Tabbar,
  TabbarItem,
  Divider
} from 'vant'

export default {
  name: 'Order',
  components: {
    // Button,
    Tabbar,
    TabbarItem,
    Divider
  },
  data() {
    return {
      active: 'order',
      orderTime: '2021-05-21 13:12:12',
      remainTimes: 3
    }
  },
}
</script>

<style scoped>
  .van-tabbar /deep/ {
    background-color: #F5F6F7;
    border-top: 1px solid #ebedf0;
  }

  .van-tabbar-item--active /deep/ {
    color: #7c6aff;
    background-color: #F5F6F7;
  }

  .container {
    width: 21.25rem;
    margin: 0 auto;
    box-shadow: 0px 5px 11px rgba(0, 0, 0, 0.1);
    border-radius: 11px;
    background-color: #3C2E49;
    opacity: 0.9;
    color: #A19BA7;
    position: relative;
    line-height: 2rem;
    text-align: justify;
    padding-top: 10rem;
  }

  .container .order-bg {
    position: absolute;
    z-index: -1;
    top: 0;
    width: 21.25rem;
    border-radius: 11px 11px 0 0;
  }

  .container .order-content {
    width: 19.25rem;
    background-color: #3C2E49;
    z-index: 999;
    padding: 1rem;
    color: #fff;
    border-radius: 0 0 11px 11px;
  }

  .activity-range {
    font-size: 0.75rem;
    font-family: Poppins;
    font-weight: 600;
    line-height: 0.875rem;
    color: #00D764;
  }

  .activity-title {
    font-size: 1.5rem;
    font-family: Poppins;
    font-weight: 600;
    line-height: 1.5rem;
  }

  .activity-subtitle {
    font-size: 0.75rem;
    font-family: Poppins;
    font-weight: 500;
    line-height: 0.875rem;
    color: #A19BA7;
  }

  .order-time {
    font-size: 0.75rem;
    font-family: Poppins;
    font-weight: 500;
    line-height: 0.875rem;
  }

  .order-time img {
    display: inline-block;
    width: 1rem;
    vertical-align: bottom;
    margin-right: 1rem;
  }

  .container .QR-code {
    text-align: center;
    font-size: 1rem;
    font-family: Poppins;
    font-weight: 600;
    line-height: 1.1875rem;
    color: #fff;
    padding-top: 1rem;
    padding-bottom: 2rem;
  }
</style>