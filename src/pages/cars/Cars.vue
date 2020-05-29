<template>
  <!-- 手机号页面 -->
  <div class="cars-container">
    <nav-bar navTitle='车辆'></nav-bar>
    <!-- 车牌列表 -->
    <div class="cars-list" v-for="(item, index) in carsList" :key="index">
      <div class="car-msg">
        <div class="car-type">{{item.carType}}</div>
        <div class="choose-icon">
          <div class="triangle"></div>
        </div>
        <div class="car-number">{{item.carNum}}</div>
      </div>
    </div>
    <!-- 添加车辆输入框 -->
    <div class="cars-input">
      <div class="car-msg">
        <!-- 选择车辆类型, 默认列表第一个 -->
        <div class="car-type" @click="chooseCarType">
          <input type="text" v-model="carType">
        </div>
        <!-- 点击图标, 展示所有类型, 供选择 -->
        <div class="choose-icon">
          <div class="triangle"></div>
        </div>
        <!-- 车辆输入框 -->
        <div class="car-number">
          <input type="text" placeholder="请输入车辆" v-model="newCarObj.carNum" @input="inputCarNum" maxlength="8"
            confirm-type="done" @confirm='onConfirm' @change='onChange' @blur="onBlur">
          <div class="err" v-if="carNumErrFlag"><span>{{carNumErrMsg}}</span></div>
        </div>
      </div>
    </div>
    <!-- 添加车辆提交按钮 -->
    <div class="car-commit">
      <submit-btn btnText='增加车辆' @submitClick='submitCarMsg' isActive></submit-btn>
    </div>
  </div>
</template>
<script>
import submitBtn from '@/components/submitBtn'
import { isCarNum, carNumFormat } from '../../utils/index'
import navBar from '@/components/navBar'
export default {
  components: { submitBtn, navBar },
  mounted () {
    Object.assign(this.$data, this.$options.data())
  },
  data () {
    return {
      carType: '普通乘用车',
      carsList:
        [
          // {
          //   carType: '普通乘用车',
          //   carNum: '苏A12345'
          // },
          // {
          //   carType: '货车',
          //   carNum: '苏A54321'
          // }
        ],
      newCarObj: {},
      addCarFlag: false,
      carNumErrFlag: false,
      carNumErrMsg: ''
    }
  },
  methods: {
    // 返回上一页
    onClickLeft () {
      this.$router.go(-1)
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
      this.newCarObj.carNum = e.mp.detail.value
      const carResult = isCarNum(this.newCarObj.carNum)
      if (!carResult) {
        that.newCarObj.carNum = carNumFormat(that.newCarObj.carNum)
        that.newCarObj['carType'] = that.carType
        that.carsList.push(that.newCarObj)
        that.carType = '普通乘用车'
        that.newCarObj = {}
        console.log(that.carsList)
      } else {
        that.carNumErrMsg = carResult
        that.carNumErrFlag = true
      }
      this.newCarObj.carNum = ''
    },
    // 选择车辆类型
    chooseCarType (res) {
      let that = this
      wx.showActionSheet({
        itemList: ['普通乘用车', '大货车'],
        success (res) {
          if (res.tapIndex === 0) {
            that.carType = '普通乘用车'
          } else {
            that.carType = '大货车'
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
      if (this.carType && this.carNum && !this.carNumErrFlag) {
        console.log('提交车辆')
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