<template>
  <div class="household-login-container">
    <div class="nav-bar">
      <van-nav-bar title-class='nav-title' title="登录"></van-nav-bar>
    </div>
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
              <input type="text" name="inviteCode" placeholder-style="color: #BCC2E1" v-model="inviteCode"
                @focus="onInviteFocus" @blur="onInviteBlur" placeholder="请输入邀请码">
            </div>
            <!-- 聚焦下划线 -->
            <div :class="isInviteInputFocus ? 'borderBlue' : 'borderWhite'"></div>
          </div>
          <!-- 步骤一按钮 -->
          <div class="step1-btn margin37" style="margin-top: 135px">
            <button class="nextStepBtn" @click="toStep2">下一步</button>
          </div>
          <div class="account-login margin37">
            <span @click="accountLogin">微信授权绑定</span>
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
                <input type="text" name="houseHoldName" placeholder-style="color: #BCC2E1" v-model="personName"
                  @focus="onHouseHoldNameFocus" @blur="onHouseHoldNameBlur" placeholder="请输入姓名">
              </div>
              <div :class="isHouseHoldNameFocus ? 'borderBlue' : 'borderWhite'"></div>
              <!-- 手机号输入框 -->
              <div class="houseHoldInput">
                <span>手机号</span>
                <input type="text" name="houseHoldTel" placeholder-style="color: #BCC2E1" v-model="phoneNum"
                  @focus="onHouseHoldTelFocus" @blur="onHouseHoldTelBlur" placeholder="请输入手机号">
              </div>
              <div :class="isHouseHoldTelFocus ? 'borderBlue' : 'borderWhite'"></div>
              <!-- 身份证号输入框 -->
              <div class="houseHoldInput">
                <span>身份证号</span>
                <input type="text" name="houseHoldIdCard" placeholder-style="color: #BCC2E1" v-model="cardNum"
                  @focus="onHouseHoldIdCardFocus" @blur="onHouseHoldIdCardBlur" placeholder="请输入身份证号">
              </div>
              <div :class="isHouseHoldIdCardFocus ? 'borderBlue' : 'borderWhite'"></div>
              <!-- 性别选择框 -->
              <div class="houseHoldInput">
                <span>性别</span>
                <input type="text" name="houseHoldSex" placeholder-style="color: #BCC2E1" v-model="personSex"
                  @focus="onHouseHoldSexFocus" @blur="onHouseHoldSexBlur" placeholder="请选择性别" disabled
                  @click="chooseSex">
              </div>
              <div :class="isHouseHoldSexFocus ? 'borderBlue' : 'borderWhite'"></div>
              <!-- 车辆输入框 -->
              <div class="houseHoldCarInput">
                <!-- 有车 无车 按钮 -->
                <div class="car-radio">
                  <div class="radio-box" v-for="(item, index) in radios" :key="index">
                    <div class="isChecked" @click="check(index)">
                      <img :src="isCheckedImg" v-if="item.isChecked">
                      <img :src="notCheckedImg" v-else>
                      <label>{{item.label}}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 有车,车牌号输入框 -->
          <div class="car-input-wrapper" v-if="isShowInput">
            <scroll-view class="scroll-view" scroll-y='true'>
              <div class="cars-input">
                <!-- 渲染车辆信息 -->
                <div v-if="car.length !== 0">
                  <div v-for="(item, index) in car" :key="index">
                    <div class="car-msg">
                      <div class="car-type">{{item.carType}}</div>
                      <div class="choose-icon">
                        <div class="triangle"></div>
                      </div>
                      <div class="car-number">{{item.licensePlateNo}}</div>
                    </div>
                  </div>
                </div>

                <div class="car-msg" v-if="isCarInput">
                  <!-- 选择车辆类型, 默认列表第一个 -->
                  <div class="car-type" @click="chooseCarType">
                    <input type="text" v-model='carTypeVal'>
                  </div>
                  <!-- 点击图标, 展示所有类型, 供选择 -->
                  <div class="choose-icon">
                    <div class="triangle"></div>
                  </div>
                  <!-- 车辆输入框 -->
                  <div class="car-number">
                    <input type="text" placeholder="请输入车牌号" v-model="carObj.licensePlateNo" @input="inputCarNum"
                      maxlength="8" confirm-type="done" @confirm='onConfirm' @change='onChange'
                      @focus="onHouseHoldCarNumFocus" @blur="onHouseHoldCarBlur" placeholder-style="color: #BCC2E1">
                  </div>
                </div>
              </div>
            </scroll-view>
          </div>
          <!-- 增加 按钮 -->
          <div class="add-car-wrapper" v-if="isShowInput">
            <div class="add-car-btn" @click="addCar">
              <img :src="addCarIcon">
              <span>增加</span>
            </div>
          </div>
          <!-- 步骤二按钮 -->
          <div class="step2-btn margin37" style="margin-top: 32px">
            <button class="nextStepBtn" @click="toStep3">下一步</button>
          </div>
          <div class="account-login margin37">
            <span @click="accountLogin">微信授权绑定</span>
          </div>
        </div>
        <!-- 步骤三 -->
        <div class="step3" v-if="isStep3">
          <!-- 步骤三添加图片 -->
          <div class="person-img">
            <!-- 展示头像 -->
            <div class="houseHold-img" v-if="tempPhoto">
              <img :src="tempPhoto" @click="previewImage" data-src='tempPhoto'>
            </div>
            <!-- 展示添加头像背景图 -->
            <div class="bg-img" v-else>
              <img :src="defaultImg">
              <div class="camera-bg" @click="choosePersonImg">
                <img :src="cameraImg">
              </div>
            </div>
          </div>
          <!-- 步骤三文字备注 -->
          <div class="info-text margin37">
            <span><text style="color: #F7483B">*</text>1、只能是本人照片</span>
            <span>2、不可戴眼镜、帽子</span>
            <span>3、正面照</span>
          </div>
          <!-- 提交表单按钮 -->
          <div class="step3-btn">
            <submit-btn btnText='确定' isActive></submit-btn>
          </div>
          <div class="account-login margin37">
            <span @click="accountLogin">微信授权绑定</span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { showToast, chooseWxImage, transformBase64 } from '../../api/wechat'
