<template>
  <!-- 手机号页面 -->
  <div class="telphone-container">
    <div class="tel-input">
      <span>手机号</span>
      <input type="text" v-model="phone" @input="inputPhone" maxlength="11" confirm-type="done" @confirm='onConfirm'
        @change='onChange' @blur="onBlur">
      <div class="err" v-if="phoneErrFlag"><span>{{phoneErrMsg}}</span></div>
    </div>
    <!-- 提交手机号按钮 -->
    <div class="tel-commit">
      <submit-btn btnText='确定' @submitClick='submitPhone' isActive></submit-btn>
    </div>
  </div>
</template>
<script>
import { setNavigationBarTitle } from '../../api/wechat'
import { isPhone } from '../../utils/index'
import submitBtn from '@/components/submitBtn'
export default {
  components: { submitBtn },
  mounted () {
    setNavigationBarTitle('手机号')
  },
  data () {
    return {
      phone: '18524256541',
      phoneErrMsg: '',
      phoneErrFlag: false
    }
  },
  methods: {
    inputPhone (e) {
      this.phoneErrMsg = ''
      let filtered = e.target.value.replace(/^0|[^\d]/g, '')
      if (this.phone !== filtered) {
        this.phone = filtered
      }
    },
    // 失去焦点
    onBlur (e) {
      this.phone = e.mp.detail.value
      const phoneResult = isPhone(this.phone)
      if (phoneResult) {
        // showToast(phoneResult)
        this.phoneErrMsg = phoneResult
        this.phoneErrFlag = true
      }
    },
    // 虚拟键盘 点击 '完成'触发
    onConfirm (e) {
      const { phone } = e.mp.detail
      this.phone = phone
    },
    // 对输入框关键字赋值
    setValue (v) {
      this.phone = v
    },
    // 获取输入框的关键字
    getValue () {
      return this.phone
    },
    // 提交手机号
    submitPhone () {
      if (!this.phoneErrFlag) {
        console.log('提交手机号')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.telphone-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba(255, 255, 255, 1);
  border-top: 0.5px solid #eeeeee;
  .tel-input {
    display: flex;
    justify-content: space-between;
    position: relative;
    align-items: center;
    margin-left: 15px;
    margin-right: 15px;
    height: 44.5px;
    font-size: 14px;
    color: #333333;
    border-bottom: 0.5px solid #d2d7f0;
    line-height: 44.5px;
    input {
      text-align: right;
    }
    .err {
      position: absolute;
      bottom: -32px;
      right: 0;
      color: #cc3333;
    }
  }
  .tel-commit {
    width: 100%;
    position: absolute;
    bottom: 0px;
  }
}
</style>