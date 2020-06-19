<template>
  <div class="city-container">
    <!-- <nav-bar navTitle='车辆' @clickLeft='goBack'></nav-bar> -->
    <div class="nav-bar">
      <van-nav-bar title-class='nav-title' title="云上物业"></van-nav-bar>
    </div>
    <div class="city-mask"></div>
    <div class="city">
      <div class="city-content">
        <div class="city-title">地方选择</div>
        <div class="city-list">
          <div class="city-first" @click="chooseCity('1')">
            <div class="city-name">南 京</div>
            <img :src="fistCityChose" v-if="currentId === '1'">
            <img :src="fistCity" v-else>
            <div class="shadow"></div>
          </div>

          <div class="city-second" @click="chooseCity('2')">
            <div class="city-name">镇 江</div>
            <img :src="secondCityChose" v-if="currentId === '2'">
            <img :src="secondCity" v-else>
            <div class="shadow"></div>
          </div>
        </div>
        <div class="btn">
          <button @click="toHomePage" :disabled="!currentId"
            :style="{backgroundColor: currentId ? '' : '#6e6e6e'}">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from '@/components/navBar'
import { setStorageSync } from '@/api/wechat'
export default {
  components: { navBar },
  data () {
    return {
      fistCity: '../../static/images/nanjing1.png',
      fistCityChose: '../../static/images/nanjing2.png',
      secondCity: '../../static/images/zhenjiang1.png',
      secondCityChose: '../../static/images/zhenjiang2.png',
      currentId: null
    }
  },
  methods: {
    chooseCity (city) {
      this.currentId = city
    },
    toHomePage () {
      if (this.currentId) {
        let id = this.currentId
        let BASE_URL = null
        if (id === '1') {
          BASE_URL = process.env.URL_NJ
        } else {
          BASE_URL = process.env.URL_ZJ
        }
        setStorageSync('base_url', BASE_URL)
        this.$router.push('../../pages/home/main')
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.city-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .nav-bar {
    height: 64px;
  }
  .city-mask {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    position: fixed;
    width: 100%;
    // height: calc(100% - 64px);
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    // top: 64px;
    background: rgba(0, 0, 0, 0.3);
    z-index: 888;
  }
  .city {
    z-index: 999;
    position: relative;
    display: flex;
    justify-content: center;
    // width: 300px;
    height: 345px;
    margin-top: 82px;
    .city-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      width: 300px;
      height: 345px;
      background: rgba(255, 255, 255, 1);
      border-radius: 5px;
      .city-title {
        margin-top: 20px;
        margin-bottom: 18px;
        font-size: 16px;
      }
      .city-list {
        display: flex;
        flex-direction: column;
        padding-left: 15px;
        padding-right: 15px;
        .city-first {
          width: 270px;
          height: 75px;
          position: relative;
          border-radius: 5px;
          // .img {
          //   position: relative;
          // }
          img {
            width: 270px;
            height: 75px;
          }
        }
        .city-second {
          margin-top: 20px;
          width: 270px;
          height: 75px;
          position: relative;
          border-radius: 5px;
          img {
            width: 270px;
            height: 75px;
          }
        }
        .city-name {
          position: absolute;
          font-size: 26px;
          font-weight: bold;
          color: #fff;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 99;
        }
        .shadow {
          width: 100%;
          height: 100%;
          background: rgba(11, 18, 58, 1);
          opacity: 0.3;
          border-radius: 5px;
          position: absolute;
          top: 0;
          overflow: hidden;
          z-index: 9;
        }
      }

      .btn {
        position: absolute;
        bottom: 15px;
        button {
          width: 270px;
          height: 45px;
          background: rgba(102, 125, 250, 1);
          border-radius: 5px;
          font-size: 14px;
          color: #fff;
          line-height: 45px;
        }
        :active {
          top: 2px;
          box-shadow: 2px 2px 2px grey;
        }
      }
    }
  }
}
</style>