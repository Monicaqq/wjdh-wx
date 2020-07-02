<template>
  <div class="owner-login-container">
    <div class="nav-bar">
      <van-nav-bar title-class='nav-title' title="微信授权"></van-nav-bar>
    </div>
    <div class="login-title">
      欢迎授权登录
    </div>
    <form @submit='formSubmit' class="form-submit">
      <div class="login-input">
        <div class="account-input">
          <span>账号/手机号</span>
          <input type="tel" placeholder-style="color: #BCC2E1" v-model="username" @focus="onAccountFocus"
            @blur="onAccountBlur" name="account" placeholder="请输入">
        </div>
        <!-- 输入框聚焦失焦下划线样式 -->
        <div :class="isAccountFocus ? 'borderBlue' : 'borderWhite'">
        </div>
        <div class="password-input">
          <span>密码/身份证后4位</span>
          <input type="password" password placeholder-style="color: #BCC2E1" v-model="password" @focus="onPasswdFocus"
            @blur="onPasswdBlur" name="password" placeholder="请输入">
        </div>
        <!-- 输入框聚焦失焦下划线样式 -->
        <div :class="isPasswdFocus ? 'borderBlue' : 'borderWhite'">
        </div>
      </div>
      <!-- 判断登录按钮功能是否启动 -->
      <div>
        <div class="login-btn" v-if='ActiveLoginBtn'>
          <!-- <button formType='submit'>登录</button> -->
          <submit-btn btnText='登录' isActive></submit-btn>
        </div>
        <div class="login-btn" v-else>
          <submit-btn btnText='登录' isShadow></submit-btn>
        </div>
      </div>
    </form>
    <div class="invite-login">
      <span @click="invitedLogin">邀请码登录</span>
    </div>
  </div>
</template>
<script>
import submitBtn from '@/components/submitBtn'
import { getCode, getStorageSync } from '../../api/wechat'
import { bindWechat } from '../../api/index'
export default {
  components: { submitBtn },
  onShow () {
    // mpvue.clearStorage()
    Object.assign(this.$data, this.$options.data())
    this.baseUrl = getStorageSync('base_url')
    mpvue.removeStorageSync('personMess')
    mpvue.removeStorageSync('room')
    mpvue.removeStorageSync('token')
    mpvue.removeStorageSync('appId')
    this.getCode()
  },
  data () {
    return {
      baseUrl: null,
      isAccountFocus: false,
      isPasswdFocus: false,
      username: '',
      password: '',
      code: ''
    }
  },
  computed: {
    ActiveLoginBtn () {
      if (this.username && this.password) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // 获取code
    getCode () {
      let that = this
      getCode(
        (code) => {
          that.code = code
        })
    },
    // 账号密码登录
    formSubmit () {
      let that = this
      bindWechat(that.baseUrl, {
        'data': {
          'username': that.username,
          'password': that.password,
          'code': that.code
        }
      }).then(res => {
        console.log(res)
        // 第一次获取绑定, 拿到jwt
        if (res.data.code === 200) {
          this.$router.push('../../pages/home/main')
        }
      })
    },
    // 输入框聚焦和失焦
    onAccountFocus () {
      this.isAccountFocus = true
    },
    onAccountBlur () {
      this.isAccountFocus = false
    },
    onPasswdFocus () {
      this.isPasswdFocus = true
    },
    onPasswdBlur () {
      this.isPasswdFocus = false
    },
    // 邀请码登录
    invitedLogin () {
      this.$router.replace('../../pages/houseHoldLogin/main')
    }
  }
}
</script>
<style lang="scss" scoped>
.owner-login-container {
  max-width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba(255, 255, 255, 1);
  border-top: 0.5px solid #eee;
  .login-title {
    margin-top: 44px;
    margin-bottom: 43px;
    margin-left: 37px;
    font-size: 24px;
    font-weight: 500;
  }
  .form-submit {
    .login-input {
      margin-left: 37px;
      margin-right: 37px;
      height: 100px;
      font-size: 14px;
      color: #333;
      .account-input,
      .password-input {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-bottom: 19px;
        font-size: 18px;
        span {
          margin-right: 11px;
          white-space: nowrap;
        }
      }
      .password-input {
        margin-top: 31px;
      }
      .borderBlue {
        height: 1.2px;
        background: #667dfa;
      }
      .borderWhite {
        height: 1.2px;
        background: #d2d7f0;
      }
    }

    .login-btn {
      margin-top: 98px;
    }
  }
  .invite-login {
    margin-left: 37px;
    color: #667dfa;
    font-size: 13px;
  }
}
</style>
