<template>
  <!-- 个人信息组件 -->
  <div class="person-msg-container">
    <div class="person-msg">
      <div class="title-label">
        个人信息
      </div>
      <!-- 个人信息列表 -->
      <div class="person-lists">
        <div class="person-photo borderB1px person-item">
          <span class="color333">照片</span>
          <div class="photo-right">
            <avator-img round :src='perPhoto'></avator-img>
            <div class="arrow-btn">
              <arrow-btn @arrowClick='addAvator' color='#9B9B9B'></arrow-btn>
            </div>
          </div>
        </div>
        <div class="person-name borderB1px person-item">
          <span class="color333">姓名</span>
          <span class="color666">王逸飞</span>
        </div>
        <div class="person-sex borderB1px person-item">
          <span class="color333">性别</span>
          <span class="color666">女</span>
        </div>
        <div class="person-IDcard borderB1px person-item">
          <span class="color333">身份证号</span>
          <span class="color666">321023192003330003</span>
        </div>
        <div class="person-tel person-item">
          <span class="color333">手机号</span>
          <div class="tel-right" @click="toTelView">
            <span class="color666">1983343433</span>
            <arrow-btn color='#9B9B9B'></arrow-btn>
          </div>
        </div>
      </div>
    </div>
    <!-- 住户信息 -->
    <div class="housePer-msg">
      <div class="title-label">
        住户信息
      </div>
      <!-- 住户信息列表 -->
      <div class="housePer-lists">
        <!-- 住址 -->
        <div class="person-tel borderB1px person-item" v-if='isPerson'>
          <span class="color333">住址</span>
          <div class="tel-right">
            <span class="color666">仙林悦城A区3栋2单元2012室</span>
            <arrow-btn @arrowClick='chooseAddress' color='#9B9B9B'></arrow-btn>
          </div>
        </div>
        <!-- 人员类型 -->
        <div class="person-tel borderB1px person-item">
          <span class="color333">人员类型</span>
          <div class="tel-right">
            <span class="color666">业主</span>
            <arrow-btn @arrowClick='choosePersonType' color='#9B9B9B'></arrow-btn>
          </div>
        </div>
        <!-- 车辆 -->
        <div class="person-tel person-item">
          <span class="color333">车辆</span>
          <div class="tel-right" @click="toCarView">
            <span class="color666">0</span>
            <arrow-btn color='#9B9B9B'></arrow-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import avatorImg from '@/components/avatorImg'
import arrowBtn from '@/components/arrowBtn'
export default {
  components: { avatorImg, arrowBtn },
  props: {
    personMsg: {},
    isPerson: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      perPhoto: '../../static/images/timg.jpg'
    }
  },
  methods: {
    // 跳转至手机号界面
    toTelView () {
      this.$router.push('../../pages/telphone/main')
    },
    // 点击 选择户址
    chooseAddress () {
      console.log('选择户址')
    },
    // 选择人员类型
    choosePersonType () {
      console.log('选择人员类型')
    },
    // 去车辆界面
    toCarView () {
      this.$router.push('../../pages/cars/main')
    }
  }
}
</script>
<style lang="scss" scoped>
.person-msg-container {
  width: 100%;
  .person-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 44.5px;
    line-height: 44.5px;
  }
  .color666 {
    color: #666666;
  }
  .color333 {
    color: #333;
  }
  .borderB1px {
    border-bottom: 0.5px solid #eee;
  }
  .person-tel {
    .tel-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      span {
        margin-right: 10px;
      }
    }
  }
  .title-label {
    height: 40px;
    margin-left: 15px;
    font-size: 12px;
    line-height: 40px;
    color: rgba(102, 102, 102, 1);
  }
  .person-lists {
    width: 100%;
    height: 240px;
    background: rgba(255, 255, 255, 1);
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    font-size: 14px;
    .person-photo {
      height: 59.5px;
      justify-content: space-between;
      line-height: 59.5px;
      .photo-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        .arrow-btn {
          margin-left: 12px;
        }
      }
    }
  }
  .housePer-lists {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
}
</style>