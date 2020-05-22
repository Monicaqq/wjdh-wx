<template>
  <div class="invite-person-container">
    <nav-bar navTitle='邀请'></nav-bar>
    <div class="title-label">
      被邀人信息
    </div>
    <form @submit="invitePerson">
      <!-- 个人信息列表 -->
      <div class="person-lists">
        <div class="person-name borderB1px person-item">
          <span class="color333">姓名</span>
          <input type="text" class="color999" placeholder="请输入姓名" v-model="invitedPersonMsg.name" maxlength="6"
            @input="inputName" @blur='onNameBlur' confirm-type="done" @confirm='onConfirm'>
        </div>
        <div class="person-sex borderB1px person-item">
          <span class="color333">性别</span>
          <div class="tel-right">
            <input type="text" class="color999" placeholder="请选择性别" v-model="invitedPersonMsg.sex" @click="chooseSex"
              disabled>
            <arrow-btn @arrowClick='chooseSex' color='#9B9B9B'></arrow-btn>
          </div>
        </div>
        <div class="person-IDcard borderB1px person-item">
          <span class="color333">身份证号</span>
          <input type="text" class="color999" placeholder="请输入身份证号" v-model="invitedPersonMsg.idCard"
            @input="inputIdCard" maxlength="18" @blur="onIdCardBlur" confirm-type="done" @confirm='onConfirm'>
        </div>
        <div class="person-tel person-item">
          <span class="color333">手机号</span>
          <input type="text" class="color999" placeholder="请输入手机号" v-model="invitedPersonMsg.phone" @input="inputPhone"
            maxlength="11" confirm-type="done" @confirm='onConfirm' @blur="onPhoneBlur">
        </div>
      </div>
      <!-- 新增邀请人按钮 -->
      <div class="submit-btn">
        <submit-btn btnText='确定' isActive></submit-btn>
      </div>
    </form>
  </div>
</template>
<script>
import { showToast } from '../../api/wechat'
import { isName, isIdCard, isPhone, hidden } from '../../utils/index'
import arrowBtn from '@/components/arrowBtn'
import submitBtn from '@/components/submitBtn'
import navBar from '@/components/navBar'
export default {
  components: { arrowBtn, submitBtn, navBar },
  mounted () {
    Object.assign(this.$data, this.$options.data())
  },
  data () {
    return {
      invitedPersonMsg: {
        name: '',
        sex: '',
        idCard: '',
        phone: ''
      }
    }
  },
  methods: {
    // 姓名输入框校验
    inputName () {
    },
    onNameBlur (e) {
      this.invitedPersonMsg.name = e.mp.detail.value.trim()
      const nameResult = isName(this.invitedPersonMsg.name)
      if (nameResult) {
        showToast(nameResult)
      }
    },
    // 身份证号校验
    inputIdCard (e) {

    },
    onIdCardBlur (e) {
      this.invitedPersonMsg.idCard = e.mp.detail.value
      const idCardResult = isIdCard(this.invitedPersonMsg.idCard)
      if (idCardResult) {
        showToast(idCardResult)
      } else {
        this.invitedPersonMsg.idCard = hidden(this.invitedPersonMsg.idCard, 3, 3)
      }

      // console.log(this.idCard)

      // const isCard = isCardId(this.idCard)
      // console.log(isCard)
      // const idCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      // const idReg = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
      // if (this.idCard.length === 0) {
      //   showToast('请输入身份证号')
      //   return false
      // } else if (!idCardReg.test(this.idCard)) {
      //   showToast('请输入正确的身份证号')
      //   this.idCard = ''
      //   return false
      // }
    },
    // 手机号校验
    // 监听 手机 input 输入框
    inputPhone (e) {
      let filtered = e.target.value.replace(/^0|[^\d]/g, '')
      if (this.invitedPersonMsg.phone !== filtered) {
        this.invitedPersonMsg.phone = filtered
      }
    },
    // 失去焦点
    onPhoneBlur (e) {
      this.invitedPersonMsg.phone = e.mp.detail.value
      const phoneResult = isPhone(this.invitedPersonMsg.phone)
      if (phoneResult) {
        showToast(phoneResult)
      }
    },
    // 虚拟键盘 点击 '完成'触发
    onConfirm (e) {
      const { phone } = e.mp.detail
      this.invitedPersonMsg.phone = phone
    },
    // 对输入框关键字赋值
    setValue (v) {
      this.invitedPersonMsg.phone = v
    },
    // 获取输入框的关键字
    getValue () {
      return this.invitedPersonMsg.phone
    },
    // 选择性别
    chooseSex () {
      let that = this
      wx.showActionSheet({
        itemList: ['男', '女'],
        success (res) {
          if (res.tapIndex === 0) {
            that.invitedPersonMsg.sex = '男'
          } else {
            that.invitedPersonMsg.sex = '女'
          }
        }
      })
    },
    // 提交邀请数据
    invitePerson () {
      this.$router.push('../../pages/inviteDetail/main')
      console.log('邀请人员')
    }
  }
}
</script>
<style lang="scss" scoped>
.invite-person-container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  .person-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 44.5px;
    line-height: 44.5px;
    text-align: right;
    input {
      height: 100%;
    }
  }
  .color999 {
    color: #999;
  }
  .color666 {
    color: #666;
  }
  .color333 {
    color: #333;
  }
  .borderB1px {
    border-bottom: 0.5px solid #eee;
  }
  .err {
    color: #cc3333;
  }
  .person-sex {
    .tel-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      input,
      span {
        padding-right: 10px;
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
    .person-photo {
      height: 59.5px;
      justify-content: space-between;
      line-height: 59.5px;
      .photo-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        .arrow-btn {
          margin-left: 12px;
        }
      }
    }
  }
  .submit-btn {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>
