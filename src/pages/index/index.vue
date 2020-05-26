<template>
  <!-- 首页 -->
  <div class="home-container">
    <!-- 用户授权 -->
    <auth v-if="!isAuth" @getUserInfo="init"></auth>
    <div class="nav-bar">
      <van-nav-bar title-class='nav-title' title="仙林悦城"></van-nav-bar>
    </div>
    <!-- 头部用户信息 -->
    <div>
      <!-- 背景图片 -->
      <img :src="bgImg">
      <div class="user-container">
        <img :src="bgImg">
        <!-- 左侧用户头像 -->
        <div class="user-avator">
          <avator-img round :src='avator'></avator-img>
        </div>
        <!-- 右侧 用户名、角色、地址 -->
        <div class="user-info">
          <div class="user-name-role">
            <div class="name">王逸飞</div>
            <div class="role"><span>{{role}}</span></div>
          </div>
          <div class="user-address">仙林悦城A区3栋2单元102室仙林悦城A区3栋2单元102室</div>
        </div>
        <!-- 跳转至用户详情箭头 -->
        <div class="toPersonMsg">
          <arrow-btn @arrowClick='toPersonMsg' />
        </div>
      </div>
      <!-- 通知、导航 -->
      <div class="info-tabs-container">
        <div class="info">
          <img class="info-icon" :src='infoImg' />
          <div class="info-text">{{infoText}}</div>
        </div>
        <div class="tabs">
          <div v-if='isOwner' :class="[tab, currentTab == 0 ? 'select' : '']" @click='tabClick' data-id='0'>住户</div>
          <div :class="[tab, currentTab == 1 ? 'select' : '']" @click='tabClick' data-id='1'>报修</div>
          <div :class="[tab, currentTab == 2 ? 'select' : '']" @click='tabClick' data-id='2'>邀请</div>
          <div :class="[tab, currentTab == 3 ? 'select' : '']" @click='tabClick' data-id='3'>通知</div>
        </div>
      </div>
    </div>
    <!-- 页面主体列表 -->
    <div class="main-container">
      <div class="main-content">
        <!-- 住户界面 -->
        <!-- <div v-if='isOwner' class="height-1px"> -->
        <div v-if='currentTab == 0 && isOwner' class="scroll-container">
          <scroll-view class="scroll-view" scroll-y='true'>
            <div class="house-lists" v-for='(item, index) in personList' :key='index'>
              <div class="house-item" @click="toHouseHold">
                <!-- 左侧用户头像 -->
                <avator-img round :src='item.avator'></avator-img>
                <!-- 中间住户信息 -->
                <div class="house-person">
                  <div class="house-person-up">
                    <div class="person-name">{{item.personName}}</div>
                    <div class="person-sex">
                      <img :src="female" v-if='item.personSex == 0'>
                      <img :src="male" v-if='item.personSex == 1'>
                    </div>
                    <div :class="['person-role', item.personRole == 3001 ? 'hz' : 'wy']">{{item.personRole}}
                    </div>
                  </div>
                  <div class="person-tel">{{item.telephone}}</div>
                </div>
                <!-- 右侧 跳转至住户信息界面 -->
                <div class="toHousePerson">
                  <arrow-btn color='#D2D7F0' @arrowClick='toHouseHold' />
                </div>
              </div>
            </div>
          </scroll-view>
        </div>
        <!-- </div> -->
        <!-- 报修界面 -->
        <div v-if='currentTab == 1' class="scroll-container">
          <scroll-view scroll-y="true" class="scroll-view">
            <div v-for="(item, index) in tabLists" :key="index">
              <div @click="toRepairDetail">
                <tab-lists :data='item' isRepair></tab-lists>
              </div>
            </div>
          </scroll-view>
        </div>
        <!-- 邀请界面 -->
        <!-- 如果有邀请权限, 展示邀请界面 -->
        <div v-if='currentTab == 2' class="scroll-container">
          <div v-if="hasInviteRole" class="height-1px">
            <scroll-view scroll-y='true' class="scroll-view">
              <div v-for="(item, index) in tabLists" :key="index">
                <div @click="toInviteDetail">
                  <tab-lists :data='item'></tab-lists>
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
            <div v-for="(item, index) in tabLists" :key="index">
              <div @click="toInfoDetail">
                <tab-lists :data='item'></tab-lists>
              </div>
            </div>
          </scroll-view>
        </div>
      </div>
      <!-- 页面下方提交按钮 -->
      <div class="submit-btn">
        <div class="add-person" v-if='isOwner'>
          <submit-btn btnText='添加住户' @submitClick='addHousePerson' isActive v-if='currentTab == 0'></submit-btn>
        </div>
        <div class="repair-btn">
          <submit-btn btnText='报修' @submitClick='applyRepair' isActive v-if='currentTab == 1'></submit-btn>
        </div>
        <div class="invite-btn" v-if='currentTab == 2'>
          <!-- 有邀请权限 -->
          <div v-if="hasInviteRole" class="hasInvite">
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
</template>

