<template>
  <div class="submit-btn">
    <button
      :class="['btn',isActive ? 'isActive' : 'unactive', isShadow ? 'isShadow' : '']"
      @click="submitClick" formType='submit'>{{btnText}}</button>
  </div>
</template>
<script>
export default {
  props: {
    btnText: '',
    isActive: {
      type: Boolean,
      default: false
    },
    isShadow: {
      type: Boolean,
      default: false
    },
    isLogin: {
      type: Boolean,
      default: true
    },
    formType: {
      type: String,
      default: 'submit'
    }
  },
  methods: {
    submitClick () {
      this.$emit('submitClick')
    }
  }
}
</script>
<style lang="scss" scoped>
.submit-btn {
  display: flex;
  align-items: center;
  height: 83px;
  margin-left: 37.5px;
  margin-right: 37.5px;
  .btn {
    position: relative;
    width: 100%;
    height: 45px;
    border-radius: 22.5px;
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    line-height: 45px;
  }
  .btn:active {
    top: 2px;
    box-shadow: 2px 2px 2px grey;
  }
  .isActive {
    background: rgba(102, 125, 250, 1);
  }
  .unactive {
    color: rgba(102, 125, 250, 1);
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(102, 125, 250, 1);
  }
  .isShadow {
    color: #fff;
    background: rgba(210, 215, 240, 1);
    border: none;
  }
}
</style>