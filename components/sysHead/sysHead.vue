<template>
  <div>
    <div style="height: 80px; z-index: 99999!important">
      <div class="head" v-if="showBack">
        <img src="@/assets/pages/doctor/back.png" class="back" @click="back" />
        <div class="text">{{ text }}</div>
      </div>
      <div class="head" v-else>
        <div class="text_one">{{ text }}</div>
      </div>
    </div>
    <div class="division"></div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    showBack: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    back() {
      uni.navigateBack();
    },
  },
};
</script>
<style lang="scss" scoped>
.division{
  height: 6px;
  width: 100%;
  margin-top: 10px;
  background: #f2f2f2;
}
.head {
  font-size: 18px;
  text-align: center;
  line-height: 140px;
  color: #222222;
  height: 80px;
  z-index: 9999!important;
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  background: #ffffff;
  .back {
    width: 24px;
    height: 24px;
    padding: 60px 80px 80px 5px;
  
  }
  .text {
    text-align: center;
    width: calc(100vw - 200px);
  }
  .text_one {
    text-align: center;
    width: 100vw;
  }
}
</style>
