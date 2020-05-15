<template>
  <div class="owner-login-container">
    <div class="login-title">
      欢迎登陆
    </div>
    <form @submit='formSubmit' class="form-submit">
      <div class="login-input">
        <div class="account-input">
          <span>账号/手机号</span>
          <input type="text" v-model="loginForm.account" @focus="onAccountFocus" @blur="onAccountBlur" name="account"
            placeholder="请输入">
        </div>
        <div :class="isAccountFocus ? 'borderBlue' : 'borderWhite'">
        </div>
        <div class="password-input">
          <span>密码/身份证后4位</span>
          <input type="text" password v-model="loginForm.password" @focus="onPasswdFocus" @blur="onPasswdBlur"
            name="password" placeholder="请输入">
        </div>
        <div :class="isPasswdFocus ? 'borderBlue' : 'borderWhite'">
        </div>
      </div>
      <div class="login-btn">
        <submit-btn isShadow btnText='登录'></submit-btn>
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
      font-size: 14px;
      color: #333;
      .account-input,
      .password-input {
        display: flex;
        flex-direction: row;
        margin-bottom: 19px;
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
