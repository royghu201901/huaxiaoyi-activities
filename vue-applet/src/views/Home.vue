<template>
  <div id="home">
    <!-- 分享按钮 -->
    <div class="share-box">
      <img
        class="share-btn"
        src="@/assets/share-1.png"
        alt="share-btn"
        @click="showShareModal = true"
      >
    </div>

    <!-- 卡片主体 -->
    <div class="container">
      <img class="product-card" src="@/assets/card.png" alt="card-bg">
      <div class="card-detail">
        <h3>品牌商家超级特权卡</h3>
        <router-link to="/rule">
          <Button
            color="#7c6aff"
            size="small"
          >
            活动规则
          </Button>
        </router-link>
        <img v-if="isPaid" id="paid-icon" src="@/assets/paid-icon.png" alt="paid-icon">
      </div>
      <div class="card-desc">
        <h4>精选好店免费体验，更有好礼等着你</h4>
        <p>活动时间：2021-05-15 至 2021-05-30</p>
      </div>
    </div>

    <!-- 支付按钮 -->
    <Button
      v-if="!isPaid"
      class="long-btn"
      color="#7c6aff"
      size="large"
      block
      @click="toPay"
    >
      <span style="margin-right: 3.5rem;">99元超值体验</span>
      <span style="margin-right: 2.5rem;">|</span>
      <span>立即开通</span>
    </Button>

    <!-- 懒加载列表 -->
    <div class="container" style="margin-top: 1rem; text-align: left;">
      <List
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <Card
          v-for="store in displayList"
          :key="store.id" 
          :title="store.title"
          :desc="store.desc"
          :thumb="store.thumb"
          :centered="true"
          @click="toStoreDetail(store.id)"
        >
          <template #tags>
            <Tag 
              v-for="(tag, index) in store.tags"
              :key="index"
              color="#FFBA00"
            >
              {{ tag }}
            </Tag>
          </template>
        </Card>
      </List>
    </div>

    <!-- 分享弹窗 -->
    <Popup
      v-model="showShareModal"
      round
      position="bottom"
      :style="{ height: '10rem' }"
    >
      <p>立即分享给好友</p>
      <div class="bottom-share-wrapper">
        <div
          class="bottom-share-box"
          @click="shareToFriends"
        >
          <img src="@/assets/wechat-logo.png" alt="wechat-logo">
          <p>分享给好友</p>
        </div>
        <div
          class="bottom-share-box"
          @click="shareToMoments"
        >
          <img src="@/assets/wechat-moments.png" alt="wechat-moments">
          <p>生成海报发朋友圈</p>
        </div>
      </div>
    </Popup>

    <!-- 引导点击分享弹窗 -->
    <Popup
      v-model="showFriendsPopup"
      :style="{
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%'
      }"
    >
      <div class="friend-popupbox">
        <img
          class="friend-share-guide"
          src="@/assets/share-guide.png"
          alt="friend-share-guide"
        >
        <p style="margin-top: 15rem;">点击右上角 ...</p>
        <p>分享给您的微信好友</p>
        <img
          class="friend-share-close"
          src="@/assets/share-close.png"
          alt="friend-share-close"
          @click="showFriendsPopup = false"
        >
      </div>
    </Popup>

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
  Button,
  Tabbar,
  TabbarItem,
  Card,
  Tag,
  List,
  Popup
} from 'vant'

