<template>
  <!-- 手机号页面 -->
  <div class="cars-container">
    <nav-bar navTitle='车辆'></nav-bar>
    <!-- 车牌列表 -->
    <div class="cars-list" v-for="(item, index) in carsList" :key="index">
      <div class="car-msg">
        <div class="car-type">{{item.carsType}}</div>
        <div class="choose-icon">
          <div class="triangle"></div>
        </div>
        <div class="car-number">{{item.carsNumber}}</div>
      </div>
    </div>
    <!-- 添加车辆输入框 -->
    <div class="cars-input">
      <div class="car-msg">
        <!-- 选择车辆类型, 默认列表第一个 -->
        <div class="car-type" @click="chooseCarType">{{carsType}}</div>
        <!-- 点击图标, 展示所有类型, 供选择 -->
        <div class="choose-icon">
          <div class="triangle"></div>
        </div>
        <!-- 车辆输入框 -->
        <div class="car-number">
          <input type="text" placeholder="请输入车辆" v-model="carNum" @input="inputCarNum" maxlength="8" confirm-type="done"
            @confirm='onConfirm' @change='onChange' @blur="onBlur">
          <div class="err" v-if="carNumErrFlag"><span>{{carNumErrMsg}}</span></div>
        </div>
      </div>
    </div>
    <!-- 添加车辆提交按钮 -->
    <div class="tel-commit">
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
      carsList:
        [
          {
            carsType: '普通乘用车',
            carsNumber: '苏A12345'
          },
          {
            carsType: '货车',
            carsNumber: '苏A54321'
          }
        ],
      carsType: '普通乘用车',
      addCarFlag: false,
      carNum: '',
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
    // 输入框失去焦点, 验证车牌号,
    onBlur (e) {
      this.carNum = e.mp.detail.value
      const carResult = isCarNum(this.carNum)
      if (carResult) {
        this.carNumErrMsg = carResult
        this.carNumErrFlag = true
      } else {
        this.carNum = carNumFormat(this.carNum)
      }
    },
    // 选择车辆类型
    chooseCarType (res) {
      let that = this
      wx.showActionSheet({
        itemList: ['普通乘用车', '大货车', '公用车'],
        success (res) {
          if (res.tapIndex === 0) {
            that.carsType = '普通乘用车'
          } else {
            that.carsType = '大货车'
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
      if (this.carsType && this.carNum && !this.carNumErrFlag) {
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
  .tel-commit {
    width: 100%;
    position: absolute;
    bottom: 0px;
  }
  // 车辆类型文本样式

  // 选择车辆类型的倒三角图标
  .choose-icon {
    // width: 12px;
    // height: 8px;
    margin-left: 14.5px;
    margin-right: 23px;
    position: relative;
    // background: rgba(100, 159, 246, 1);
    .triangle {
      width: 0px;
      height: 0px;
      position: absolute;
      top: -2px;
      border: 4px solid #649ff6;
      border-bottom-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
    }
  }
}
</style>