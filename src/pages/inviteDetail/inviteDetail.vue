<template>
  <div class="invite-detail-container">
    <nav-bar navTitle='邀请' @clickLeft='goBack'></nav-bar>
    <!-- 二维码展示 -->
    <div class="qr-code">
      <div class="qrcode-img">
        <img :src="qrCodeURL" v-if="notOver" mode='aspectFit' show-menu-by-longpress @longpress="handleLongPress">
        <img :src="qrCodeURL" v-else class="isOver" mode='aspectFit'>
      </div>
      <div class="qrcode-info">
        <span>{{notOver == 0 ? '已过期' : '有效期24小时'}}</span>
        <span class="info" v-if="notOver !== 0">长按图片保存或分享</span>
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
    <div class="qrcode-btn-footer" v-if="notOver">
      <!-- <button class="btn left" open-type='share'>分享二维码</button> -->
      <!-- <button class="btn right" @click="saveQrCode" v-if='saveQrBtn'>保存二维码</button> -->
      <!-- <button class='btn right' open-type="openSetting" @opensetting='handleSetting' v-else>去授权</button> -->
    </div>
  </div>
</template>
<script>
import { cardNumHidden } from '../../utils/index'
import submitBtn from '@/components/submitBtn'
import navBar from '@/components/navBar'
import { showToast, showLoading, hideLoading, getStorageSync, setStorageSync } from '../../api/wechat'
const QR = require('@/utils/weapp-qrcode.js')
export default {
  components: { submitBtn, navBar },
  mounted () {
    showLoading('加载中')
    this.inviteDetail = JSON.parse(this.$route.query.item)
    this.beOver = this.inviteDetail.beOver
    this.qrCode = this.inviteDetail.qrCode
    this.drawImg()
    hideLoading()
    this.cardNum = cardNumHidden(this.inviteDetail.cardNum, 3, 3)
    console.log(this.inviteDetail)
    // 判断是否具有授权
    // this.isAuth()
  },
  data () {
    return {
      inviteDetail: {},
      cardNum: '',
      beOver: '',
      qrCode: '',
      qrCodeURL: '',
      // openSettingBtn: true,
      saveQrBtn: true,
      imgUrl: '../../static/images/qrcode.jpg'
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
  // 微信分享二维码
  onShareAppMessage (res) {
    let that = this
    if (res.from === 'button') {
      console.log('from pages', res.target)
    }
    return {
      // 自定义转发标题
      title: '云上物业',
      // 图片地址
      path: `${wx.env.USER_DATA_PATH}/qrcode.png`,
      // 自定义转发图片
      // imageUrl: `${wx.env.USER_DATA_PATH}/qrcode.png`,
      // imageUrl: that.imgUrl,
      success (res) {
        // 返回目标源
        wx.showShareMenu({
          withShareTicket: true
        })
      },
      fail (err) {
        console.log(err)
      }
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    drawImg () {
      var imgData = QR.drawImg(this.qrCode, {
        typeNumber: 4,
        errorCorrectLevel: 'M',
        size: 800
      })
      this.qrCodeURL = imgData
    },
    //  处理图片
    handleLongPress (e) {
      console.log(e)
    },
    // 分享二维码按钮
    // shareQrCode () {
    //   this.onShareAppMessage()
    // },
    // 保存图片与授权按钮展示
    isAuth () {
      let that = this
      wx.getSetting({
        success (res) {
          if (res.authSetting['scope.writePhotosAlbum']) {
            that.saveQrBtn = true
          } else {
            that.saveQrBtn = false
          }
        }
      })
    },
    // 保存至本机
    saveQrCode () {
      let that = this
      wx.getSetting({
        // 有保存到相册的权限
        success (res) {
          // 用户已经授权
          if (res.authSetting['scope.writePhotosAlbum']) {
            that.saveQrBtn = true
            that.saveImg()
          } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
            // 未进行授权
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              // 同意授权后的回调
              success: () => {
                that.saveImg()
              },
              // 拒绝用户授权后的回调
              fail () {
                that.saveQrBtn = false
              }
            })
            that.saveQrBtn = false
          }
        }
      })
    },
    // 保存二维码
    saveImg () {
      let that = this
      // base 64的图片
      // console.log('saveImg', that.qrCodeURL)
      var fileN = new Date().valueOf()
      // 获取文件管理器对象
      var getFile = wx.getFileSystemManager()
      // 写文件
      getFile.writeFile({
        // 创建临时文件名
        filePath: `${wx.env.USER_DATA_PATH}/qrcode_${fileN}.png`,
        // 去除 data:image/png;base64
        data: that.qrCodeURL.slice(22),
        encoding: 'base64',
        success (res) {
          wx.saveImageToPhotosAlbum({
            filePath: `${wx.env.USER_DATA_PATH}/qrcode_${fileN}.png`,
            success (res) { showToast('保存成功') },
            fail (err) {
              console.log(err)
            }
          })
        },
        fail (err) {
          console.log(err)
        }
      })
    },
    // 授权按钮
    handleSetting (e) {
      let that = this
      console.log(e)
      if (!e.mp.detail.authSetting['scope.writePhotosAlbum']) {
        wx.showModal({
          title: '警告',
          content: '若不打开授权,则无法保存保存二维码至相册中',
          showCancel: false
        })
        that.saveQrBtn = false
      } else {
        wx.showModal({
          title: '提示',
          content: '您已授权, 赶紧将图片保存至相册中吧'
        })
        that.saveQrBtn = true
      }
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
    // height: 38%;
    .qrcode-img {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;
      background: #fff;
      img {
        padding: 20px;
        width: 190px;
        height: 190px;
      }
      .isOver {
        width: 190px;
        height: 190px;
        opacity: 0.3;
      }
    }
    .qrcode-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      .info {
        margin-top: 10px;
        color: #ff6744;
      }
    }
    span {
      margin-top: 13px;
      font-size: 12px;
      color: #666;
    }
  }
  .invited-person-msg {
    // margin-top: ;
    height: 50%;
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
  .qrcode-btn-footer {
    display: flex;
    flex-direction: row;
    width: 100%;
    position: absolute;
    height: 45px;
    bottom: 0;
    .btn {
      border-radius: 0;
      font-size: 16px;
    }
    .btn:active {
      top: 2px;
    }
    .left {
      width: 60%;
      color: #fff;
      background: rgba(102, 125, 250, 1);
    }
    .right {
      width: 40%;
      background: rgba(255, 255, 255, 1);
      color: #667dfa;
      border: 0.5px solid rgba(102, 125, 250, 1);
    }
  }
}
</style>