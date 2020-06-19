<template>
  <div class="nav-bar-container">
    <van-nav-bar custom-class='left-arrow' title-class='nav-title' :title="title" left-arrow @clickLeft="clickLeft">
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  mounted () {
    // console.log(this.title)
  },
  props: {
    // nav-bar 标题, 从父组件获取
    navTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      title: this.navTitle
    }
  },
  methods: {
    // 返回上一页
    clickLeft () {
      this.$emit('clickLeft')
      // this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.nav-bar-container {
  .left-arrow {
    .van-icon {
      padding: 5px;
      color: rgba(51, 51, 51, 1);
    }
  }
  .nav-title {
    font-family: PingFang SC;
    font-size: 19px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
}
</style>
