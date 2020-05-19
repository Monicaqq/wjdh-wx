<template>
  <div class="household-login-container">
    <!-- 步骤条视图展示 -->
    <div class="steps-container">
      <!-- 步骤条上方图标展示 -->
      <div class="steps-icon-container">
        <!-- 步骤条1 永远是激活状态 -->
        <div class="icon-container marginRight3">
          <div class="icon-active">
            <img :src="choiceIcon">
          </div>
        </div>
        <div class="link-dot"></div>
        <!-- 步骤条2 -->
        <div class="icon-container margin6">
          <!-- icon 激活 -->
          <div class="icon-active" v-if="isStep2 | isStep3">
            <img :src="choiceIcon">
          </div>
          <!-- icon 未激活 -->
          <div class="icon-unactive" v-else></div>
        </div>
        <div class="link-dot"></div>
        <!-- 步骤条3 -->
        <div class="icon-container margin6">
          <div class="icon-active" v-if="isStep3">
            <img :src="choiceIcon">
          </div>
          <div class="icon-unactive" v-else></div>
        </div>
      </div>
      <!-- 步骤条下方文本展示 -->
      <div class="steps-text-container">
        <span>邀请码</span>
        <span>个人信息</span>
        <span>人像照片</span>
      </div>
    </div>

    <!-- 每一步的form表单展示 -->
    <div class="household-login-box">
      <form @submit="inviteCodeFormSubmit" class="login-form">
        <!-- 步骤一 -->
        <div class="step1" v-if="isStep1">
          <div class="margin37">
            <!-- 步骤一输入框 -->
            <div class="step1-input">
              <span>邀请码</span>
              <input type="text" name="inviteCode" placeholder-style="color: #BCC2E1"
                v-model="houseHoldLoginForm.inviteCode" @focus="onInviteFocus" @blur="onInviteBlur"
                placeholder="请输入邀请码">
            </div>
            <!-- 聚焦下划线 -->
            <div :class="isInviteInputFocus ? 'borderBlue' : 'borderWhite'"></div>
          </div>
          <!-- 步骤一按钮 -->
          <div class="step1-btn" style="margin-top: 135px">
            <submit-btn btnText='下一步' isActive @submitClick='toStep2'></submit-btn>
          </div>
          <div class="account-login margin37">
            <span @click="accountLogin">账号密码登录</span>
          </div>
        </div>
        <!-- 步骤二 -->
        <div class="step2" v-if="isStep2">
          <!-- 步骤二表单 -->
          <div class="margin37">
            <div class="step2-input">
              <!-- 姓名输入框 -->
              <div class="houseHoldInput">
                <span>户主姓名</span>
                <input type="text" name="houseHoldName" placeholder-style="color: #BCC2E1"
                  v-model="houseHoldLoginForm.houseHoldName" @focus="onHouseHoldNameFocus" @blur="onHouseHoldNameBlur"
                  placeholder="请输入姓名">
              </div>
              <div :class="isHouseHoldNameFocus ? 'borderBlue' : 'borderWhite'"></div>
              <!-- 手机号输入框 -->
              <div class="houseHoldInput">
                <span>手机号</span>
                <input type="text" name="houseHoldTel" placeholder-style="color: #BCC2E1"
                  v-model="houseHoldLoginForm.houseHoldTel" @focus="onHouseHoldTelFocus" @blur="onHouseHoldTelBlur"
                  placeholder="请输入手机号">
              </div>
              <div :class="isHouseHoldTelFocus ? 'borderBlue' : 'borderWhite'"></div>
              <!-- 身份证号输入框 -->
              <div class="houseHoldInput">
                <span>身份证号</span>
                <input type="text" name="houseHoldIdCard" placeholder-style="color: #BCC2E1"
                  v-model="houseHoldLoginForm.houseHoldIdCard" @focus="onHouseHoldIdCardFocus"
                  @blur="onHouseHoldIdCardBlur" placeholder="请输入身份证号">
              </div>
              <div :class="isHouseHoldIdCardFocus ? 'borderBlue' : 'borderWhite'"></div>
              <!-- 性别选择框 -->
              <div class="houseHoldInput">
                <span>性别</span>
                <input type="text" name="houseHoldSex" placeholder-style="color: #BCC2E1"
                  v-model="houseHoldLoginForm.houseHoldSex" @focus="onHouseHoldSexFocus" @blur="onHouseHoldSexBlur"
                  placeholder="请选择性别">
              </div>
              <div :class="isHouseHoldSexFocus ? 'borderBlue' : 'borderWhite'"></div>
            </div>
          </div>
          <!-- 步骤二按钮 -->
          <div class="step2-btn margin37" style="margin-top: 32px">
            <!-- <submit-btn btnText='下一步2' isActive @submitClick="toStep3"></submit-btn> -->
            <button class="nextStepBtn" @click="toStep3">下一步</button>
          </div>
          <div class="account-login margin37">
            <span @click="accountLogin">账号密码登录</span>
          </div>
        </div>
        <!-- 步骤三 -->
        <div class="step3" v-if="isStep3">
          <!-- 步骤三添加图片 -->
          <div class="person-img">
            <!-- style="background: url('../../static/images/default.png') no-repeat center center; background-size: 100% 100%;" -->
            <div class="bg-img">
              <div class="camera-bg" @click="chooseImage">
                <!-- <input type="file"> -->
                <img :src="cameraImg">
              </div>
            </div>
          </div>
          <!-- 步骤三文字备注 -->
          <div class="info-text margin37">
            <!-- <div> -->
              <!-- <span>*</span> -->
              <span><text style="color: #F7483B">*</text>1、只能是本人照片</span>
            <!-- </div> -->
            <span>2、不可戴眼镜、帽子</span>
            <span>3、正面照</span>
          </div>
          <!-- 提交表单按钮 -->
          <div class="step3-btn">
            <submit-btn btnText='确定' isActive></submit-btn>
          </div>
          <div class="account-login margin37">
            <span @click="accountLogin">账号密码登录</span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { setNavigationBarTitle } from '../../api/wechat'
