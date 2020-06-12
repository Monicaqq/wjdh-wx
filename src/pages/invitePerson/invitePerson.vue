<template>
  <div class="invite-person-container">
    <nav-bar navTitle='邀请' @clickLeft='goBack'></nav-bar>
    <div class="title-label">
      被邀人信息
    </div>
    <form @submit="invitePerson">
      <!-- 个人信息列表 -->
      <div class="person-lists">
        <div class="person-name borderB1px person-item">
          <span class="color333">姓名</span>
          <input type="text" class="color999" placeholder="请输入姓名" v-model="personName" maxlength="6" @input="inputName"
            @blur='onNameBlur' confirm-type="done" @confirm='onConfirm'>
        </div>
        <div class="person-sex borderB1px person-item">
          <span class="color333">性别</span>
          <div class="tel-right">
            <input type="text" class="color999" placeholder="请选择性别" v-model="personSex" @click="chooseSex" disabled>
            <arrow-btn @arrowClick='chooseSex' color='#9B9B9B'></arrow-btn>
          </div>
        </div>
        <div class="person-IDcard borderB1px person-item">
          <span class="color333">身份证号</span>
          <input type="text" class="color999" placeholder="请输入身份证号" v-model="cardNumHidden" @input="inputCardNum"
            maxlength="18" @blur="onCardNumBlur" confirm-type="done" @confirm='onConfirm'>
        </div>
        <div class="person-tel person-item">
          <span class="color333">手机号</span>
          <input type="text" class="color999" placeholder="请输入手机号" v-model="phoneNum" @input="inputPhone" maxlength="11"
            confirm-type="done" @confirm='onConfirm' @blur="onPhoneBlur">
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
import { showToast, getStorageSync } from '../../api/wechat'
import { isName, isIdCard, isPhone, cardNumHidden } from '../../utils/index'
import { toInvite } from '../../api/index'
import arrowBtn from '@/components/arrowBtn'
import submitBtn from '@/components/submitBtn'
import navBar from '@/components/navBar'
export default {
  components: { arrowBtn, submitBtn, navBar },
  mounted () {
    Object.assign(this.$data, this.$options.data())
    const personMess = getStorageSync('personMess')
    if (personMess.rooms.length !== 0) {
      this.roomId = personMess.rooms[0].roomId
    }
  },
  // inject: ['reload'],
  data () {
    return {
      cardNumHidden: '',
      personName: '',
      personSex: '',
      cardNum: '',
      phoneNum: '',
      roomId: '',
      nameFlag: false,
      sexFlag: false,
      cardNumFlag: false,
      phoneNumFlag: false
    }
  },
  methods: {
    // 姓名输入框校验
    inputName () {
    },
    // 姓名失焦
    onNameBlur (e) {
      let that = this
      this.personName = e.mp.detail.value
      const nameResult = isName(this.personName)
      if (nameResult) {
        that.nameFlag = false
        // showToast(nameResult)
      } else {
        that.nameFlag = true
      }
    },
    // 选择性别
    chooseSex () {
      let that = this
      wx.showActionSheet({
        itemList: ['未知', '男', '女'],
        success (res) {
          if (res.tapIndex === 0) {
            that.personSex = '未知'
            that.personSexNum = res.tapIndex
            that.sexFlag = true
          } else if (res.tapIndex === 1) {
            that.personSex = '男'
            that.personSexNum = res.tapIndex
            that.sexFlag = true
          } else if (res.tapIndex === 2) {
            that.personSex = '女'
            that.personSexNum = res.tapIndex
            that.sexFlag = true
          }
        }
      })
    },
    // 身份证号校验
    inputCardNum (e) {

    },
    // 身份证号失焦
    onCardNumBlur (e) {
      let that = this
      this.cardNum = e.mp.detail.value
      this.cardNumHidden = cardNumHidden(this.cardNum)
      const idCardResult = isIdCard(this.cardNum)
      if (idCardResult) {
        that.cardNumFlag = false
      } else {
        that.cardNumFlag = true
      }
    },
    // 监听 手机 input 输入框
    inputPhone (e) {
      let filtered = e.target.value.replace(/^0|[^\d]/g, '')
      if (this.phoneNum !== filtered) {
        this.phoneNum = filtered
      }
    },
    // 手机号失去焦点
    onPhoneBlur (e) {
      let that = this
      this.phoneNum = e.mp.detail.value
      const telResult = isPhone(this.phoneNum)
      if (telResult) {
        that.phoneNumFlag = false
      } else {
        that.phoneNumFlag = true
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
    // 提交邀请数据
    invitePerson () {
      let that = this
      if (!this.nameFlag) {
        showToast('请检查姓名是否正确')
      } else if (!this.sexFlag) {
        showToast('请选择性别')
      } else if (!this.cardNumFlag) {
        showToast('请检查身份证号是否正确')
      } else if (!this.phoneNumFlag) {
        showToast('请检查手机号是否正确')
      } else {
        toInvite({
          'data': {
            'roomId': that.roomId,
            'personName': that.personName,
            'personSex': that.personSexNum,
            'cardNum': that.cardNum,
            'phoneNum': that.phoneNum
          }
        }).then(res => {
          console.log('invitePerson', res)
          this.$router.push('../../pages/home/main')
          // this.reload()
        })
      }
    },
    goBack () {
      this.$router.push('../../pages/home/main')
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
  background: #f5f6fa;
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
