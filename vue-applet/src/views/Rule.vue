<template>
  <div id="rule">
    <div class="container">
      <h3>活动规则</h3>
      <Divider />
      <p>
        <Icon name="like" color="#0191FB" />
        用户福利：体验1个商家换购价值299元礼品；2各商家换购价值399元礼品，3个商家换购价值499元礼品
      </p>
      <Divider dashed />
      <p>
        <Icon name="vip-card" color="#01A3D5" />
        每位用户仅限购买一次特权卡，购买后可选择指定商家进行体验，在活动期限内仅可前往三家门店进行体验，同一商家仅能体验一次；
      </p>
      <Divider dashed />
      <p>
        <Icon name="phone-circle" color="#01B4B0" />
        购买成功后，可先联系商家预约后，前往门店进行体验；
      </p>
      <Divider dashed />
      <p>
        <Icon name="photograph" color="#00C58A" />
        用户在商家消费时，需出示二维码，商家核销后即使用1次服务，除了体验套餐外的其他费用均需用户自行承担；
      </p>
      <Divider dashed />
      <p>
        <Icon name="clock" color="#00D764" />
        购买后，请在活动期限内进行使用，活动结束后，将无法使用，请合理安排自己的时间；
      </p>
      <Divider dashed />
      <p>
        <Icon name="service" color="#ffd200" />
        如需退款，请联系：13888888888
      </p>

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
  Tabbar,
  TabbarItem,
  Divider,
  Icon
} from 'vant'

export default {
  name: 'Rule',
  components: {
    Tabbar,
    TabbarItem,
    Divider,
    Icon
  },
  data() {
    return {
      active: 'rule',
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
    padding: 1rem 0;
    box-shadow: 0px 5px 11px rgba(0, 0, 0, 0.1);
    border-radius: 11px;
    background-color: #3C2E49;
    opacity: 0.9;
    color: #A19BA7;
    position: relative;
    line-height: 2rem;
    text-align: justify;
  }

  .container h3,
  .container p {
    width: 19.25rem;
    margin: 0 auto;
  }

  .container h3 {
    margin-bottom: 1rem;
  }
</style>
