<template>
  <!-- 个人信息组件 -->
  <div class="person-msg-container">
    <nav-bar navTitle='添加住户' @clickLeft='goBack'></nav-bar>
    <form @submit="addHouserPerson">
      <div class="person-msg">
        <div class="title-label">
          个人信息
        </div>
        <!-- 个人信息列表 -->
        <div class="person-lists">
          <div class="person-photo borderB1px person-item">
            <span class="color333">照片</span>
            <div class="photo-right">
              <!-- 已选中图片 -->
              <div v-if='tempPhoto' @click="previewImage" data-src='tempPhoto'>
                <avator-img round :src='tempPhoto'></avator-img>
              </div>
              <div v-else @click="choosePersonImg">
                <avator-img round :src='defaultImg'></avator-img>
              </div>
              <div class="arrow-btn">
                <arrow-btn @arrowClick='addAvator' color='#9B9B9B'></arrow-btn>
              </div>
            </div>
          </div>
          <div class="person-name borderB1px person-item">
            <span class="color333">姓名</span>
            <input type="text" class="color999" placeholder="请输入姓名" v-model="personName" maxlength="6"
              @input="inputName" @blur='onNameBlur' confirm-type="done" @confirm='onConfirm'>
          </div>
          <div class="person-sex borderB1px person-item">
            <span class="color333">性别</span>
            <div class="tel-right">
              <input type="text" class="color999" placeholder="请选择性别" @click="chooseSex" v-model="personSex" disabled
                @blur="onSexBlur">
              <arrow-btn @arrowClick='chooseSex' color='#9B9B9B'></arrow-btn>
            </div>
          </div>
          <div class="person-IDcard borderB1px person-item">
            <span class="color333">身份证号</span>
            <input type="text" class="color999" placeholder="请输入身份证号" v-model="cardNum" @input="inputIdCard"
              maxlength="18" @blur="onCardNumBlur" confirm-type="done" @confirm='onConfirm'>
          </div>
          <div class="person-tel person-item">
            <span class="color333">手机号</span>
            <input type="text" class="color999" placeholder="请输入手机号" v-model="phoneNum" @input="inputPhone"
              maxlength="11" confirm-type="done" @confirm='onConfirm' @blur="onPhoneBlur">
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
              <input type="text" class="color999" @click="choosePersonRegion" v-model="personRegion"
                placeholder="请选择人员类型" disabled @blur="onPersonRegionBlur">
              <arrow-btn @arrowClick='choosePersonType' color='#9B9B9B'></arrow-btn>
            </div>
          </div>
          <!-- 车辆 -->
          <div class="person-sex person-item">
            <span class="color333">车辆</span>
            <div class="tel-right" @click="toCarView">
              <span class="color999">{{carLen}}</span>
              <div class="arrow-btn">
                <arrow-btn color='#9B9B9B'></arrow-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 权限信息 -->
      <div class="housePer-msg">
        <div class="title-label">
          权限信息
        </div>
        <!-- 权限信息列表 -->
        <div class="housePer-lists">
          <!-- 进出权限 -->
          <div class="person-sex borderB1px person-item">
            <span class="color333">进出权限</span>
            <div class="tel-right">
              <input type="text" class="color999" @click="choosePassRole" v-model="passRole" placeholder="请选择进出权限"
                disabled @blur="onPersonRegionBlur">
              <arrow-btn @arrowClick='choosePassRole' color='#9B9B9B'></arrow-btn>
            </div>
          </div>
          <!-- 邀请权限 -->
          <div class="person-sex person-item">
            <span class="color333">邀请权限</span>
            <div class="tel-right">
              <input type="text" class="color999" @click="chooseInviteRole" v-model="inviteRole" placeholder="请选择邀请权限"
                disabled @blur="onPersonRegionBlur">
              <div class="arrow-btn">
                <arrow-btn color='#9B9B9B' @arrowClick='chooseInviteRole'></arrow-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 新增住户按钮 -->
      <div class="submit-btn" @click="addHouserPerson">
        <submit-btn btnText='确定' isActive></submit-btn>
      </div>
    </form>
  </div>
