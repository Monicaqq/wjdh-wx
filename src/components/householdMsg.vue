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
          <div class="photo-right" @click="previewImg" data-src='regPhoto'>
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
          <span class="color666">{{personSex}}</span>
        </div>
        <div class="person-IDcard borderB1px person-item">
          <span class="color333">身份证号</span>
          <span class="color666">{{cardNum}}</span>
        </div>
        <div class="person-tel person-item">
          <span class="color333">手机号</span>
          <div class="tel-right">
            <span class="color666">{{personMsg.phoneNum}}</span>
            <!-- <arrow-btn color='#9B9B9B'></arrow-btn> -->
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
            <span class="color666">{{personRegioncode}}
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
            <span class="color666">{{isPass}}</span>
            <arrow-btn color='#9B9B9B'></arrow-btn>
          </div>
        </div>
        <!-- 车辆 -->
        <div class="person-tel person-item">
          <span class="color333">邀请权限</span>
          <div class="tel-right" @click="chooseInviteRole">
            <!-- <input type="text" class="color666" @click="chooseInviteRole" v-model="inviteRole" disabled> -->
            <span class="color666">{{isInvitation}}</span>
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
import { updateHouseHold } from '../api/index'
import { getStorageSync } from '../api/wechat'
export default {
  components: { avatorImg, arrowBtn },
  props:
  {
    personMsg: {
      type: Object,
      default: {}
    },
    houId: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
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
  // created () {
  //   this.getPersonData()
  // },
  mounted () {
    this.baseUrl = getStorageSync('base_url')
  },
  data () {
    return {
      baseUrl: null,
      personData: {},
      car: [],
      carLen: '',
      cardNum: '',
      regPhoto: '../../static/images/timg.jpg',
      personSex: 0,
      personRegion: '',
      personRegioncode: '',
      passCode: '',
      isPass: '',
      inviteCode: '',
      isInvitation: '',
      rooms: [],
      passFlag: '',
      inviteFlag: '',
      regionFlag: '',
      personRegionList: ['业主', '租户'],
      passList: ['不可进出', '可进出'],
      inviationList: ['禁止邀请访客', '允许邀请访客']
    }
  },
  watch: {
    rooms (newVal) {
      this.personRegioncode = parseInt(newVal.personRegioncode)
      this.isPass = parseInt(newVal.isPass)
      this.isInvitation = parseInt(newVal.isInvitation)
      this.personRegion = this.personRegioncode
      this.passCode = this.isPass
      this.inviteCode = this.isInvitation
      this.isPass = this.isPass === 0 ? '不可进出' : '可进出'
      this.isInvitation = this.isInvitation === 0 ? '禁止邀请访客' : '允许邀请访客'
      this.personRegioncode = this.personRegioncode === 1 ? '物业' : this.personRegioncode === 2 ? '业主' : '租户'
      this.roomId = newVal.roomId
    },
    cardNum (newVal) {
      this.cardNum = cardNumHidden(newVal, 3, 3)
    },
    car (newVal) {
      this.carLen = newVal.length
    },
    houId (newVal) {
      this.houId = newVal
    },
    id (newVal) {
      this.id = newVal
    },
    'personMsg.personSex' (newVal) {
      if (parseInt(newVal) === 0) {
        this.personSex = '未知'
      } else if (parseInt(newVal) === 1) {
        this.personSex = '男'
      } else if (parseInt(newVal) === 2) {
        this.personSex = '女'
      }
    }
  },
  methods: {
    // 获取父组件中数据
    // getPersonData () {
    // },
    // 选择人员类型
    choosePersonRegion () {
      let that = this
      wx.showActionSheet({
        itemList: ['业主', '租户'],
        success (res) {
          if (res.tapIndex === 0) {
            that.regionFlag = 2
          } else if (res.tapIndex === 1) {
            that.regionFlag = 3
          }
          mpvue.showModal({
            title: '提示',
            content: '您确定更改人员类型',
            success (res) {
              if (res.confirm) {
                that.personRegioncode = that.personRegionList[that.regionFlag - 2]
                that.personRegion = that.regionFlag
                that.updateHouseHold()
              }
            }
          })
        }
      })
    },
    // 选择进出权限
    choosePassRole () {
      let that = this
      wx.showActionSheet({
        itemList: ['不可进出', '可进出'],
        success (res) {
          if (res.tapIndex === 0) {
            that.passFlag = res.tapIndex
          } else if (res.tapIndex === 1) {
            that.passFlag = res.tapIndex
          }
          mpvue.showModal({
            title: '提示',
            content: '您确定更进出权限',
            success (res) {
              if (res.confirm) {
                that.isPass = that.passList[that.passFlag]
                that.passCode = that.passFlag
                that.updateHouseHold()
              }
            }
          })
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
            that.inviteFlag = res.tapIndex
          } else if (res.tapIndex === 1) {
            that.inviteFlag = res.tapIndex
          }
          mpvue.showModal({
            title: '提示',
            content: '您确定更邀请权限',
            success (res) {
              if (res.confirm) {
                that.isInvitation = that.inviationList[that.inviteFlag]
                that.inviteCode = that.inviteFlag
                that.updateHouseHold()
              }
            }
          })
        }
      })
    },
    // 去车辆界面
    toCarView () {
      let that = this
      this.$router.push({
        path: '../../pages/carDetail/main',
        query: { item: JSON.stringify(that.car) }
      })
    },
    // 预览图片
    previewImg (e) {
      let that = this
      wx.previewImage({
        current: e.currentTarget.dataset.src,
        urls: [that.regPhoto]
      })
    },
    // 更改住户信息
    updateHouseHold () {
      let that = this
      updateHouseHold(that.baseUrl, {
        'data': {
          'houId': that.houId,
          'personId': that.id,
          'roomId': that.roomId,
          'isPass': that.passCode,
          'isInvitation': that.inviteCode,
          'personRegioncode': that.personRegion
        }
      }).then(res => {
        let pages = getCurrentPages()
        let beforePage = pages[pages.length - 1]
        beforePage.onLoad()
        // this.$router.go(-1)
        // that.$router.push('../../pages/home/main')
        console.log('更新人员类型', res)
      })
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
    height: 40px;
    line-height: 40px;
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
}
</style>