<script>
import auth from '@/components/auth'
import avatorImg from '@/components/avatorImg'
import arrowBtn from '@/components/arrowBtn'
import submitBtn from '@/components/submitBtn'
import tabLists from '@/components/tabLists'
import { getOwnerData } from '../../api/index'
import { getSetting, getUserInfo, getUserOpenId, setStorageSync, getStorageSync } from '../../api/wechat'
export default {
  components: { auth, avatorImg, arrowBtn, submitBtn, tabLists },
  mounted () {
    this.init()
    if (!this.isOwner) {
      this.currentTab = 1
      this.role = '业主'
    }
  },
  data () {
    return {
      // 是否授权
      isAuth: false,
      // 是否是户主
      isOwner: true,
      role: '户主',
      // 是否具有邀请权限
      hasInviteRole: true,
      bgImg: '../../static/images/bg.png',
      avator: '../../static/images/user1.png',
      infoImg: '../../static/images/info.png',
      infoText: '小区2020年度物业收取通知小区2020年度物业收取通知',
      currentTab: 0,
      female: '../../static/images/female.png',
      male: '../../static/images/male.png',
      personList: [
        {
          id: 0,
          avator: '../../static/images/user1.png',
          personName: '赵小磊',
          personSex: 0,
          personRole: '业主',
          telephone: '13898929333'
        },
        {
          id: 1,
          avator: '../../static/images/user1.png',
          personName: '赵小丫',
          personSex: 1,
          personRole: '3001',
          telephone: '13898929333'
        },
        {
          id: 2,
          avator: '../../static/images/user1.png',
          personName: '赵小磊',
          personSex: 0,
          personRole: '业主',
          telephone: '13898929333'
        },
        {
          id: 3,
          avator: '../../static/images/user1.png',
          personName: '赵小丫',
          personSex: 1,
          personRole: '3001',
          telephone: '13898929333'
        }, {
          id: 4,
          avator: '../../static/images/user1.png',
          personName: '赵小磊',
          personSex: 0,
          personRole: '业主',
          telephone: '13898929333'
        },
        {
          id: 5,
          avator: '../../static/images/user1.png',
          personName: '赵小丫',
          personSex: 1,
          personRole: '3001',
          telephone: '13898929333'
        }
      ],
      // 报修数据
      tabLists: [
        {
          infoMsg: '路灯坏了路灯坏了路灯坏了路灯坏了路灯坏了',
          repairType: '公共设施',
          time: '2020',
          replyState: '已回复'
        },
        {
          infoMsg: '路灯坏了',
          repairType: '公共设施',
          time: '2020',
          replyState: '0'
        },
        {
          infoMsg: '路灯坏了',
          repairType: '公共设施',
          time: '',
          replyState: '0'
        }, {
          infoMsg: '路灯1212坏了',
          repairType: '公共设施',
          time: '',
          replyState: '0'
        }, {
          infoMsg: '路灯212坏了',
          repairType: '公共设施',
          time: '2020',
          replyState: '0'
        },
        {
          infoMsg: '路灯11坏了',
          repairType: '公共设施',
          time: '',
          replyState: '0'
        }, {
          infoMsg: '路灯12坏了',
          repairType: '公共设施',
          time: '2021qq',
          replyState: '0'
        }, {
          infoMsg: '路灯21坏了',
          repairType: '公共设施',
          time: '2020',
          replyState: '0'
        },
        {
          infoMsg: '路灯21坏了',
          repairType: '公共设施',
          time: '',
          replyState: '0'
        }, {
          infoMsg: '路灯aa坏了',
          repairType: '公共设施',
          time: '2021',
          replyState: '0'
        }
      ]
    }
  },
  methods: {
    init () {
      // 授权成功后获再取用户信息
      this.getSetting()
    },
    //  获取用户配置
    getSetting () {
      // 传递参数 userInfo 验证是否
      getSetting('userInfo',
        () => {
          this.isAuth = true
          // showLoading('正在加载')
          this.getUserInfo()
          console.log('授权成功')
        },
        () => {
          // 未获取授权
          this.isAuth = false
          console.log('授权失败')
        })
    },
    // 获取用户信息
    getUserInfo () {
      // 定义 onOpenIdComplete 为一个函数, 作为 getUserOpenId 的回调函数
      const onOpenIdComplete = (openId, userInfo) => {

      }
      getUserInfo(
        (userInfo) => {
          console.log(userInfo)
          setStorageSync('userInfo', userInfo)
          const openId = getStorageSync('openId')
          console.log('openId:', openId)
          if (!openId && openId.length === 0) {
            // openId 从 getUserOpenId 请求中获取
            // openId 传给回调函数 onOpenIdComplete
            getUserOpenId(openId => onOpenIdComplete(openId, userInfo))
            console.log('请求openId')
          } else {
            onOpenIdComplete(openId, userInfo)
            console.log('已获得openId')
          }
          console.log(userInfo)
        },
        () => {
          console.log('获取用户信息失败')
        })
    },
    // 点击"授权登录"按钮, 初始化用户授权信息, 判断用户是否授权

    // 切换 tab 标签
    tabClick (e) {
      this.currentTab = e.currentTarget.dataset.id
      // this.btnText = ''
      console.log(e)
      console.log(this.currentTab)
    },
    // 跳转至个人信息页面
    toPersonMsg () {
      getOwnerData()
        .then(res => {
          console.log(res)
        })
        .catch(() => {
          console.log('请求失败')
        })
      this.$router.push('../../pages/owner/main')
      console.log('去户主个人信息界面')
    },
    // 跳转至住户界面
    toHouseHold (e) {
      this.$router.push('../../pages/houseHold/main')
      console.log(e)
    },
    // 跳转至添加住户界面
    addHousePerson () {
      this.$router.push('../../pages/addPerson/main')
    },
    // 报修详情页面
    toRepairDetail () {
      this.$router.push('../../pages/repairDetail/main')
      console.log('去报修详情页')
    },
    // 跳转至新增报修界面
    applyRepair () {
      console.log('去报修页')
      this.$router.push('../../pages/repairApply/main')
    },
    // 跳转至邀请人员界面
    invitePerson () {
      console.log('邀请人员')
      this.$router.push('../../pages/invitePerson/main')
    },
    // 查看邀请的人员信息
    toInviteDetail () {
      console.log('查看邀请的详情')
      this.$router.push('../../pages/inviteDetail/main')
    },
    // 跳转至通知详情页面
    toInfoDetail () {
      console.log('查看通知详情')
      this.$router.push('../../pages/infoDetail/main')
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
  background: rgba(255, 255, 255, 1);
  img {
    width: 100%;
    height: 109px;
    position: absolute;
  }
  .nav-bar {
    height: 64px;
  }
  // 用户信息样式
  .user-container {
    width: 100%;
    height: 109px;
    display: flex;
    flex-direction: row;
    position: relative;
    // padding-bottom: 23px;
    .user-avator {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 51px;
      height: 51px;
      margin-top: 34px;
      margin-left: 15px;
      margin-right: 11.5px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      z-index: 99;
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
      .user-address {
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
    }
  }
  // 通知样式
  .info-tabs-container {
    width: 100%;
    height: 92px;
    background: rgba(102, 125, 250, 1);
    opacity: 0.8;
    // z-index: 199;
    .info {
      height: 36px;
      display: flex;
      flex-direction: row;
      position: relative;
      .info-icon {
        width: 32.5px;
        height: 12px;
        position: absolute;
        top: 12px;
        left: 15px;
      }
      .info-text {
        width: 70%;
        font-size: 13px;
        color: rgba(255, 255, 255, 1);
        line-height: 35px;
        margin-left: 56.5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .tabs {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-content: center;
      height: 35px;
      background: rgba(255, 255, 255, 1);
      border-radius: 15px 15px 0px 0px;
      padding-top: 22.5px;
      z-index: 99;
    }
    .tab {
      display: flex;
      width: 30px;
      height: 20px;
      color: rgba(51, 51, 51, 1);
      font-size: 14px;
      justify-content: center;
      padding-bottom: 6.5px;
    }
    .select {
      border-bottom: 3px solid rgba(102, 125, 250, 1);
      color: rgba(102, 125, 250, 1);
    }
  }
  // 页面主体样式
  .main-container {
    height: calc(100% - 265px);
    position: relative;
    .main-content {
      height: calc(100% - 90px);
      // height: 100%;
      position: relative;
      background: rgba(255, 255, 255, 1);
      margin: 14px 15px 1px 15px;
      overflow: hidden;
      .scroll-container {
        height: 100%;
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
              .hz {
                background: rgba(255, 236, 203, 1);
                color: rgba(158, 87, 25, 1);
              }
              .wy {
                background: rgba(223, 245, 236, 1);
                color: rgba(7, 132, 81, 1);
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
      .notInviteRole {
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
    // 添加用户按钮样式
    .submit-btn {
      width: 100%;
      position: absolute;
      bottom: 0;
    }
  }
  .height-1px {
    height: calc(100% - 1px);
  }
}
</style>