import submitBtn from '@/components/submitBtn'
export default {
  components: { submitBtn },
  mounted () {
    setNavigationBarTitle('登录')
  },
  data () {
    return {
      isStep1: true,
      isStep2: false,
      isStep3: false,
      isInviteInputFocus: false,
      isHouseHoldNameFocus: false,
      isHouseHoldTelFocus: false,
      isHouseHoldIdCardFocus: false,
      isHouseHoldSexFocus: false,
      houseHoldLoginForm: {
        // 邀请码
        inviteCode: '',
        houseHoldName: '',
        houseHoldTel: '',
        houseHoldIdCard: '',
        houseHoldSex: '',
        houseHoldImg: ''
      },
      cameraImg: '../../static/images/camera.png',
      choiceIcon: '../../static/images/choice.png'
    }
  },
  methods: {
    // 邀请码输入框聚焦
    onInviteFocus () {
      this.isInviteInputFocus = true
    },
    // 邀请码输入框失焦
    onInviteBlur () {
      this.isInviteInputFocus = false
    },
    // 去账号密码登录
    accountLogin () {
      this.$router.replace('../../pages/ownerLogin/main')
      this.houseHoldLoginForm = {}
    },
    // 姓名输入框聚焦
    onHouseHoldNameFocus () {
      this.isHouseHoldNameFocus = true
    },
    // 姓名输入框失焦
    onHouseHoldNameBlur () {
      this.isHouseHoldNameFocus = false
    },
    // 手机号聚焦
    onHouseHoldTelFocus () {
      this.isHouseHoldTelFocus = true
    },
    // 手机号失焦
    onHouseHoldTelBlur () {
      this.isHouseHoldTelFocus = false
    },
    // 身份证号聚焦
    onHouseHoldIdCardFocus () {
      this.isHouseHoldIdCardFocus = true
    },
    // 身份证号失焦
    onHouseHoldIdCardBlur () {
      this.isHouseHoldIdCardFocus = false
    },
    // 性别聚焦
    onHouseHoldSexFocus () {
      this.isHouseHoldSexFocus = true
      let that = this
      wx.showActionSheet({
        itemList: ['男', '女'],
        success (res) {
          if (res.tapIndex === 0) {
            that.houseHoldLoginForm.houseHoldSex = '男'
          } else {
            that.houseHoldLoginForm.houseHoldSex = '女'
          }
        }
      })
    },
    // 性别失焦
    onHouseHoldSexBlur () {
      this.isHouseHoldSexFocus = false
    },
    // 去步骤三
    toStep3 () {
      console.log('step3页面')
      this.isStep2 = false
      this.isStep3 = true
    },
    // 去步骤二
    toStep2 () {
      console.log('step2页面')
      this.isStep1 = false
      this.isStep2 = true
    },
    // 添加人像
    addPersonImg () {
      console.log('添加人像')
    },
    // 邀请码成功
    inviteCodeFormSubmit () {
      console.log('邀请码登录')
    },
    // 上传图片
    chooseImage () {
      let that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.houseHoldLoginForm.houseHoldImg = res.tempFilePaths
          wx.showLoading({
            title: '上传中...'
          })
          // 上传操作
          that.upLoad(that.houseHoldLoginForm.houseHoldImg)
        },
        fail: function () {
          console.log('上传照片失败')
        },
        complete: function () {
          console.log('上传照片成功')
        }
      })
    },
    // 上传图片
    upLoad (imgPath) {
      let that = this
      wx.uploadFile({
        url: '上传接口',
        filePath: that.houseHoldLoginForm.houseHoldImg,
        name: 'file',
        success (res) {
          console.log('上传成功')
          console.log(that.houseHoldLoginForm.houseHoldImg)
        },
        fail (res) {
          console.log(res)
          wx.hideLoading()
          wx.showModal({
            title: '错误提示',
            content: '上传图片失败',
            success (res) {
              console.log(res)
            }
          })
        }
      })
    },
    // 预览图片
    previewImage (e) {
      let that = this
      wx.showActionSheet({
        itemList: ['预览', '删除'],
        success (res) {
          // 选择预览
          if (res.tapIndex === 0) {
            wx.previewImage({
              current: e.currentTarget.id,
              urls: that.files
            })
          } else {
            // 选择删除
            that.that.houseHoldLoginForm.houseHoldImg = ''
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.household-login-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba(255, 255, 255, 1);
  border-top: 0.5px solid #eeeeee;
  .margin37 {
    margin-left: 37px;
    margin-right: 37px;
  }
  .borderBlue {
    height: 1px;
    background: #667dfa;
  }
  .borderWhite {
    height: 1px;
    background: #d2d7f0;
  }
  .steps-container {
    margin-top: 20px;
    margin-left: 60px;
    margin-right: 60px;
  }
  .account-login {
    font-size: 13px;
    color: #667dfa;
  }
  // 步骤条视图区域
  .steps-container {
    display: flex;
    flex-direction: column;
    color: #333;
    font-size: 13px;
    .steps-icon-container {
      display: flex;
      flex-direction: row;
      // justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      .icon-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .icon-active {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img {
            width: 14px;
            height: 14px;
          }
        }
      }
      .icon-active {
        width: 18px;
        height: 18px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(102, 125, 250, 1);
        border-radius: 50%;
      }
      .icon-unactive {
        width: 15px;
        height: 15px;
        background: rgba(210, 215, 240, 1);
        border-radius: 50%;
      }
    }
    .steps-text-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 10px;
    }
    .link-dot {
      // width: 100%;
      width: 80px;
      height: 1px;
      border-bottom: 1px dotted rgba(102, 125, 250, 1);
    }
    .marginRight3 {
      margin-right: 3px;
    }
    .margin6 {
      margin-left: 6px;
      margin-right: 6px;
    }
  }
  // 每一步表单
  .household-login-box {
    margin-top: 80px;
    .login-form {
      // 步骤一
      .step1 {
        display: flex;
        flex-direction: column;
        .step1-input {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 15px;
          font-size: 14px;
          color: #333;
          span {
            margin-right: 10.5px;
          }
          .placeholderStyle {
            color: red;
          }
        }
      }
      .step2 {
        .step2-input {
          .houseHoldInput {
            display: flex;
            flex-direction: row;
            position: relative;
            align-items: center;
            margin-top: 16px;
            margin-bottom: 15px;
            font-size: 14px;
            input {
              position: absolute;
              left: 83px;
            }
          }
        }
        .step2-btn {
          margin-bottom: 20px;
          .nextStepBtn {
            width: 100%;
            height: 45px;
            border-radius: 22.5px;
            font-size: 16px;
            color: rgba(255, 255, 255, 1);
            line-height: 45px;
            background: rgba(102, 125, 250, 1);
          }
        }
      }
      .step3 {
        width: 100%;
        height: 100%;
        .person-img {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 115px;
          height: 135px;
          margin: 0 auto;
          background: rgba(237, 239, 250, 1);
          border-radius: 3px;
          .bg-img {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 97px;
            background: url('~@/assets/images/default.png') no-repeat center
              center;
            background-size: 100% 100%;
            .camera-bg {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 45px;
              height: 45px;
              background: rgba(164, 172, 215, 0.3);
              border-radius: 50%;
              z-index: 99;
              img {
                width: 26px;
                height: 24px;
              }
            }
          }
        }
        .info-text {
          display: flex;
          flex-direction: column;
          margin-top: 32px;
          margin-bottom: 37px;
          color: #333;
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