import { isName, isIdCard, isPhone, isCarNum, carNumFormat } from '../../utils/index'
import submitBtn from '@/components/submitBtn'
import { checkCode, selectPerson, faceDetect, personSave } from '../../api/index'
export default {
  components: { submitBtn },
  mounted () {
    Object.assign(this.$data, this.$options.data())
  },
  watch: {
    // 监听是否有车的变化
    hasCar (newVal) {
      this.carTypeVal = '小汽车'
      this.carType = 1
      this.carObj = {}
      this.car = []
    }
    // 'houseHoldLoginForm.houseHoldCar' (curArr) {
    //   this.houseHoldLoginForm.houseHoldCar = curArr
    //   console.log(curArr)
    // }
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
      isHouseHoldCarNumFocus: false,
      houseHoldNameFlag: false,
      houseHoldTelFlag: false,
      houseHoldIdCardFlag: false,
      houseHoldSexFlag: false,
      houseHoldCarFlag: false,
      phoneCardFlag: false,
      carNumErrFlag: false,
      isCheckedImg: '../../static/images/isChecked.png',
      notCheckedImg: '../../static/images/notChecked.png',
      addCarIcon: '../../static/images/addCarIcon.png',
      isShowInput: true,
      isCarInput: true,
      radios: [
        {
          label: '有车',
          value: '1',
          isChecked: true
        },
        {
          label: '',
          value: '2',
          isChecked: false
        }
      ],
      carTypeVal: '小汽车',
      carType: 1,
      defaultImg: '../../static/images/default.png',
      cameraImg: '../../static/images/camera.png',
      choiceIcon: '../../static/images/choice.png',
      // 提交注册的人员信息
      roomsObj: {},
      rooms: [],
      roomId: '',
      roomFullName: '',
      placeId: '',
      inviteCode: '',
      id: '',
      personName: '',
      personSex: '',
      personSexNum: '',
      cardNum: '',
      phoneNum: '',
      tempPhoto: '',
      regPhoto: '',
      hasCar: '',
      carObj: {
        'carType': '1',
        // 'carTypeVal': '小汽车',
        'licensePlateNo': ''
      },
      isExist: false,
      car: []
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
    onHouseHoldNameBlur (e) {
      this.isHouseHoldNameFocus = false
      this.personName = e.mp.detail.value
      const nameResult = isName(this.personName)
      if (nameResult) {
        this.houseHoldNameFlag = false
      } else {
        this.houseHoldNameFlag = true
      }
    },
    // 手机号聚焦
    onHouseHoldTelFocus () {
      this.isHouseHoldTelFocus = true
    },
    // 手机号失焦
    onHouseHoldTelBlur (e) {
      this.isHouseHoldTelFocus = false
      this.phoneNum = e.mp.detail.value
      const telResult = isPhone(this.phoneNum)
      if (telResult) {
        this.houseHoldTelFlag = false
      } else {
        this.houseHoldTelFlag = true
      }
    },
    // 身份证号聚焦
    onHouseHoldIdCardFocus () {
      this.isHouseHoldIdCardFocus = true
    },
    // 身份证号失焦
    onHouseHoldIdCardBlur (e) {
      this.isHouseHoldIdCardFocus = false
      this.cardNum = e.mp.detail.value
      const idCardResult = isIdCard(this.cardNum)
      if (idCardResult) {
        this.houseHoldIdCardFlag = false
      } else {
        this.houseHoldIdCardFlag = true
      }
    },
    // 性别聚焦
    onHouseHoldSexFocus () {
      this.isHouseHoldSexFocus = true
    },
    // 选择性别
    chooseSex () {
      this.isHouseHoldSexFocus = true
      let that = this
      wx.showActionSheet({
        itemList: ['未知', '男', '女'],
        success (res) {
          if (res.tapIndex === 0) {
            that.personSex = '未知'
            that.personSexNum = res.tapIndex
            that.isHouseHoldSexFocus = false
            that.houseHoldSexFlag = true
          } else if (res.tapIndex === 1) {
            that.personSex = '男'
            that.personSexNum = res.tapIndex
            that.isHouseHoldSexFocus = false
            that.houseHoldSexFlag = true
          } else if (res.tapIndex === 2) {
            that.personSex = '女'
            that.personSexNum = res.tapIndex
            that.isHouseHoldSexFocus = false
            that.houseHoldSexFlag = true
          }
          // that.isHouseHoldSexFocus = false
        }
      })
    },
    // 是否有车
    check (index) {
      this.radios.forEach((item) => {
        item.isChecked = false
      })
      this.hasCar = this.radios[index].value
      if (this.radios[index].value !== '1') {
        this.isShowInput = false
      } else {
        this.isShowInput = true
      }
      this.radios[index].isChecked = true
      console.log(this.hasCar)
    },
    // 选择车辆类型
    chooseCarType (res) {
      let that = this
      wx.showActionSheet({
        itemList: ['小汽车', '大卡车'],
        success (res) {
          if (res.tapIndex === 0) {
            that.carTypeVal = '小汽车'
            that.carType = 1
          } else {
            that.carTypeVal = '大卡车'
            that.carType = 2
          }
        }
      })
    },
    // 监听车牌号输入框
    inputCarNum (e) {
      // this.carNumErrMsg = ''
      // let filtered = e.target.value
      // if (this.phone !== filtered) {
      //   this.phone = filtered
      // }
    },
    // 车牌号聚焦
    onHouseHoldCarNumFocus () {
      this.isHouseHoldCarNumFocus = true
    },
    // 输入框失去焦点, 验证车牌号,
    onHouseHoldCarBlur (e) {
      let that = this
      this.carObj.licensePlateNo = e.mp.detail.value
      let carResult = isCarNum(this.carObj.licensePlateNo)
      if (carResult) {
        // showToast(carResult)
        // that.carNumErrMsg = carResult
        that.carNumErrFlag = false
      } else {
        that.houseHoldCarFlag = true
        that.carObj.licensePlateNo = carNumFormat(that.carObj.licensePlateNo)
        that.carObj['carType'] = that.carTypeVal
        that.carTypeVal = '小汽车'
        that.submitCar()
      }
    },
    // 点击 增加车辆 按钮, 添加车辆记录输入框
    addCar () {
      this.isCarInput = true
    },
    // 点击 增加车辆 按钮, 将新增的一条车辆信息push 到 车辆数组
    submitCar () {
      var that = this
      // 未输入车牌号
      if (!this.carObj.licensePlateNo) {
        showToast('请检查车牌号')
      } else {
        // 已输入车牌号
        // var carResult = isCarNum(that.carObj.licensePlateNo)
        // 输入了正确的车牌号
        // if (!carResult) {
        if (that.car.length === 0) {
          that.car.push(that.carObj)
          that.carObj = {}
          that.carTypeVal = '小汽车'
          that.carType = 0
          that.isCarInput = false
          that.carNumErrFlag = true
        } else {
          for (var carItem of that.car) {
            if (that.carObj.carType === carItem.carType && that.carObj.licensePlateNo === carItem.licensePlateNo) {
              showToast('您输入的车辆信息已存在')
              that.isExist = true
              // that.carObj.carType = ''
              return false
            } else {
              that.isExist = false
            }
          }
          if (!that.isExist) {
            that.car.push(that.carObj)
            console.log(that.car)
            that.carObj = {}
            that.isCarInput = false
            that.carNumErrFlag = true
            // that.carType = '普通乘用车'
          }
        }
        // } else {
        //   // 车牌号格式错误, 报错
        //   showToast(carResult)
        // }
      }
      console.log('addcar:', this.car)
    },
    // 去步骤二
    // 点击下一步 会发送请求, 邀请码作为请求参数 验证是否存在邀请码
    // 邀请码存在 1.有人员信息, 渲染人员信息和照片 2.无人员信息, 自己输入
    toStep2 () {
      // 验证邀请码是否存在
      let that = this
      if (this.inviteCode) {
        checkCode({
          'data': {
            'inviteCode': that.inviteCode
          }
        }).then(res => {
          const data = res.data
          // 根据邀请码 获取信息
          that.inviteCode = data.data.inviteCode
          that.placeId = data.data.placeId
          that.roomsObj['roomId'] = data.data.roomId
          that.roomsObj['roomFullName'] = data.data.fullName
          that.rooms = that.rooms.push(that.roomsObj)
          that.roomId = data.data.roomId
          that.roomFullName = data.data.fullName
          console.log('data', data)
          if (data.code === 200) {
            that.isStep1 = false
            that.isStep2 = true
          }
        })
      } else {
        showToast('请输入邀请码')
      }
    },
    // 通过身份证手机号查询人员是否存在
    selectPerson () {
      let that = this
      selectPerson({
        'data': {
          'cardNum': that.cardNum,
          'phoneNum': that.phoneNum
        }
      }).then(res => {
        console.log('手机号和身份证号验证', res)
        const data = res.data
        if (data.code === 200) {
          that.phoneCardFlag = true
          // id为空,则该人未注册过, 下一步上传照片.id 不为空, 拿到id,带出照片
          if (data.id) {
            that.regPhoto = data.regPhoto
            that.tempPhoto = 'data:image/png;base64,' + data.regPhoto
            that.phoneCardFlag = true
          } else {
            that.phoneCardFlag = true
          }
        } else {
          // return false
          that.phoneCardFlag = false
        }
        // const data = res.data
        // id为空,则该人未注册过, 下一步上传照片.id 不为空, 拿到id,带出照片
        // if (!data.id) {
        //   this.toStep3()
        // } else {
        //   that.id = data.id
        //   console.log(data.id)
        //   that.regPhoto = data.regPhoto
        //   that.tempPhoto = 'data:image/png;base64,' + data.regPhoto
        // }
      })
    },

    // 去步骤三
    toStep3 () {
      console.log('toStep3')
      this.selectPerson()
      if (!this.houseHoldNameFlag) {
        showToast('请检查姓名')
      } else if (!this.houseHoldTelFlag) {
        showToast('请检查手机号')
      } else if (!this.houseHoldIdCardFlag) {
        showToast('请检查身份证号')
      } else if (!this.houseHoldSexFlag) {
        showToast('请选择性别')
      } else if (!this.phoneCardFlag) {
        showToast('身份证号与手机号不匹配')
      } else if (!this.carNumErrFlag) {
        showToast('请检查车牌号')
      } else {
        this.isStep2 = false
        this.isStep3 = true
      }
    },
    // 添加人像
    choosePersonImg () {
      let that = this
      wx.showActionSheet({
        itemList: ['从手机相册选择', '拍照'],
        success (res) {
          if (!res.cancel) {
            if (res.tapIndex === 0) {
              that.chooseWxImg('album')
            } else if (res.tapIndex === 1) {
              that.chooseWxImg('camera')
            }
          }
        }
      })
    },
    // 上传照片
    chooseWxImg (type) {
      let that = this
      chooseWxImage(type, (res) => {
        // console.log('imgPath', res)
        // 将 url 图片改为 base64
        transformBase64(res[0], (res) => {
          // console.log('imgBase64', res)
          // const tempPhoto = 'data:image/png;base64,' + res.data
          const tempPhoto = res.data
          // 上传图片后进行人脸检测
          faceDetect({
            'data': {
              'photo': tempPhoto
            }
          }).then(res => {
            console.log('照片检查', res)
            if (res.data.code === 200) {
              that.regPhoto = tempPhoto
              that.tempPhoto = 'data:image/png;base64,' + tempPhoto
            }
          })
        })
      })
    },
    // 通过邀请码, 注册成功
    inviteCodeFormSubmit () {
      let that = this
      personSave({
        'data': {
          'rooms': [{
            'roomId': '01010101001001001001102',
            'roomFullName': '01栋一单元一楼102室'
          }],
          'placeId': that.placeId,
          'inviteCode': that.inviteCode,
          'id': that.id,
          'personName': that.personName,
          'personSex': that.personSexNum,
          'cardNum': that.cardNum,
          'phoneNum': that.phoneNum,
          'regPhoto': that.regPhoto,
          'car': []
        }
      }).then(res => {
        this.$router.push('../../pages/ownerLogin/main')
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
              current: e.currentTarget.dataset.src,
              urls: [that.tempPhoto]
            })
          } else {
            // 选择删除
            that.tempPhoto = ''
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
    height: 1.2px;
    background: #667dfa;
  }
  .borderWhite {
    height: 1.2px;
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
  .marginBottom {
    height: 35px;
    background: rgba(245, 246, 252, 1);
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
      align-items: center;
      margin: 0 auto;
      .icon-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        // box-sizing: border-box;
        .icon-active {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(102, 125, 250, 1);
          border-radius: 50%;
          img {
            width: 14px;
            height: 14px;
          }
        }
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
    height: 100%;
    margin-top: 31px;
    color: #333;
    .login-form {
      height: 100%;
      .step1-btn,
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
      // 步骤一
      .step1 {
        display: flex;
        flex-direction: column;
        margin-top: 80px;
        .step1-input {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 15px;
          font-size: 14px;
          color: #333;
          span {
            width: 20%;
            margin-right: 10.5px;
          }
          input {
            width: 80%;
          }
        }
      }
      .step2 {
        height: 100%;
        .step2-input {
          .houseHoldInput {
            display: flex;
            flex-direction: row;
            position: relative;
            align-items: center;
            margin-top: 12px;
            margin-bottom: 10px;
            font-size: 13.5px;
            input {
              position: absolute;
              left: 83px;
              height: 100%;
            }
          }
          .houseHoldCarInput {
            display: flex;
            flex-direction: column;
            margin-top: 16px;
            .car-radio {
              display: flex;
              flex-direction: row;
              margin-bottom: 10px;
              .radio-box {
                font-size: 14px;
                .isChecked {
                  margin-right: 43px;
                  img {
                    height: 11px;
                    width: 11px;
                    margin-right: 3.5px;
                  }
                }
              }
            }
          }
        }
        .car-input-wrapper {
          height: 18%;
          margin-left: 15px;
          margin-right: 15px;
          background: rgba(245, 246, 252, 1);
          // 车辆列表渲染
          .scroll-view {
            height: 100%;
            .cars-input {
              height: 100%;
              position: relative;
              // .cars-list {
              // display: flex;
              // flex-direction: column;
              .car-msg {
                display: flex;
                flex-direction: row;
                position: relative;
                align-items: center;
                height: 44.5px;
                margin-left: 23px;
                margin-right: 23px;
                font-size: 14px;
                border-bottom: 0.5px solid #d2d7f0;
                .car-type {
                  width: 70px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  color: #333;
                }
                .car-number {
                  display: flex;
                  flex-direction: row;
                  color: #666;
                  input {
                    width: 100px;
                    height: 100%;
                  }
                  .err {
                    position: absolute;
                    right: 0;
                    color: #cc3333;
                  }
                }
              }
            }
          }
        }
        // 添加车辆样式
        .add-car-wrapper {
          position: relative;
          height: 30px;
          margin-left: 15px;
          margin-right: 15px;
          background: rgba(245, 246, 252, 1);
          .add-car-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            bottom: 5px;
            right: 23px;
            width: 45px;
            height: 18px;
            background: rgba(255, 255, 255, 1);
            border-radius: 9px;
            color: #667dfa;
            img {
              width: 7px;
              height: 7px;
              margin-right: 4px;
            }
            span {
              font-size: 11px;
            }
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
          .houseHold-img {
            img {
              width: 100%;
              height: 100%;
            }
            width: 100%;
            height: 100%;
          }
          .bg-img {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 97px;
            img {
              position: absolute;
              width: 80px;
              height: 97px;
            }
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
