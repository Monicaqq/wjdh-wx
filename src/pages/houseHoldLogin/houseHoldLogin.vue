<template>
  <div class="household-login-container">
    <div class="steps-container">

    </div>
    <div class="household-form">
      <form>
        <!-- 步骤一 -->
        <div class="step-one">
          <!-- 步骤一输入框 -->
          <div class="stepOne-input">
            <span>邀请码</span>
            <input type="text" name="inviteCode" v-model="inviteCode" @focus="onInviteFocus" @blur="onInviteBlur"
              placeholder="请输入邀请码">
          </div>
          <!-- 步骤一按钮 -->
          <div class="stepOne-btn">
            <submit-btn btnText='下一步' isActive></submit-btn>
          </div>
        </div>
        <!-- 步骤二 -->
        <div class="step-two">
          <!-- 步骤二按钮 -->
           <div class="stepOne-btn">
            <submit-btn btnText='下一步' isActive></submit-btn>
          </div>
        </div>
        <!-- 步骤三 -->
        <div class="step-three">
          <!-- 步骤三按钮 -->
           <div class="stepOne-btn">
            <submit-btn btnText='确定' isActive></submit-btn>
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
      isStepOne: true,
      isStepTwo: false,
      isStepThree: false,
      inviteCode: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.household-login-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba(255, 255, 255, 1);
  border-top: 0.5px solid #eeeeee;
  .steps-container {
    margin-top: 20px;
    margin-left: 62px;
    margin-right: 55px;
  }
}
</style>
