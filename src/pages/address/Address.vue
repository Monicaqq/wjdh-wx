<template>
  <div class="address-container">
    <div class="showAddress">
      <nav-bar navTitle='云上物业' @clickLeft='goBack'></nav-bar>
      <!-- 地址列表 -->
      <div class="address-list">
        <div class="margin15">
          <div class="address-item" v-for='(item, index ) in rooms' :key='index' @click="chooseRoom(index)">
            <!-- 单个地址展示 -->
            <div :class="['personRegion', item.isHouseholder == 1 ? 'hz' : 'zh']">
              <span>{{item.isHouseholder == 1 ? '户主' : '租户'}}</span>
            </div>
            <!-- 地址对应人员类型 -->
            <!-- 地址 -->
            <div class="address-txt">
              {{item.roomFullName}}
            </div>
            <div class="choose" v-if='currentId === index'>
              <img :src="chooseImg">
            </div>
            <div class="border1px"></div>
          </div>
        </div>
      </div>
      <!-- 底部邀请码按钮 -->
      <div class="btn">
        <button @click="inviteCodeAdd">
          <img :src="addIcon">
          <span>邀请码添加</span>
        </button>
      </div>
    </div>
    <!-- 邀请码添加弹出页 -->
    <div class="modal-mask" v-if="showModal" @click="hideModal"></div>
    <div class="modal">
      <div class="modal-content" v-if="showModal">
        <img :src="codeImg">
        <div class="modal-body">
          <div class="code-input">
            <input type="text" placeholder="请输入邀请码" v-model="inviteCode">
            <div class="error-txt">{{errorInfo}}</div>
          </div>
          <div class="modal-btn">
            <div class="confirm" @click="confirm">
              确定
            </div>
            <div class="cancel" @click='cancel'>
              取消
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from '@/components/navBar'
import { getStorageSync, setStorageSync, showToast } from '../../api/wechat'
import { checkCode } from '../../api/index'
export default {
  components: { navBar },
  mounted () {
    const personMess = getStorageSync('personMess')
    this.rooms = personMess.rooms
  },
  data () {
    return {
      addIcon: '../../static/images/addIcon.png',
      chooseImg: '../../static/images/choose.png',
      codeImg: '../../static/images/codeImg.png',
      currentId: '',
      showModal: false,
      errorInfo: '',
      inviteCode: '',
      rooms: []
    }
  },
  methods: {
    // 选择户址
    chooseRoom (index) {
      // this.chooseFlag = true
      this.currentId = index
      setStorageSync('room', this.rooms[index])
      console.log('所选住址', this.rooms[index])
    },
    // 邀请码添加户址
    inviteCodeAdd () {
      this.showModal = true
    },
    // 隐藏Modal
    hideModal () {
      this.showModal = false
    },
    // 提交邀请码
    confirm (e) {
      console.log(e)
      let that = this
      if (this.inviteCode) {
        checkCode({
          'data': {
            'inviteCode': that.inviteCode
          }
        }).then(res => {
          const data = res.data
          console.log(data)
        })
      } else {
        showToast('请输入邀请码')
      }
    },
    cancel () {
      this.inviteCode = ''
      this.showModal = false
    },
    goBack () {
      this.$router.go(-1)
      // this.$router.push('../../pages/home/main')
    },
  },
}
</script>
<style lang="scss" scoped>
.address-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f6fa;
  .address-list {
    margin-top: 10px;
    box-sizing: border-box;
    background-color: #fff;
    .address-item {
      display: flex;
      flex-direction: row;
      position: relative;
      height: 49.5px;
      font-size: 13px;
      line-height: 49.5px;
      border-bottom: 0.5px solid rgba(238, 238, 238, 1);
      .personRegion {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-self: center;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 9px;
        font-size: 13px;
        span {
          align-self: center;
          padding-left: 2px;
          padding-right: 2px;
          // line-height: 30px;
        }
      }
      .hz {
        background: rgba(255, 218, 205, 1);
        color: rgba(184, 95, 64, 1);
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
    .choose {
      display: flex;
      position: absolute;
      height: 100%;
      right: 5px;
      align-items: center;
      img {
        width: 12px;
        height: 12px;
      }
    }
  }
  .margin15 {
    margin-left: 15px;
    margin-right: 15px;
  }
  .btn {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 45px;
    background-color: #fff;
    button {
      line-height: 45px;
      img {
        width: 12px;
        height: 12px;
        margin-right: 5px;
      }
      span {
        font-size: 16px;

        color: rgba(102, 125, 250, 1);
      }
    }
  }
  .modal {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .modal-mask {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 1);
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.5;
    overflow: hidden;
    z-index: 666;
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 225px;
    width: 285px;
    height: 245px;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    z-index: 888;
    img {
      width: 285px;
      height: 104.5px;
    }
    .modal-body {
      width: 100%;
      height: 100%;
      .code-input {
        margin-top: 22px;
        input {
          margin-left: 42.5px;
          padding-left: 7.5px;
          width: 200px;
          height: 40px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(230, 230, 230, 1);
          border-radius: 4px;
          font-size: 13px;
        }
        .error-txt {
          margin-top: 4.5px;
          margin-left: 50px;
          font-size: 12px;
          color: #ff6744;
        }
      }
      .modal-btn {
        display: flex;
        position: absolute;
        justify-content: space-around;
        bottom: 20px;
        margin-left: 21px;
        margin-right: 21px;
        text-align: center;
        font-size: 14px;
        .confirm {
          flex: 1;
          width: 100px;
          height: 35px;
          background: rgba(102, 125, 250, 1);
          border-radius: 5px;
          color: #ffffff;
          line-height: 35px;
          margin-right: 42px;
        }
        .cancel {
          flex: 1;
          width: 100px;
          height: 35px;
          background: rgba(247, 247, 247, 1);
          border-radius: 5px;
          line-height: 35px;
          color: #667dfa;
        }
      }
    }
  }
}
</style>
