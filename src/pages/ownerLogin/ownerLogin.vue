<template>
  <div class="owner-login-container">
    <div class="login-title">
      欢迎登陆
    </div>
    <form @submit='formSubmit' class="form-submit">
      <div class="login-input">
        <div class="account-input">
          <span>账号/手机号</span>
          <input type="text"  placeholder-style="color: #BCC2E1" v-model="loginForm.account" @focus="onAccountFocus" @blur="onAccountBlur" name="account"
            placeholder="请输入">
        </div>
        <!-- 输入框聚焦失焦下划线样式 -->
        <div :class="isAccountFocus ? 'borderBlue' : 'borderWhite'">
        </div>
        <div class="password-input">
          <span>密码/身份证后4位</span>
          <input type="text" password  placeholder-style="color: #BCC2E1" v-model="loginForm.password" @focus="onPasswdFocus" @blur="onPasswdBlur"
            name="password" placeholder="请输入">
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
import { setNavigationBarTitle } from '../../api/wechat'
import submitBtn from '@/components/submitBtn'
export default {
  components: { submitBtn },
  mounted () {
    setNavigationBarTitle('登录')
  },
  data () {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      isAccountFocus: false,
      isPasswdFocus: false
    }
  },
  computed: {
    ActiveLoginBtn () {
      if (this.loginForm.account && this.loginForm.password) {
        return true
      }
    }
  },
  methods: {
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
    // 账号密码登录
    formSubmit () {
      console.log('用户名密码登录')
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
    font-size: 21px;
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
        font-size: 14px;
        span {
          margin-right: 11px;
          white-space: nowrap;
        }
      }
      .password-input {
        margin-top: 31px;
      }
      .borderBlue {
        height: 1px;
        background: #667dfa;
      }
      .borderWhite {
        height: 1px;
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
