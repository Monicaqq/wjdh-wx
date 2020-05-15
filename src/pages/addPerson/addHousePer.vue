<template>
  <!-- 个人信息组件 -->
  <div class="person-msg-container">
    <div class="person-msg">
      <div class="title-label">
        个人信息
      </div>
      <!-- 个人信息列表 -->
      <div class="person-lists">
        <div class="person-photo borderB1px person-item">
          <span class="color333">照片</span>
          <div class="photo-right">
            <avator-img round :src='perPhoto'></avator-img>
            <div class="arrow-btn">
              <arrow-btn @arrowClick='addAvator' color='#9B9B9B'></arrow-btn>
            </div>
          </div>
        </div>
        <div class="person-name borderB1px person-item">
          <span class="color333">姓名</span>
          <input type="text" class="color999" placeholder="请输入姓名" v-model="name" maxlength="6" @input="inputName"
            @blur='onNameBlur' confirm-type="done" @confirm='onConfirm'>
        </div>
        <div class="person-sex borderB1px person-item">
          <span class="color333">性别</span>
          <div class="tel-right">
            <input type="text" class="color999" placeholder="请选择性别">
            <arrow-btn @arrowClick='chooseSex' color='#9B9B9B'></arrow-btn>
          </div>
        </div>
        <div class="person-IDcard borderB1px person-item">
          <span class="color333">身份证号</span>
          <input type="text" class="color999" placeholder="请输入身份证号" v-model="idCard" @input="inputIdCard" maxlength="18"
            @blur="onIdCardBlur" confirm-type="done" @confirm='onConfirm'>
        </div>
        <div class="person-tel person-item">
          <span class="color333">手机号</span>
          <input type="text" class="color999" placeholder="请输入手机号" v-model="phone" @input="inputPhone" maxlength="11"
            confirm-type="done" @confirm='onConfirm' @blur="onPhoneBlur">
          <!-- <div class="err" v-if="phoneErrFlag"><span>{{phoneErrMsg}}</span></div> -->
        </div>
      </div>
    </div>
    <!-- 住户信息 -->
    <div class="housePer-msg">
      <div class="title-label">
        住户信息
      </div>
      <!-- 住户信息列表 -->
      <div class="housePer-lists">
        <!-- 人员类型 -->
        <div class="person-sex borderB1px person-item">
          <span class="color333">人员类型</span>
          <div class="tel-right">
            <input type="text" class="color999" placeholder="请选择人员类型">
            <arrow-btn @arrowClick='choosePersonType' color='#9B9B9B'></arrow-btn>
          </div>
        </div>
        <!-- 车辆 -->
        <div class="person-sex person-item">
          <span class="color333">车辆</span>
          <div class="tel-right">
            <span class="color666">0</span>
            <div class="arrow-btn">
              <arrow-btn @arrowClick='toCarView' color='#9B9B9B'></arrow-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增住户按钮 -->
    <div class="submit-btn">
      <submit-btn btnText='确定' @submit='addHouserPerson' active></submit-btn>
    </div>
  </div>
</template>
<script>
import { setNavigationBarTitle, showToast } from '../../api/wechat'
import avatorImg from '@/components/avatorImg'
import arrowBtn from '@/components/arrowBtn'
import submitBtn from '@/components/submitBtn'
export default {
  components: { avatorImg, arrowBtn, submitBtn },
  props: {
    personMsg: {},
    isPerson: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      perPhoto: '../../static/images/timg.jpg',
      name: '',
      idCard: '',
      phone: ''
    }
  },
  mounted () {
    setNavigationBarTitle('添加住户')
  },
  methods: {
    // 姓名输入框校验
    inputName () {

    },
    onNameBlur (e) {
      this.name = e.mp.detail.value.trim()
      var nameReg = /^[\u4E00-\u9FA5]{2,4}$/
      if (this.name.length === 0) {
        showToast('请输入姓名')
      } else if (!nameReg.test(this.name)) {
        this.name = ''
        showToast('姓名仅支持2-4个中文字符')
      }
    },
    // 身份证号校验
    inputIdCard (e) {

    },
    onIdCardBlur (e) {
      this.idCard = e.mp.detail.value
      // const isCard = isCardId(this.idCard)
      // console.log(isCard)
      const idCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      // const idReg = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
      if (this.idCard.length === 0) {
        showToast('请输入身份证号')
        return false
      } else if (!idCardReg.test(this.idCard)) {
        showToast('请输入正确的身份证号')
        this.idCard = ''
        return false
      }
    },
    // 手机号校验
    // 监听 手机 input 输入框
    inputPhone (e) {
      let filtered = e.target.value.replace(/^0|[^\d]/g, '')
      if (this.phone !== filtered) {
        this.phone = filtered
      }
    },
    // 失去焦点
    onPhoneBlur (e) {
      this.phone = e.mp.detail.value
      let telReg = /^1[3-9][0-9]{9}$/
      if (this.phone.length === 0) {
        showToast('请输入手机号')
        return false
      } else if (!telReg.test(this.phone)) {
        showToast('请输入正确的手机号')
        this.phone = ''
        return false
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
    // 选择性别
    chooseSex () {
      console.log('选择性别')
    },
    // 选择人员类型
    choosePersonType () {
      console.log('选择人员类型')
    },
    // 去车辆界面
    toCarView () {
      this.$router.push('../../pages/cars/main')
    },
    addHouserPerson () {
      console.log('添加住户')
    }
  }
}
</script>
<style lang="scss" scoped>
.person-msg-container {
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
    // position: relative;
    align-items: center;
    height: 44.5px;
    line-height: 44.5px;
    text-align: right;
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
    // position: absolute;
    // bottom: -32px;
    // right: 0;
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
    height: 240px;
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
  .housePer-lists {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
  .submit-btn {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>