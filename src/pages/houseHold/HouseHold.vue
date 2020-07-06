<template>
  <!-- 住户界面 -->
  <div class="house-hold-container">
    <nav-bar navTitle='住户信息' @clickLeft='goBack'></nav-bar>
    <!-- <img :src="houseHoldDetail." alt=""> -->
    <!-- 住户个人信息部分 -->
    <household-msg ref='child' :personMsg='houseHoldDetail' :regPhoto='regPhoto' :car='car' :rooms='rooms'
      :cardNum='cardNum' :houId='houId' :id='id'>
    </household-msg>
    <!-- 删除住户按钮 -->
    <div class="submit-btn">
      <submit-btn btnText='删除' @submitClick='delHousePerson'></submit-btn>
    </div>
  </div>
</template>
<script>
import householdMsg from '@/components/householdMsg'
import submitBtn from '@/components/submitBtn'
import navBar from '@/components/navBar'
import { getHouseHoldInfo, deleteHouseHold } from '../../api/index'
import { getStorageSync, showLoading, hideLoading } from '../../api/wechat'
const log = require('../../log')
export default {
  components: { householdMsg, submitBtn, navBar },
  mounted () {
    this.baseUrl = getStorageSync('base_url')
    this.houId = this.$route.query.houId
    this.id = this.$route.query.personId
    showLoading('正在加载')
    this.getHouseHoldInfo()
  },
  onShow () {
    log.info('hello test')
    log.warn('warn')
    log.error('error')
    log.setFilterMsg('filterkeyword')
    log.setFilterMsg('addfilterkeyword')
  },
  data () {
    return {
      baseUrl: null,
      houseHoldDetail: {},
      regPhoto: '',
      car: [],
      rooms: {},
      cardNum: '',
      id: '',
      houId: '',
      roomId: '',
      isPass: '',
      isInvitation: '',
      personRegioncode: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
      Object.assign(this.$data, this.$options.data())
    },
    getHouseHoldInfo () {
      let that = this
      getHouseHoldInfo(that.baseUrl, {
        'data': {
          'id': that.id,
          'houId': that.houId
        }
      }).then(res => {
        that.houseHoldDetail = res.data.data
        that.regPhoto = this.baseUrl + this.houseHoldDetail.regPhoto
        that.car = that.houseHoldDetail.car
        that.rooms = that.houseHoldDetail.rooms[0]
        that.cardNum = that.houseHoldDetail.cardNum
        that.roomId = that.rooms.roomId
        that.isPass = that.rooms.isPass
        that.isInvitation = that.rooms.isInvitation
        that.personName = that.houseHoldDetail.personName
        hideLoading()
      })
    },
    delHousePerson () {
      let that = this
      mpvue.showModal({
        title: '提示',
        content: '确定进行删除操作吗？',
        success (res) {
          if (res.confirm) {
            deleteHouseHold(that.baseUrl, {
              'data': {
                'id': that.houId,
                'personId': that.id
              }
            }).then(res => {
              console.log('delHouseHold', res)
              if (res.data.code === 200) {
                let pages = getCurrentPages()
                let beforePage = pages[pages.length - 2]
                beforePage.onLoad()
                that.$router.go(-1)
              }
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.house-hold-container {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  background-color: #f5f6fa;
  .submit-btn {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>
