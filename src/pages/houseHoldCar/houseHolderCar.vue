<template>
  <!-- 手机号页面 -->
  <div class="cars-container">
    <nav-bar navTitle='车辆' @clickLeft='goBack'></nav-bar>
    <!-- <form @submit="submitCarMsg"> -->

    <!-- 车牌列表 -->
    <div class="cars-list" v-for="(item, index) in car" :key="index">
      <div class="car-msg">
        <div class="car-type">{{carVals[item.carType-1]}}</div>
        <div class="choose-icon">
          <div class="triangle"></div>
        </div>
        <div class="car-number">{{item.licensePlateNo}}</div>
      </div>
    </div>
    <!-- 添加车辆输入框 -->
    <div class="cars-input" v-if="isShowInput">
      <div class="car-msg">
        <!-- 选择车辆类型, 默认列表第一个 -->
        <div class="car-type" @click="chooseCarType">
          <input type="text" v-model="carTypeVal">
        </div>
        <!-- 点击图标, 展示所有类型, 供选择 -->
        <div class="choose-icon">
          <div class="triangle"></div>
        </div>
        <!-- 车辆输入框 -->
        <div class="car-number">
          <input type="text" placeholder="请输入车牌号" v-model="carObj.licensePlateNo" @input="inputCarNum" maxlength="9"
            confirm-type="done" @confirm='onConfirm' @change='onChange' @blur="onBlur">
          <!-- <div class="err" v-if="carNumErrFlag"><span>{{carNumErrMsg}}</span></div> -->
        </div>
      </div>
    </div>
    <!-- 增加 按钮 -->
    <div class="add-car-wrapper">
      <div class="add-car-btn" @click="showInput">
        <img :src="addCarIcon">
        <span>增加</span>
      </div>
    </div>
    <!-- 添加车辆提交按钮 -->
    <div class="car-commit">
      <submit-btn btnText='增加车辆' @submitClick='submitCarMsg' isActive></submit-btn>
    </div>
    <!-- </form> -->
  </div>
</template>
<script>
import submitBtn from '@/components/submitBtn'
import { isCarNum, carNumFormat } from '../../utils/index'
import { getStorageSync, showToast, setStorageSync } from '../../api/wechat'
import navBar from '@/components/navBar'
export default {
  components: { submitBtn, navBar },
  mounted () {
    Object.assign(this.$data, this.$options.data())
    if (this.$route.query.item) {
      this.car = JSON.parse(this.$route.query.item)
    }
    if (getStorageSync('car')) {
      this.car = getStorageSync('car')
    }
  },
  inject: ['reload'],
  data () {
    return {
      personMess: {},
      personId: '',
      isHouseholder: '',
      carTypeVal: '轿车',
      carType: 1,
      carVals: ['轿车', '电车', '载货汽车', '客车', '挂车'],
      car: [],
      carObj: {
        'carType': 1,
        'licensePlateNo': '',
        'id': ''
      },
      isExist: false,
      addCarFlag: false,
      carNumErrFlag: false,
      carNumErrMsg: '',
      isShowInput: true,
      addCarIcon: '../../static/images/addCarIcon.png'
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 展示车辆输入输入框
    showInput () {
      this.isShowInput = true
    },
    // 增加car
    addCar () {
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
          that.carNumErrFlag = true
          that.car.push(that.carObj)
          that.carObj = {}
          that.carType = 1
          that.isShowInput = false
        } else {
          for (var carItem of that.car) {
            if (that.carObj.carType === carItem.carType && that.carObj.licensePlateNo === carItem.licensePlateNo) {
              showToast('您输入的车辆信息已存在')
              that.isExist = true
              return false
            } else {
              that.isExist = false
            }
          }
          if (!that.isExist) {
            that.car.push(that.carObj)
            console.log(that.car)
            that.carObj = {}
            that.carType = 1
            that.carNumErrFlag = true
            that.isShowInput = false
          }
        }
        // }
        // else {
        //   // 车牌号格式错误, 报错
        //   showToast(carResult)
        // }
      }
      console.log('addcar:', this.car)
    },
    // 监听车牌号输入框
    inputCarNum (e) {
      this.carNumErrMsg = ''
      // let filtered = e.target.value
      // if (this.phone !== filtered) {
      //   this.phone = filtered
      // }
    },
    // 输入框失去焦点, 验证车牌号, 验证成功后添加车辆
    onBlur (e) {
      let that = this
      this.carObj.licensePlateNo = e.mp.detail.value
      this.carObj.carType = this.carType
      let carResult = isCarNum(this.carObj.licensePlateNo)
      if (carResult) {
        that.carNumErrFlag = false
      } else {
        that.carObj.licensePlateNo = carNumFormat(that.carObj.licensePlateNo)
        that.carNumErrFlag = true
        // that.carTypeVal = '小汽车'
        that.addCar()
      }
    },
    // 选择车辆类型
    chooseCarType (res) {
      let that = this
      wx.showActionSheet({
        itemList: ['轿车', '电车', '载货汽车', '客车', '挂车'],
        success (res) {
          if (res.tapIndex === 0) {
            that.carTypeVal = '轿车'
            that.carType = 1
          } else if (res.tapIndex === 1) {
            that.carTypeVal = '电车'
            that.carType = 2
          } else if (res.tapIndex === 2) {
            that.carTypeVal = '载货汽车'
            that.carType = 3
          } else if (res.tapIndex === 3) {
            that.carTypeVal = '客车'
            that.carType = 4
          } else if (res.tapIndex === 4) {
            that.carTypeVal = '挂车'
            that.carType = 5
          }
        }
      })
    },
    // 对输入框关键字赋值
    setValue (v) {
      this.carNum = v
    },
    // 获取输入框的关键字
    getValue () {
      return this.carNum
    },
    // 增加车辆按钮
    submitCarMsg () {
      let that = this
      // 是住户,把车辆信息存至缓存,作为发送添加住户的请求
      if (this.car.length !== 0) {
        if (that.carNumErrFlag) {
          setStorageSync('car', that.car)
          this.$router.go(-1)
        }
      } else {
        showToast('请检查车牌号')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.cars-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba(255, 255, 255, 1);
  border-top: 0.5px solid #eee;
  .cars-list,
  .cars-input {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    margin-right: 15px;
    .car-msg {
      display: flex;
      flex-direction: row;
      position: relative;
      align-items: center;
      height: 44.5px;
      font-size: 14px;
      border-bottom: 0.5px solid #d2d7f0;
      .car-type {
        text-align: center;
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
          width: 80px;
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
  // 添加车辆样式
  .add-car-wrapper {
    position: relative;
    height: 30px;
    margin-left: 15px;
    margin-right: 15px;
    // background: rgba(245, 246, 252, 1);
    .add-car-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 5px;
      right: 23px;
      width: 45px;
      height: 18px;
      background: rgba(245, 246, 252, 1);
      border-radius: 9px;
      color: #667dfa;
      text-align: center;
      img {
        width: 7px;
        height: 7px;
        margin-right: 4px;
        vertical-align: middle;
      }
      span {
        font-size: 11px;
      }
    }
  }
  .car-commit {
    width: 100%;
    position: absolute;
    bottom: 0px;
  }
  // 车辆类型文本样式
}
</style>