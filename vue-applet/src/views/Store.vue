<template>
  <div id="store">
    <div class="container">
      <Swipe 
        class="my-swipe"
        :autoplay="3000"
        indicator-color="#1989fa"
      >
        <SwipeItem>
          <img src="https://img01.yzcdn.cn/vant/apple-1.jpg" class="store-swipe"/>
        </SwipeItem>
        <SwipeItem>
          <img src="https://img01.yzcdn.cn/vant/apple-2.jpg" class="store-swipe"/>
        </SwipeItem>
        <SwipeItem>
          <img src="https://img01.yzcdn.cn/vant/apple-3.jpg" class="store-swipe"/>
        </SwipeItem>
      </Swipe>

      <p>商家名称 体验套餐名称</p>

      <Divider />

      <p>商家信息</p>
      <p class="store-info">商家名称：{{ storeInfo.name }}</p>
      <p class="store-info">营业时间：{{ storeInfo.openTime }}</p>
      <p class="store-info">商家电话：{{ storeInfo.mobile }}</p>
      <p class="store-info">商家地址：{{ storeInfo.address }}</p>

      <Divider />

      <p>商品详情</p>
      <!-- 载入一个v-html -->
      <div class="storeDetail">
        <img src="@/assets/order.png" alt="">
        <p>活动时看到啦好多啦活动拉开了的撒哈拉说按时来
        到那里洪都拉斯电话里撒到家啊睡了多久啊
        大家撒了多久啊了多久啊来得及
        大家阿莱克斯到家啊睡了的撒了多久啊了就打了就
        打了几多久啊来得及啦多久啊</p>
        <img src="@/assets/card.png" alt="">
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
  Swipe,
  SwipeItem,
  Divider,
} from 'vant'

export default {
  name: 'Store',
  components: {
    // Button,
    Tabbar,
    TabbarItem,
    Swipe,
    SwipeItem,
    Divider,
  },
  data() {
    return {
      active: '',
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
        'https://img01.yzcdn.cn/vant/apple-3.jpg',
      ],
      storeInfo: {
        name: '小龙坎',
        openTime: '9:00 - 23:00',
        mobile: '13888888888',
        address: '杭州市江干区机场路233号',
      }
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
    background-color: #F5F6F7;
    position: relative;
    padding-bottom: 2rem;
  }

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    /* line-height: 150px; */
    text-align: center;
  }

  .store-swipe {
    width: 100%;
    border-radius: 11px 11px 0 0;
  }

  .store-info {
    text-align: left;
    margin-left: 2rem;
    margin-right: 2rem;
  }

  .storeDetail {
    width: 18rem;
    text-align: justify;
    margin: 0 auto;
  }

  .storeDetail img {
    width: 100%;
    border-radius: 11px;
  }
</style>
