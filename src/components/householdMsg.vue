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
            <avator-img round :src='regPhoto'></avator-img>
            <div class="arrow-btn">
              <arrow-btn @arrowClick='addAvator' color='#9B9B9B'></arrow-btn>
            </div>
          </div>
        </div>
        <div class="person-name borderB1px person-item">
          <span class="color333">姓名</span>
          <span class="color666">{{personMsg.personName}}</span>
        </div>
        <div class="person-sex borderB1px person-item">
          <span class="color333">性别</span>
          <span class="color666">{{personMsg.personSex == 0 ? '未知' : (personMsg.personSex == 1 ? '男' : '女')}}</span>
        </div>
        <div class="person-IDcard borderB1px person-item">
          <span class="color333">身份证号</span>
          <span class="color666">{{cardNum}}</span>
        </div>
        <div class="person-tel person-item">
          <span class="color333">手机号</span>
          <div class="tel-right" @click="toTelView">
            <span class="color666">{{personMsg.phoneNum}}</span>
            <arrow-btn color='#9B9B9B'></arrow-btn>
          </div>
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
        <div class="person-tel borderB1px person-item">
          <span class="color333">人员类型</span>
          <div class="tel-right" @click="choosePersonRegion">
            <span class="color666">{{personRegionCode === 1 ? '物业' : personRegionCode === 2 ? '业主' : '租户'}}
            </span>
            <arrow-btn color='#9B9B9B'></arrow-btn>
          </div>
        </div>
        <!-- 车辆 -->
        <div class="person-tel person-item">
          <span class="color333">车辆</span>
          <div class="tel-right" @click="toCarView">
            <span class="color666">{{carLen}}</span>
            <arrow-btn color='#9B9B9B'></arrow-btn>
          </div>
        </div>
      </div>
    </div>
    <!-- 权限信息 -->
    <div class="housePer-msg">
      <div class="title-label">
        权限信息
      </div>
      <!-- 住户信息列表 -->
      <div class="housePer-lists">
        <!-- 人员类型 -->
        <div class="person-tel borderB1px person-item">
          <span class="color333">进出权限</span>
          <div class="tel-right" @click="choosePassRole">
            <!-- <input type="text" class="color666" @click="choosePassRole" v-model="passRole" disabled> -->
            <span class="color666">{{isPass === 0 ? '不可进出' : '可进出'}}</span>
            <arrow-btn color='#9B9B9B'></arrow-btn>
          </div>
        </div>
        <!-- 车辆 -->
        <div class="person-tel person-item">
          <span class="color333">邀请权限</span>
          <div class="tel-right" @click="chooseInviteRole">
            <!-- <input type="text" class="color666" @click="chooseInviteRole" v-model="inviteRole" disabled> -->
            <span class="color666">{{isInvitation === 0 ? '禁止邀请访客' : '允许邀请访客'}}</span>
            <arrow-btn color='#9B9B9B'></arrow-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import avatorImg from '@/components/avatorImg'
import arrowBtn from '@/components/arrowBtn'
import { cardNumHidden } from '../utils/index'
export default {
  components: { avatorImg, arrowBtn },
  props:
  {
    personMsg: {
      type: Object,
      default: {}
    },
    car: {
      type: Array,
      default: []
    },
    rooms: {
      type: Object,
      default: []
    },
    regPhoto: {
      type: String,
      default: ''
    },
    cardNum: {
      type: String,
      default: ''
    }
  },
  created () {
    this.getCarData()
  },
  data () {
    return {
      personData: {},
      car: [],
      carLen: '',
      cardNum: '',
      regPhoto: '../../static/images/timg.jpg',
      personRegion: '',
      personRegionCode: '',
      passRole: '',
      isPass: '',
      inviteRole: '',
      isInvitation: '',
      rooms: []
    }
  },
  watch: {
    rooms (newVal) {
      // this.rooms = newVal
      this.personRegionCode = parseInt(newVal.personRegioncode)
      this.isPass = parseInt(newVal.isPass)
      this.isInvitation = parseInt(newVal.isInvitation)
      console.log('rooms', newVal)
      console.log('isPass', this.isPass)
      console.log('isInvitation', typeof (this.isInvitation))
      // this.personRegionCode = newVal[0].personRegionCode
      // console.log('人员类型', this.personRegionCode)
      // console.log('人员类型', typeof (this.personRegionCode))
      // this.isInvitation = newVal[0].isInvitation
      // this.isPass = newVal[0].isPass
    },
    cardNum (newVal) {
      // console.log('cardNum', newVal)
      this.cardNum = cardNumHidden(newVal, 3, 3)
    },
    car (newVal) {
      this.carLen = newVal.length
    }
  },
  methods: {
    // 获取父组件中数据
    getCarData () {
      this.personData = this.personMsg
      // console.log('personData', this.personData)
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
          } else if (res.tapIndex === 1) {
            that.personRegion = '业主'
            that.personRegionCode = res.tapIndex
          } else if (res.tapIndex === 2) {
            that.personRegion = '租户'
            that.personRegionCode = res.tapIndex
          }
        }
      })
    },
    // 选择进出权限
    choosePassRole () {
      let that = this
      wx.showActionSheet({
        itemList: ['可进出', '不可进出'],
        success (res) {
          if (res.tapIndex === 0) {
            that.passRole = '可进出'
            that.personMsg.rooms[0].isPass = res.tapIndex
            that.isPass = res.tapIndex
          } else if (res.tapIndex === 1) {
            that.passRole = '不可进出'
            that.personMsg.rooms[0].isPass = res.tapIndex
            that.isPass = res.tapIndex
          }
        }
      })
    },
    // 选择邀请权限
    chooseInviteRole () {
      let that = this
      wx.showActionSheet({
        itemList: ['允许邀请访客', '禁止邀请访客'],
        success (res) {
          if (res.tapIndex === 0) {
            that.inviteRole = '允许邀请访客'
            that.isInvitation = res.tapIndex
          } else if (res.tapIndex === 1) {
            that.inviteRole = '禁止邀请访客'
            that.isInvitation = res.tapIndex
          }
        }
      })
      console.log('选择邀请权限')
    },
    // 去车辆界面
    toCarView () {
      this.$router.push('../../pages/houserHolderCar/main')
    }
  }
}
</script>
<style lang="scss" scoped>
.person-msg-container {
  width: 100%;
  .person-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 44.5px;
    line-height: 44.5px;
  }
  .color666 {
    color: #666666;
  }
  .color333 {
    color: #333;
  }
  .borderB1px {
    border-bottom: 0.5px solid #eee;
  }
  .person-tel {
    .tel-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      span {
        margin-right: 10px;
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
}
</style>