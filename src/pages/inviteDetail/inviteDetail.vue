<template>
  <div class="invite-detail-container">
    <nav-bar navTitle='邀请' @clickLeft='goBack'></nav-bar>
    <!-- 二维码展示 -->
    <div class="qr-code">
      <div class="qrcode-img">
        <img :src="qrCodeURL" v-if="notOver" mode='aspectFit'>
        <img :src="qrCodeURL" v-else class="isOver" mode='aspectFit'>
      </div>
      <div>
        <span v-if="notOver">有效期24小时</span>
        <span v-else>已过期</span>
      </div>

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
          <span class="color666">{{inviteDetail.personName}}</span>
        </div>
        <div class="person-sex borderB1px person-item">
          <span class="color333">性别</span>
          <span class="color666">{{inviteDetail.personSex}}</span>
        </div>
        <div class="person-IDcard borderB1px person-item">
          <span class="color333">身份证号</span>
          <span class="color666">{{cardNum}}</span>
        </div>
        <div class="person-tel person-item">
          <span class="color333">手机号</span>
          <span class="color666">{{inviteDetail.phoneNum}}</span>
        </div>
      </div>
    </div>
    <!-- 保存二维码按钮 -->
    <div class="qrcode-btn" v-if="notOver">
      <submit-btn btnText='保存二维码' isActive @submitClick="saveQrCode"></submit-btn>
    </div>
  </div>
</template>
<script>
import { cardNumHidden } from '../../utils/index'
import submitBtn from '@/components/submitBtn'
import navBar from '@/components/navBar'
const QR = require('@/utils/weapp-qrcode.js')
export default {
  components: { submitBtn, navBar },
  mounted () {
    this.inviteDetail = JSON.parse(this.$route.query.item)
    this.beOver = this.inviteDetail.beOver
    console.log(typeof parseInt(this.beOver))
    this.qrCode = this.inviteDetail.qrCode
    this.drawImg()
    this.cardNum = cardNumHidden(this.inviteDetail.cardNum, 3, 3)
    console.log(this.inviteDetail)
  },
  data () {
    return {
      inviteDetail: {},
      cardNum: '',
      beOver: '',
      qrCode: '',
      qrCodeURL: ''
    }
  },
  computed: {
    notOver () {
      this.beOver = parseInt(this.beOver)
      if (this.beOver === 1) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goBack () {
      // this.$router.push('../../pages/home/main')
      this.$router.go(-1)
    },
    drawImg () {
      var imgData = QR.drawImg(this.qrCode, {
        typeNumber: 4,
        errorCorrectLevel: 'M',
        size: 500
      })
      this.qrCodeURL = imgData
    },
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
  background: #f5f6fa;
  .qr-code {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 38%;
    .qrcode-img {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 137px;
      height: 137px;
      background: #fff;
      img {
        width: 110px;
        height: 110px;
      }
      .isOver {
        width: 110px;
        height: 110px;
        opacity: 0.3;
      }
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