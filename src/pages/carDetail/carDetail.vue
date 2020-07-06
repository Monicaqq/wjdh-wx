<template>
  <!-- 手机号页面 -->
  <div class="cars-container">
    <nav-bar navTitle='车辆' @clickLeft='goBack'></nav-bar>

    <!-- 车牌列表 -->
    <div v-if="car && car.length > 0">
      <div class="cars-list" v-for="(item, index) in car" :key="index">
        <div class="car-msg">
          <div class="car-type">{{carVals[item.carType-1]}}</div>
          <div class="choose-icon">
            <div class="triangle"></div>
          </div>
          <div class="car-number">{{item.licensePlateNo}}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="noCarDetail">
        <div>您无车辆信息</div>
      </div>
    </div>

    <!-- 添加车辆提交按钮 -->
    <div class="car-commit">
      <submit-btn btnText='增加车辆' isShadow></submit-btn>
    </div>

  </div>
</template>
<script>
import submitBtn from '@/components/submitBtn'
import { isCarNum, carNumFormat } from '../../utils/index'
import { getStorageSync, showToast, setStorageSync } from '../../api/wechat'
import navBar from '@/components/navBar'
const log = require('../../log')
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
  onShow () {
    log.info('hello test')
    log.warn('warn')
    log.error('error')
    log.setFilterMsg('filterkeyword')
    log.setFilterMsg('addfilterkeyword')
  },
  data () {
    return {
      personMess: {},
      personId: '',
      isHouseholder: '',
      carTypeVal: '轿车',
      carType: 1,
      carVals: ['轿车', '电车', '载货汽车', '客车', '挂车'],
      car: [],
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
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
  .noCarDetail {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    height: 100%;
    font-size: 14px;
    color: #333;
  }
  .car-commit {
    width: 100%;
    position: absolute;
    bottom: 0px;
  }
}
</style>