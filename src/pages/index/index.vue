<template>
  <!-- 首页 -->
  <div class="home-container">
    <!-- 用户授权 -->
    <!-- <auth v-if="!isAuth"></auth> -->
    <div v-if="isAuth" class="isAuth">
      <!-- 未审核 -->
      <!-- <div v-if="isExamine">
      </div> -->
      <!-- 已审核 -->
      <div v-if="isExamine" class="examine">
        <div class="nav-bar">
          <van-nav-bar title-class='nav-title' title="云上物业"></van-nav-bar>
        </div>
        <!-- 头部用户信息 -->
        <!-- 背景图片 -->
        <div class="user-container">
          <img :src="bgImg">
          <!-- 用户上部分基本个人信息 -->
          <div class='user-datas'>
            <!-- 左侧用户头像 -->
            <div class="user-avator">
              <!-- <img :src='regPhoto' lazy='loading'> -->
              <avator-img round :src='regPhoto'></avator-img>
            </div>
            <!-- 右侧 用户名、角色、手机号 -->
            <div class="user-info">
              <div class="user-name-role">
                <div class="name">{{personName}}</div>
                <div class="role" v-if='personRegion'><span>{{personRegion}}</span></div>
              </div>
              <div class="user-phone">{{phoneNum}}</div>
            </div>
            <!-- 跳转至用户详情箭头 -->
            <div class="toPersonMsg" @click="toPersonMsg">
              <arrow-btn />
            </div>
          </div>
          <!-- 用户下部分用户地址 -->
          <div class="user-address">
            <div class="address-content">
              <!-- 地图图标 -->
              <div class="address-icon">
                <img :src="addressIcon">
              </div>
              <!-- 地址详情 -->
              <div class="address-txt">{{roomFullName}}</div>
              <!-- 去新增地址页 -->
              <div class="add-address" @click="toAddress">
                <img :src="addAddressIcon">
              </div>
            </div>
          </div>
        </div>
        <!-- 通知 导航 列表展示 -->
        <div class="home-body">
          <!-- 通知 -->
          <div class="info-container margin15">
            <!-- <div class="info"> -->
            <img class="info-icon" :src='infoImg' />
            <div class="info-text">{{infoText}}</div>
          </div>
          <!-- 导航+数据列表 -->
          <div class="tabs-lists-container margin15">
            <!-- <div class="main-container"> -->
            <!-- 导航 -->
            <div class="tabs">
              <div class="btnStyle" @click='tabClick' v-if='isOwner' data-id='0'>
                <div><span :class="[tab, currentTab == 0 ? 'select' : '']">住户</span></div>
              </div>
              <div class="btnStyle" @click='tabClick' data-id='1'>
                <div><span :class="[tab, currentTab == 1 ? 'select' : '']">报修</span></div>
              </div>
              <div class="btnStyle" @click='tabClick' data-id='2'>
                <div><span :class="[tab, currentTab == 2 ? 'select' : '']">邀请</span></div>
              </div>
              <div class="btnStyle" @click='tabClick' data-id='3'>
                <div><span :class="[tab, currentTab == 3 ? 'select' : '']">通知</span></div>
              </div>
            </div>
            <!-- 页面主体列表 -->
            <div class="main-container">
              <div class="main-content">
                <!-- 住户界面 -->
                <div v-if="currentTab == 0 && isOwner" class="scroll-container">
                  <scroll-view class="scroll-view" scroll-y='true'>
                    <div v-if='houseHoldList.length === 0' class="nullData">
                      暂无住户数据
                    </div>
                    <div v-else>
                      <div class="house-lists" v-for='(item, index) in houseHoldList' :key='index'>
                        <div class="house-item" @click="toHouseHold(item)">
                          <!-- 左侧用户头像 -->
                          <avator-img round :src='getImgUrl(item.regPhoto)'>
                          </avator-img>
                          <!-- 中间住户信息 -->
                          <div class="house-person">
                            <div class="house-person-up">
                              <div class="person-name">{{item.personName}}</div>
                              <div class="person-sex">
                                <img :src="female" v-if='item.personSex == 2'>
                                <img :src="male" v-else>
                              </div>
                              <div
                                :class="['person-role', item.personRegioncode == 1 ? 'wy' : (item.personRegioncode == 2 ? 'yz':'zh')]">
                                {{item.personRegioncode == 1 ? '物业' : (item.personRegioncode == 2 ? '业主' : '租户')}}
                              </div>
                            </div>
                            <div class="person-tel">{{item.phoneNum}}</div>
                          </div>
                          <!-- 右侧 跳转至住户信息界面 -->
                          <div class="toHousePerson">
                            <arrow-btn color='#D2D7F0' @arrowClick='toHouseHold' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </scroll-view>
                </div>
                <!-- 报修界面 -->
                <div v-if='currentTab == 1' class="scroll-container">
                  <scroll-view scroll-y="true" class="scroll-view">
                    <div v-if='repairList.length === 0' class="nullData">
                      暂无报修数据
                    </div>
                    <div>
                      <div v-for="(item, index) in repairList" :key="index">
                        <div @click="toRepairDetail(item)">
                          <tab-lists :repairList='item' isRepair></tab-lists>
                        </div>
                      </div>
                    </div>
                  </scroll-view>
                </div>
                <!-- 邀请界面 -->
                <!-- 如果有邀请权限, 展示邀请界面 -->
                <div v-if='currentTab == 2' class="scroll-container">
                  <div v-if="isInvitation" class="height-1px">
                    <scroll-view scroll-y='true' class="scroll-view">
                      <div v-if='inviteList.length === 0' class="nullData">
                        暂无邀请数据
                      </div>
                      <div v-else>
                        <div v-for="(item, index) in inviteList" :key="index">
                          <div @click="toInviteDetail(item)">
                            <tab-lists :inviteList='item' isInvite></tab-lists>
                          </div>
                        </div>
                      </div>
                    </scroll-view>
                  </div>
                  <!-- 无邀请权限界面展示 -->
                  <div v-else>
                    <div class="notInviteRole">
                      <div>您的邀请功能未开启请联系户主</div>
                    </div>
                  </div>
                </div>
                <!-- 通知界面 -->
                <div v-if='currentTab == 3' class="scroll-container">
                  <scroll-view class="scroll-view" scroll-y='true'>
                    <div v-if='infoList.length === 0' class="nullData">
                      暂无通知数据
                    </div>
                    <div>
                      <div v-for="(item, index) in infoList" :key="index">
                        <div @click="toInfoDetail(item)">
                          <tab-lists :infoList='item' isInfo></tab-lists>
                        </div>
                      </div>
                    </div>
                  </scroll-view>
                </div>
              </div>

            </div>
          </div>
          <!-- 页面下方提交按钮 -->
          <div class="submit-btn">
            <!-- 添加住户按钮 -->
            <div class="add-person" v-if='isOwner'>
              <div v-if='isExamine'>
                <submit-btn btnText='添加住户' @submitClick='addHousePerson' v-if='currentTab == 0'></submit-btn>
              </div>
              <div v-else>
                <submit-btn btnText='添加住户' v-if='currentTab == 0' isShadow></submit-btn>
              </div>
            </div>
            <!-- 报修按钮 -->
            <div class="repair-btn" v-if='currentTab == 1'>
              <div v-if='isExamine'>
                <submit-btn btnText='报修' @submitClick='applyRepair' isActive v-if='currentTab == 1'></submit-btn>
              </div>
              <div v-else>
                <submit-btn btnText='报修' isShadow></submit-btn>
              </div>

            </div>
            <!-- 邀请按钮 -->
            <div class="invite-btn" v-if='currentTab == 2'>
              <!-- 有邀请权限 -->
              <div v-if="isInvitation" class="hasInvite">
                <submit-btn btnText='邀请' @submitClick='invitePerson' isActive></submit-btn>
              </div>
              <!-- 无邀请权限 -->
              <div v-else>
                <submit-btn btnText='邀请' isShadow></submit-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import auth from '@/components/auth'
