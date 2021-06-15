<template>
  <div id="pay">
    <div class="container">
      <p class="pay-title">填写使用者信息</p>
      <Divider />
      <Form
        v-model="form"
        label-align="left"
        colon
      >
        <Field
          v-model="form.name"
          name="name"
          label="姓名"
          placeholder="请填写真实姓名"
          :rules="[{ required: true }]"
          clearable
        />
        <Field
          readonly
          clickable
          name="area"
          :value="form.area"
          label="地区选择"
          placeholder="点击选择省市区"
          :rules="[{ required: true }]"
          @click="showArea = true"
        />
        <Field
          v-model="form.address"
          name="address"
          label="详细地址"
          placeholder="请填写详细的地址"
          error-message="该地址用于体验后的礼品邮寄，请准确填写"
          clearable
        />
        <Field
          v-model="form.mobile"
          name="mobile"
          type="tel"
          label="手机号码"
          placeholder="请填写您的手机号"
          :rules="[{ required: true }]"
          clearable
        />
        <Field
          v-model="form.sms"
          name="sms"
          label="短信验证码"
          placeholder="请输入短信验证码"
          :rules="[{ required: true }]"
          clearable
        >
          <template #button>
            <Button
              size="small"
              type="primary"
              @click="sendSms"
            >
              发送验证码
            </Button>
          </template>
        </Field>
        <Popup v-model="showArea" position="bottom">
          <Area
            :area-list="areaList"
            @confirm="confirmArea"
            @cancel="showArea = false"
          />
        </Popup>
      </Form>
      <Divider />
    </div>

    <div class="back-btn" @click="toHomeDialog">
      <img class="back-img" src="@/assets/back-btn.png" alt="back-btn">
      <p class="back-text">首页</p>
    </div>

    <SubmitBar :price="9900" button-text="立即支付" @submit="confirmPay" />
  </div>
</template>

<script>
import {
  SubmitBar,
  Form,
  Field,
  Popup,
  Area,
  Button,
  Divider,
  Dialog
} from 'vant'
import { areaList } from '@vant/area-data'

export default {
  name: 'Pay',
  components: {
    SubmitBar,
    Form,
    Field,
    Popup,
    Area,
    Button,
    Divider
  },
  data() {
    return {
      form: {
        name: '',
        area: '',
        address: '',
        mobile: '',
        sms: ''
      },
      showArea: false,
      areaList: areaList, // 可能需要公司后端单独提供，因为要post给后端统一的格式
    }
  },
  methods: {
    confirmArea(val) {
      this.form.area = val[0].name + val[1].name + val[2].name
      this.showArea = false
    },
    sendSms() {

    },
    confirmPay() {

    },
    toHomeDialog() {
      Dialog.confirm({
        title: '返回首页',
        message: '离开此页面会重置表单',
        confirmButtonText: '确认返回',
        cancelButtonText: '再等等'
      }).then(() => {
        // on confirm
        this.$router.push('/')
      }).catch(() => {
        // on cancel
      })
    }
  },
}
</script>

<style scoped>
  .van-submit-bar /deep/ {
    background-color: #F5F6F7;
    border-top: 1px solid #ebedf0;
  }

  .container {
    width: 21.25rem;
    height: 40rem;
    margin: 0 auto;
    padding: 1rem 5px;
    box-shadow: 0px 5px 11px rgba(0, 0, 0, 0.1);
    border-radius: 11px;
    background-color: #fff;
    position: relative;
  }

  .pay-title {
    text-align: left;
    margin-left: 1rem;
  }

  .back-btn {
    background: linear-gradient(to right,#ff6034,#ee0a24);
    color: #fff;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    position: fixed;
    right: 3rem;
    bottom: 10rem;
  }

  .back-img {
    width: 1.75rem;
    margin-top: 0.4rem;
  }

  .back-text {
    font-size: 0.75rem;
    font-weight: 500;
    margin: 0 auto;
    padding-bottom: 0.5rem;
  }
</style>