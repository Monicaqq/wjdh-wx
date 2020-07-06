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
          <div class="photo-right" data-src='regPhoto' @click="previewImg">
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
          <div class="tel-right">
            <span class="color666">{{personRegion}}</span>
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
  </div>
</template>
<script>
import avatorImg from '@/components/avatorImg'
import arrowBtn from '@/components/arrowBtn'
import { cardNumHidden } from '../utils/index'
import { getStorageSync } from '../api/wechat'
export default {
  components: { avatorImg, arrowBtn },
  props:
  {
    personMsg: {
      type: Object,
      default: {}
    },
    isPerson: {
      type: Boolean,
      default: false
    },
    carLen: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this.getPersonData()
  },
  data () {
    return {
      personData: {},
      roomFullName: '',
      personRegion: '',
      cardNum: '',
      regPhoto: '../../static/images/default.png'
    }
  },
  watch: {
    personData (newVal) {
      this.cardNum = cardNumHidden(newVal.cardNum, 3, 3)
    }
  },
  methods: {
    // 获取父组件中数据
    getPersonData () {
      let that = this
      this.personData = this.personMsg
      console.log('getPersonData', this.personData)
      if (this.personData.rooms[0]) {
        const isHouseholder = parseInt(this.personData.rooms[0].isHouseholder)
        const personRegioncode = parseInt(this.personData.rooms[0].personRegioncode)
        if (isHouseholder === 1) {
          that.personRegion = '户主'
        } else {
          if (personRegioncode === 1) {
            that.personRegion = '物业'
          } else if (personRegioncode === 2) {
            that.personRegion = '业主'
          } else {
            that.personRegion = '租户'
          }
        }
      } else {
        that.personRegion = '未知'
      }
      this.baseUrl = getStorageSync('base_url')
      this.regPhoto = this.baseUrl + this.personData.regPhoto
    },
    // 跳转至手机号界面
    // toTelView () {
    //   this.$router.push('../../pages/telphone/main')
    // },
    // 预览图片
    previewImg (e) {
      let that = this
      wx.previewImage({
        current: e.currentTarget.dataset.src,
        urls: [that.regPhoto]
      })
    },
    // 去车辆界面
    toCarView () {
      this.$router.push('../../pages/cars/main')
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
    .picker {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
}
</style>