import avatorImg from '@/components/avatorImg'
import arrowBtn from '@/components/arrowBtn'
import submitBtn from '@/components/submitBtn'
import tabLists from '@/components/tabLists'
import { getToken, setStorageSync, showLoading, hideLoading, getStorageSync, showToast } from '../../api/wechat'
import { API_URL, getPersonMess, getHouseHoldList, getInviteList, getRepairList, getInfoList } from '../../api/index'
export default {
  components: { avatorImg, arrowBtn, submitBtn, tabLists },
  onShow () {
    this.getToken()
    let that = this
    if (!this.isOwner) {
      that.currentTab = 1
    } else {
      that.currentTab = 0
    }
    mpvue.removeStorageSync('car')
  },
  data () {
    return {
      // 是否授权
      isAuth: true,
      // 是否是户主
      isOwner: true,
      isExamine: false,
      isHouseholder: '',
      // 是否具有邀请权限
      isInvitation: false,
      // 人员信息
      regPhoto: '../../static/images/avator.png',
      personMess: {},
      personName: '',
      personRegion: '',
      personRegionCode: '',
      phoneNum: '',
      rooms: [],
      room: {},
      personId: '',
      houseHoldList: [],
      inviteList: [],
      repairList: [],
      infoList: [],
      bgImg: '../../static/images/bg.png',
      avator: '../../static/images/user1.png',
      infoImg: '../../static/images/info.png',
      infoText: '暂无通知消息',
      currentTab: 0,
      female: '../../static/images/female.png',
      male: '../../static/images/male.png',
      addressIcon: '../../static/images/address.png',
      addAddressIcon: '../../static/images/open.png',
      roomFullName: '您暂未绑定户址'
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.getToken()
    //调用微信停止下拉刷新的函数
    wx.stopPullDownRefresh()
  },
  methods: {
    // 获取token
    getToken () {
      let that = this
      getToken(() => {
        showLoading('加载中')
        that.getRoom()
        that.isAuth = true
      }, () => {
        that.isAuth = false
        that.$router.push('../../pages/ownerLogin/main')
      }
      )
    },
    // 获取缓存中  room
    getRoom () {
      let that = this
      if (getStorageSync('room')) {
        that.room = getStorageSync('room')
        that.roomFullName = that.room.roomFullName
        that.infoText = that.room.notice
        that.isInvitation = that.room.isInvitation
        if (parseInt(that.isInvitation) === 1) {
          that.isInvitation = true
        } else {
          that.isInvitation = false
        }
        that.isExamine = true
        that.personMess = getStorageSync('personMess')
        that.regPhoto = ('data:image/png;base64,' + that.personMess.regPhoto).replace(/[\r\n]/g, '')
        that.personName = that.personMess.personName
        that.phoneNum = that.personMess.phoneNum
        that.personId = that.personMess.id
        that.getHouseHoldList()
        that.getRepairList()
        that.getInviteList()
        that.getInfoList()
        console.log('缓存中room')
        hideLoading()
        return false
      } else {
        console.log('缓存中无room')
        that.getPersonMess()
        hideLoading()
      }

    },
    // 图片路径拼接
    getImgUrl (img) {
      return `${API_URL}${img}`
    },
    // 获取首页人员信息
    getPersonMess () {
      let that = this
      getPersonMess().then(res => {
        that.personMess = res.data.data
        setStorageSync('personMess', that.personMess)
        that.regPhoto = ('data:image/png;base64,' + that.personMess.regPhoto).replace(/[\r\n]/g, '')
        that.personName = that.personMess.personName
        that.phoneNum = that.personMess.phoneNum
        that.personId = that.personMess.id
        that.rooms = that.personMess.rooms
        if (that.rooms.length !== 0) {
          that.isExamine = true
          for (var roomItem of that.rooms) {
            if (roomItem.isDefault === 1) {
              that.roomFullName = roomItem.roomFullName
              that.infoText = roomItem.notice
              that.isHouseholder = roomItem.isHouseholder
              that.room = {
                'roomId': roomItem.roomId,
                'roomFullName': roomItem.roomFullName
              }
              that.isInvitation = roomItem.isInvitation
            } else {
              that.roomFullName = that.rooms[0].roomFullName
              that.infoText = that.rooms[0].notice
              that.isHouseholder = that.rooms[0].isHouseholder
              that.personRegionCode = that.rooms[0].personRegionCode
              that.room = {
                'roomId': that.rooms[0].roomId,
                'roomFullName': that.rooms[0].roomFullName
              }
              that.isInvitation = that.rooms[0].isInvitation
            }
          }
          if (parseInt(that.isHouseholder) === 0) {
            that.isOwner = true
            that.personRegion = '户主'
          } else {
            that.isOwner = false
            if (parseInt(that.personRegionCode) === 1) {
              that.personRegion = '物业'
            } else if (parseInt(that.personRegionCode) === 2) {
              that.personRegion = '业主'
            } else {
              that.personRegion = '租户'
            }
          }
          if (parseInt(that.isInvitation) === 1) {
            that.isInvitation = true
          } else {
            that.isInvitation = false
          }
          console.log('人员详情', res)
          // 住户列表
          that.getHouseHoldList()
          // 报修列表
          that.getRepairList()
          // 邀请列表
          that.getInviteList()
          // 通知列表
          that.getInfoList()
          hideLoading()
        } else {
          // 没有绑定户址, 就是未审核通过
          that.isExamine = false
          showToast('您未审核通过')
          console.log('未审核')
        }
      }).catch(() => {
        hideLoading('加载失败')
      })

    },
    // 获取房间下住户
    getHouseHoldList () {
      let that = this
      getHouseHoldList({
        'data': {
          'roomId': that.room.roomId,
          'personId': that.personId
        }
      }).then(res => {
        that.houseHoldList = res.data.data
        console.log('houseHoldList', that.houseHoldList)
      })
    },
    // 报修列表
    getRepairList () {
      let that = this
      getRepairList({
        'data': {
          'pageNo': 1,
          'pageSize': 10,
          'roomId': that.room.roomId
        }
      }).then(res => {
        that.repairList = res.data.data.rows
        console.log('报修列表', that.repairList)
      })
    },
    // 邀请列表
    getInviteList () {
      let that = this
      getInviteList({
        'data': {
          'pageNo': 1,
          'pageSize': 20,
          'personId': that.personId,
          'roomId': that.room.roomId
        }
      }).then(res => {
        that.inviteList = res.data.data.rows
        console.log('邀请列表', that.inviteList)
      })
    },
    // 通知列表
    getInfoList () {
      let that = this
      getInfoList({
        'data': {
          'pageNo': 1,
          'pageSize': 10,
          'noticeTimeBegin': '',
          'noticeTimeEnd': '',
          'noticeTitle': '',
          'roomIds': that.roomId
        }
      }).then(res => {
        that.infoList = res.data.data.rows
        console.log('infoList', that.infoList)
      })
    },
    // 切换 tab 标签
    tabClick (e) {
      this.currentTab = e.currentTarget.dataset.id
      // console.log(e)
    },
    // 跳转至个人信息页面
    toPersonMsg () {
      // let that = this
      this.$router.push({
        path: '../../pages/owner/main'
      })
    },
    // 跳转至住户详情
    toHouseHold (item) {
      this.$router.push({
        path: '../../pages/houseHold/main',
        query: {
          personId: item.personId,
          houId: item.houId
        }
      })
    },
    // 跳转至添加住户界面
    addHousePerson (item) {
      this.$router.push('../../pages/addPerson/main')
    },
    // 报修详情页面
    toRepairDetail (item) {
      this.$router.push({
        path: '../../pages/repairDetail/main',
        query: { item: JSON.stringify(item) }
      })
    },
    // 跳转至新增报修界面
    applyRepair () {
      this.$router.push('../../pages/repairApply/main')
    },
    // 跳转至邀请人员界面
    invitePerson () {
      // console.log('邀请人员')
      this.$router.push('../../pages/invitePerson/main')
    },
    // 查看邀请详情
    toInviteDetail (item) {
      if (this.isInvitation) {
        this.$router.push({
          path: '../../pages/inviteDetail/main',
          query: { item: JSON.stringify(item) }
        })
      }
    },
    // 跳转至通知详情页面
    toInfoDetail (item) {
      this.$router.push({
        path: '../../pages/infoDetail/main',
        query: { item: JSON.stringify(item) }
      })
    },
    // 跳转至新增户址页面
    toAddress () {
      this.$router.push('../../pages/address/main')
    }
  }
}
</script>

<style lang='scss' scoped>
.home-container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  background: #f5f6fa;
  .isAuth {
    height: 100%;
  }
  .examine-mask {
    display: flex;
    flex-direction: column;
    position: fixed;
    background: rgba(0, 0, 0, 0.3);
    height: 100%;
    width: 100%;
  }
  .examine {
    height: 100%;
    .nav-bar {
      height: 64px;
    }
    // 用户信息样式
    .user-container {
      width: 100%;
      height: 139px;
      display: flex;
      flex-direction: column;
      position: relative;
      box-sizing: border-box;
      // 背景图片
      img {
        width: 100%;
        height: 139px;
        position: absolute;
      }
      .user-datas {
        display: flex;
        flex-direction: row;
        padding-left: 15px;
        // padding-right: 15px;
        .user-avator {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 51px;
          height: 51px;
          margin-top: 34px;
          // margin-left: 15px;
          margin-right: 11.5px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          z-index: 99;
          img {
            width: 47px;
            height: 47px;
          }
        }
        .user-info {
          z-index: 99;
          display: flex;
          flex-direction: column;
          width: 78%;
          .user-name-role {
            display: flex;
            flex-direction: row;
            margin-top: 41px;
            align-items: center;
            .name {
              margin-right: 7px;
              color: rgba(255, 255, 255, 1);
              font-size: 13px;
            }
            .role {
              width: 32px;
              height: 16px;
              border: 1px solid rgba(255, 255, 255, 1);
              border-radius: 5px;
              font-size: 11px;
              color: rgba(255, 255, 255, 1);
              text-align: center;
              margin: auto 0;
            }
          }
          .user-phone {
            width: 80%;
            font-size: 13px;
            color: rgba(255, 255, 255, 1);
            margin-top: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .toPersonMsg {
          position: absolute;
          right: 15px;
          top: 52.5px;
          z-index: 100;
          padding-left: 40px;
          padding-bottom: 30px;
        }
      }
      // 用户地址
      .user-address {
        position: absolute;
        height: 40.5px;
        bottom: 5px;
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
        box-sizing: border-box;
        .address-content {
          display: flex;
          width: 100%;
          height: 40.5px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 5px;
          color: rgba(255, 255, 255, 1);
          font-size: 13px;
          .address-icon {
            display: flex;
            align-self: center;
            margin-left: 11px;
            margin-right: 9px;
            width: 18px;
            height: 18px;
            img {
              width: 18px;
              height: 18px;
            }
          }
          .address-txt {
            width: 75%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 40.5px;
          }
          .add-address {
            width: 30px;
            height: 100%;
            display: flex;
            align-content: center;
            align-self: center;
            padding-left: 20px;
            img {
              align-self: center;
              width: 14px;
              height: 8px;
            }
          }
        }
      }
    }
    // 通知样式
    .home-body {
      height: calc(100% - 213px);
      box-sizing: border-box;
      position: relative;
      .info-container {
        height: 42px;
        display: flex;
        flex-direction: row;
        position: relative;
        margin-top: 10px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 1);
        .info-icon {
          width: 32.5px;
          height: 12px;
          position: absolute;
          top: 15px;
          left: 15px;
        }
        .info-text {
          width: 70%;
          font-size: 13px;
          color: rgba(51, 51, 51, 1);
          line-height: 42px;
          margin-left: 56.5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .tabs-lists-container {
        position: relative;
        height: calc(100% - 52px);
        margin-top: 10px;
        background: rgba(255, 255, 255, 1);
        border-radius: 5px 5px 0px 0px;
        .tabs {
          display: flex;
          flex-direction: row;
          align-items: center;
          align-content: center;
          height: 65px;
          justify-content: space-between;
          padding-left: 52px;
          padding-right: 52px;
          .btnStyle {
            display: flex;
            justify-content: space-around;
            span {
              padding-bottom: 6.5px;
            }
            .select {
              border-bottom: 3px solid rgba(102, 125, 250, 1);
              color: rgba(102, 125, 250, 1);
            }
          }
          .tab {
            display: flex;
            width: 30px;
            height: 20px;
            color: rgba(51, 51, 51, 1);
            font-size: 14px;
            justify-content: center;
          }
        }
        // 页面主体样式
        .main-container {
          height: calc(100% - 158px);
          // height: 100%;
          // position: relative;
          .main-content {
            // height: calc(100% - 83px);
            height: 100%;
            padding-left: 15px;
            padding-right: 15px;
            overflow: hidden;
            .scroll-container {
              height: calc(100% - 1px);
              .scroll-view {
                height: 100%;
              }
            }
            // 住户列表
            .house-lists {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-content: center;
              .house-item {
                display: flex;
                flex-direction: row;
                align-items: center;
                position: relative;
                height: 74.5px;
                border-bottom: 0.5px solid rgba(210, 215, 240, 1);
                color: #333;
                .house-person {
                  display: flex;
                  flex-direction: column;
                  margin-left: 11.5px;
                  font-size: 14px;
                  .house-person-up {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    .person-sex {
                      position: relative;
                      height: 13px;
                      width: 13px;
                      line-height: 13px;
                      img {
                        height: 100%;
                        width: 100%;
                      }
                    }
                    .person-sex {
                      margin-left: 4px;
                      margin-right: 4.5px;
                    }
                    .person-role {
                      width: 35px;
                      height: 15px;
                      border-radius: 5px;
                      font-size: 10.5px;
                      line-height: 15px;
                      text-align: center;
                    }
                    .wy {
                      background: rgba(223, 245, 236, 1);
                      color: rgba(7, 132, 81, 1);
                    }
                    .yz {
                      background: rgba(255, 236, 203, 1);
                      color: rgba(158, 87, 25, 1);
                    }
                    .zh {
                      background: rgba(226, 230, 246, 1);
                      color: rgba(37, 81, 137, 1);
                    }
                  }
                  .person-tel {
                    margin-top: 8px;
                  }
                }
                .toHousePerson {
                  position: absolute;
                  right: 0;
                }
              }
            }
            // 无邀请权限的界面
            .notInviteRole,
            .nullData {
              display: flex;
              flex-direction: column;
              align-items: center;
              height: 100%;
              font-size: 14px;
              color: #333;
              div {
                margin-top: 88px;
                width: 130px;
                text-align: center;
              }
            }
          }
        }
      }
      // 添加用户按钮样式
      .submit-btn {
        width: 100%;
        position: absolute;
        bottom: 0;
      }
    }
  }
  .height-1px {
    height: calc(100% - 1px);
  }
  .margin15 {
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>