export default {
  name: 'Home',
  components: {
    Button,
    Tabbar,
    TabbarItem,
    Card,
    Tag,
    List,
    Popup
  },
  data() {
    return {
      active: 'home',
      isPaid: false,
      storeList: [
        {
          id: 1,
          title: '1 东大方',
          desc: '传统苏杭味',
          thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
          tags: ['传统苏杭味', '范家路', '杭州东站']
        },
        {
          id: 2,
          title: '2 Homie Canteen',
          desc: '江干区咖啡好评第一名',
          thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
          tags: ['咖啡厅', '城东', '机场路']
        },
        {
          id: 3,
          title: '3 小爷沸腾鱼',
          desc: '天虹购物中心店',
          thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
          tags: ['酸菜鱼/水煮鱼', '川菜', '新店入驻']
        },
        {
          id: 4,
          title: '4 东大方',
          desc: '传统苏杭味',
          thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
          tags: ['传统苏杭味', '范家路', '杭州东站']
        },
        {
          id: 5,
          title: '5 Homie Canteen',
          desc: '江干区咖啡好评第一名',
          thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
          tags: ['咖啡厅', '城东', '机场路']
        },
        {
          id: 6,
          title: '6 小爷沸腾鱼',
          desc: '天虹购物中心店',
          thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
          tags: ['酸菜鱼/水煮鱼', '川菜', '新店入驻']
        },
        {
          id: 7,
          title: '7 东大方',
          desc: '传统苏杭味',
          thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
          tags: ['传统苏杭味', '范家路', '杭州东站']
        },
        {
          id: 8,
          title: '8 Homie Canteen',
          desc: '江干区咖啡好评第一名',
          thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
          tags: ['咖啡厅', '城东', '机场路']
        },
        {
          id: 9,
          title: '9 小爷沸腾鱼',
          desc: '天虹购物中心店',
          thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
          tags: ['酸菜鱼/水煮鱼', '川菜', '新店入驻']
        },
        {
          id: 10,
          title: '10 东大方',
          desc: '传统苏杭味',
          thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
          tags: ['传统苏杭味', '范家路', '杭州东站']
        },
        {
          id: 11,
          title: '11 Homie Canteen',
          desc: '江干区咖啡好评第一名',
          thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
          tags: ['咖啡厅', '城东', '机场路']
        },
        {
          id: 12,
          title: '12 小爷沸腾鱼',
          desc: '天虹购物中心店',
          thumb: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
          tags: ['酸菜鱼/水煮鱼', '川菜', '新店入驻']
        },
      ],
      loading: false,
      finished: false,
      displayList: [],
      tempCount: 3,
      showShareModal: false,
      shareOptions: [
        { name: '微信', icon: 'wechat' },
        { name: '朋友圈', icon: 'wechat-moments' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
      ],
      showFriendsPopup: false,
      showMomentsPopup: false,
    }
  },
  mounted() {
    this.listInit()
  },
  methods: {
    listInit() {
      for (let i = 0; i < this.tempCount; i++) {
        this.displayList.push(this.storeList[i])
      }
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = this.tempCount; i < this.tempCount + 3; i++) {
          this.displayList.push(this.storeList[i])
        }
        this.tempCount += 3
        // console.log(this.tempCount)

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.displayList.length >= this.storeList.length) {
          this.finished = true
        }
      }, 2000)
    },
    toStoreDetail(id) {
      console.log(id)
      // 根据id到商家详情页
      this.$router.push({ path: '/store', query: { id }}) // 用path的话，url带参数，如name则没有
    },
    toPay() {
      this.$router.push('/pay')
    },
    onShareSelect(option) {
      console.log(option.name)
      this.showShareModal = false
    },
    shareToFriends() {
      // 引导用户点击右上角分享
      this.showShareModal = false
      this.showFriendsPopup = true
    },
    shareToMoments() {
      // 生成海报
    }
  },
}
</script>

<style scoped>
  .van-button /deep/ {
    border-radius: 5px;
  }

  .van-tabbar /deep/ {
    background-color: #F5F6F7;
    border-top: 1px solid #ebedf0;
  }

  .van-tabbar-item--active /deep/ {
    color: #7c6aff;
    background-color: #F5F6F7;
  }

  .van-card /deep/ {
    border-radius: 11px;
  }

  .van-tag /deep/ {
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .van-share-sheet__option /deep/ {
    width: 45%;
  }

  .clearfix::after {
    content: '';
    display: block;
    clear: both;
  }

  .container {
    width: 21.25rem;
    margin: 0 auto;
    box-shadow: 0px 5px 11px rgba(0, 0, 0, 0.1);
    border-radius: 11px;
    background-color: #F5F6F7;
    position: relative;
  }

  .share-box {
    text-align: right;
  }

  .share-btn {
    width: 2rem;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
  }

  .product-card {
    width: 100%;
    margin-bottom: 4rem;
  }

  .card-detail {
    width: 20rem;
    position: absolute;
    background-color: #F5F6F7;
    top: 11rem;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 99;
    border-radius: 5px;
    box-shadow: 0px 5px 11px rgba(0, 0, 0, 0.1);
    padding-bottom: 1rem;
  }

  .card-detail h3 {
    line-height: 1rem;
  }

  .card-desc h4 {
    line-height: 0.5rem;
  }

  .card-desc p {
    line-height: 0.5rem;
    padding-bottom: 1rem;
  }

  .long-btn {
    width: 21.25rem;
    margin: 0 auto;
    /* position: fixed;
    left: 50%;
    bottom: 1rem;
    transform: translate(-50%, 0); */
  }

  #paid-icon {
    width: 4rem;
    position: absolute;
    top: 0;
    right: 0;
  }
  
  .bottom-share-wrapper {
    display: flex;
    font-family: Poppins;
  }

  .bottom-share-box {
    width: 50%;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 600;
  }

  .bottom-share-box img {
    width: 3rem;
  }

  .friend-popupbox {
    color: #fff;
  }

  .friend-popupbox p {
    font-size: 1.5rem;
    line-height: 1rem;
    font-weight: 500;
  }

  .friend-share-guide {
    width: 15rem;
    position: absolute;
    top: 0;
    right: 0;
  }

  .friend-share-close {
    width: 10rem;
  }
</style>