</template>
<script>
import { showToast, chooseWxImage, transformBase64, getStorageSync } from '../../api/wechat'
import { isName, isIdCard, isPhone } from '../../utils/index'
import { faceDetect, addPerson } from '../../api/index'
import avatorImg from '@/components/avatorImg'
import arrowBtn from '@/components/arrowBtn'
import submitBtn from '@/components/submitBtn'
import navBar from '@/components/navBar'
export default {
  components: { avatorImg, arrowBtn, submitBtn, navBar },
  props: {
    personMsg: {},
    isPerson: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      defaultImg: '../../static/images/avator.png',
      regPhoto: '',
      tempPhoto: '',
      personName: '',
      personSexNum: '',
      personSex: '',
      personSexFlag: false,
      cardNum: '',
      phoneNum: '',
      personRegion: '',
      personRegionCode: '',
      passRole: '',
      isPass: '',
      inviteRole: '',
      isInvitation: '',
      roomId: '',
      car: [],
      carLen: 0,
      regPhotoFlag: false,
      nameFlag: false,
      sexFlag: false,
      cardNumFlag: false,
      phoneNumFlag: false,
      personRegionFlag: false,
      passFlag: false,
      inviteFlag: false
    }
  },
  mounted () {
    Object.assign(this.$data, this.$options.data())
  },
  onShow () {
    let that = this
    const personDetail = getStorageSync('personMess')
    // this.carLen = car.length
    if (personDetail.rooms.length !== 0) {
      that.roomId = personDetail.rooms[0].roomId
    }
    if (getStorageSync('car')) {
      this.car = getStorageSync('car')
      this.carLen = this.car.length
    }

    console.log('car1', this.car)
  },
  onUnload () {
    mpvue.removeStorageSync('car')
  },
  methods: {
    // 选择人像照片
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
    // 上传头像照片
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
              that.regPhotoFlag = true
              that.regPhoto = tempPhoto
              that.tempPhoto = 'data:image/png;base64,' + tempPhoto
            }
          })
        })
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
    },
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
    // 身份证号校验
    inputIdCard (e) {

    },
    // 身份证号失焦
    onCardNumBlur (e) {
      let that = this
      this.cardNum = e.mp.detail.value
      const idCardResult = isIdCard(this.cardNum)
      if (idCardResult) {
        that.cardNumFlag = false
        // showToast(idCardResult)
      } else {
        that.cardNumFlag = true
      }
    },
    // 手机号校验
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
    // 选择人员类型
    choosePersonRegion () {
      let that = this
      wx.showActionSheet({
        itemList: ['物业', '业主', '租户'],
        success (res) {
          if (res.tapIndex === 0) {
            that.personRegion = '物业'
            that.personRegionCode = res.tapIndex
            that.personRegionFlag = true
          } else if (res.tapIndex === 1) {
            that.personRegion = '业主'
            that.personRegionCode = res.tapIndex
            that.personRegionFlag = true
          } else if (res.tapIndex === 2) {
            that.personRegion = '租户'
            that.personRegionCode = res.tapIndex
            that.personRegionFlag = true
          }
          // that.personRegionFlag = false
        }
      })
    },
    // 去车辆界面
    toCarView () {
      this.$router.push('../../pages/houseHoldCar/main')
    },
    // 选择进出权限
    choosePassRole () {
      let that = this
      wx.showActionSheet({
        itemList: ['不可进出', '可进出'],
        success (res) {
          if (res.tapIndex === 0) {
            that.passRole = '不可进出'
            that.isPass = res.tapIndex
            that.passFlag = true
          } else if (res.tapIndex === 1) {
            that.passRole = '可进出'
            that.isPass = res.tapIndex
            that.passFlag = true
          }
        }
      })
    },
    // 选择邀请权限
    chooseInviteRole () {
      let that = this
      wx.showActionSheet({
        itemList: ['禁止邀请访客', '允许邀请访客'],
        success (res) {
          if (res.tapIndex === 0) {
            that.inviteRole = '禁止邀请访客'
            that.isInvitation = res.tapIndex
            that.inviteFlag = true
          } else if (res.tapIndex === 1) {
            that.inviteRole = '允许邀请访客'
            that.isInvitation = res.tapIndex
            that.inviteFlag = true
          }
        }
      })
    },
    addHouserPerson () {
      let that = this
      // this.car = getStorageSync('car')
      if (!this.regPhotoFlag) {
        showToast('请上传人像照片')
      } else if (!this.nameFlag) {
        showToast('请检查姓名是否正确')
      } else if (!this.sexFlag) {
        showToast('请选择性别')
      } else if (!this.cardNumFlag) {
        showToast('请检查身份证号是否正确')
      } else if (!this.phoneNumFlag) {
        showToast('请检查手机号是否正确')
      } else if (!this.personRegionFlag) {
        showToast('请选择人员类型')
      } else if (!this.passFlag) {
        showToast('请选择进出权限')
      } else if (!this.inviteFlag) {
        showToast('请选择邀请权限')
      } else {
        addPerson({
          'data': {
            'rooms': [
              {
                'roomId': that.roomId,
                'personRegioncode': that.personRegionCode
              }],
            'personName': that.personName,
            'personSex': that.personSexNum,
            'cardNum': that.cardNum,
            'phoneNum': that.phoneNum,
            'regPhoto': that.regPhoto,
            'car': that.car,
            'isPass': that.isPass,
            'isInvitation': that.isInvitation
          }
        }).then(res => {
          if (res.data.code === 200) {
            mpvue.removeStorageSync('car')
            this.$router.go(-1)
            // this.$router.push('../../pages/home/main')
            console.log('addPerson', res)
          } else {
            showToast(res.data.message)
          }
        })
      }
    },
    goBack () {
      mpvue.removeStorageSync('car')
      // this.$router.push('../../pages/home/main')
      this.$router.go(-1)
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
  background: #f5f6fa;
  .person-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    line-height: 40px;
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
    height: 38px;
    margin-left: 15px;
    font-size: 12px;
    line-height: 38px;
    color: rgba(102, 102, 102, 1);
  }
  .person-lists {
    width: 100%;
    height: 221px;
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