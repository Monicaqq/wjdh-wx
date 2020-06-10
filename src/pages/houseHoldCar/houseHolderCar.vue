<template>
  <!-- 手机号页面 -->
  <div class="cars-container">
    <nav-bar navTitle='车辆' @clickLeft='goBack'></nav-bar>
    <!-- <form @submit="submitCarMsg"> -->

    <!-- 车牌列表 -->
    <div class="cars-list" v-for="(item, index) in car" :key="index">
      <div class="car-msg">
        <div class="car-type">{{item.carType === 1 ? '小汽车' : '大卡车'}}</div>
        <div class="choose-icon">
          <div class="triangle"></div>
        </div>
        <div class="car-number">{{item.licensePlateNo}}</div>
      </div>
    </div>
    <!-- 添加车辆输入框 -->
    <div class="cars-input">
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
          <input type="text" placeholder="请输入车辆" v-model="carObj.licensePlateNo" @input="inputCarNum" maxlength="8"
            confirm-type="done" @confirm='onConfirm' @change='onChange' @blur="onBlur">
          <!-- <div class="err" v-if="carNumErrFlag"><span>{{carNumErrMsg}}</span></div> -->
        </div>
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
import { getPersonMess, updateCar } from '../../api/index'
import navBar from '@/components/navBar'
export default {
  components: { submitBtn, navBar },
  mounted () {
    Object.assign(this.$data, this.$options.data())
    this.getCarData()
  },
  inject: ['reload'],
  data () {
    return {
      personMess: {},
      personId: '',
      isHouseholder: '',
      carTypeVal: '小汽车',
      carType: 1,
      // carList: [],
      car: [],
      carObj: {
        'carType': 1,
        'licensePlateNo': '',
        'id': ''
      },
      isExist: false,
      addCarFlag: false,
      carNumErrFlag: false,
      carNumErrMsg: ''
    }
  },
  methods: {
    goBack () {
      this.$router.push('../../pages/addPerson/main')
    },
    // 获取汽车数据
    getCarData () {
      // this.personMess = getStorageSync('personMess')
      // this.car = this.personMess.car
      // this.roomId = this.personMess.rooms[0].roomId
      // console.log(this.car)
    },
    // 增加car
    addCar () {
      var that = this
      // 未输入车牌号
      if (!this.carObj.licensePlateNo) {
        showToast('请输入车牌号')
      } else {
        // 已输入车牌号
        // var carResult = isCarNum(that.carObj.licensePlateNo)
        // 输入了正确的车牌号
        // if (!carResult) {
        if (that.car.length === 0) {
          that.carNumErrFlag = true
          that.car.push(that.carObj)
          that.carObj = {}
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
            that.carTypeVal = '小汽车'
            that.carType = 1
            that.carNumErrFlag = true
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
        showToast(carResult)
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
        itemList: ['小汽车', '大卡车'],
        success (res) {
          if (res.tapIndex === 0) {
            that.carTypeVal = '小汽车'
            that.carType = 1
          } else if (res.tapIndex === 1) {
            that.carTypeVal = '大卡车'
            that.carType = 2
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
          // setStorageSync('car', that.car)
          // this.$router.go(-1)
          this.$router.push({
            path: '../../pages/addPerson/main',
            query: { car: that.car }
          })
          console.log('提交车辆1')
        }
      } else {
        showToast('请检查车牌号是否正确')
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
  .car-commit {
    width: 100%;
    position: absolute;
    bottom: 0px;
  }
  // 车辆类型文本样式
}
</style>