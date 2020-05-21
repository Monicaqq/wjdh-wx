<template>
  <div class="invite-detail-container">
    <!-- 二维码展示 -->
    <div class="qr-code">
      <img :src="qrCode" mode='aspectFit'>

      <span v-if="!isOvertime">有效期24小时</span>
      <span v-if="isOvertime">已过期</span>
    </div>
    <!-- 被邀人信息 -->
    <div class="invited-person-msg">
      <div class="title-label">
        被邀人信息
      </div>
      <!-- 个人信息列表 -->
      <div class="person-lists">
        <div class="person-name borderB1px person-item">
          <span class="color333">姓名</span>
          <span class="color666">王逸飞</span>
        </div>
        <div class="person-sex borderB1px person-item">
          <span class="color333">性别</span>
          <span class="color666">男</span>
        </div>
        <div class="person-IDcard borderB1px person-item">
          <span class="color333">身份证号</span>
          <span class="color666">{{idCard}}</span>
        </div>
        <div class="person-tel person-item">
          <span class="color333">手机号</span>
          <span class="color666">1983343433</span>
        </div>
      </div>
    </div>
    <!-- 保存二维码按钮 -->
    <div class="qrcode-btn" v-if="isOvertime">
      <submit-btn btnText='保存二维码' isActive @submitClick="saveQrCode"></submit-btn>
    </div>
  </div>
</template>
<script>
import { setNavigationBarTitle } from '../../api/wechat'
// import hidden from '../../utils/index'
import submitBtn from '@/components/submitBtn'
export default {
  components: { submitBtn },
  mounted () {
    setNavigationBarTitle('邀请')
    // this.idCard = hidden(this.idCard, 3, 3)
  },
  data () {
    return {
      qrCode: '../../static/images/qrCode.png',
      idCard: '321023192003330003',
      isOvertime: true
    }
  },
  methods: {
    saveQrCode () {
      console.log('保存二维码至手机相册')
    }
  }
}
</script>
<style lang="scss" scoped>
.invite-detail-container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  .qr-code {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 38%;
    img {
      width: 137px;
      height: 137px;
    }
    span {
      margin-top: 13px;
      font-size: 12px;
      color: #666;
    }
  }
  .invited-person-msg {
    height: 62%;
    .person-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 44.5px;
      line-height: 44.5px;
    }
    .color666 {
      color: #666666;
    }
    .color333 {
      color: #333;
    }
    .borderB1px {
      border-bottom: 0.5px solid #eee;
    }
    .person-tel {
      .tel-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          margin-right: 10px;
        }
      }
    }
    .title-label {
      height: 40px;
      margin-left: 15px;
      font-size: 12px;
      line-height: 40px;
      color: rgba(102, 102, 102, 1);
    }
    .person-lists {
      width: 100%;
      background: rgba(255, 255, 255, 1);
      padding-left: 15px;
      padding-right: 15px;
      box-sizing: border-box;
      font-size: 14px;
    }
  }
  .qrcode-btn {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>