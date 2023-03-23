<template>
  <view class="body">
    <u-tabbar :value="tabarIndex" @change="beforeSwitch" :safeAreaInsetBottom="false">
      <u-tabbar-item :text="item.text" v-for="item of tabarList" :key="item.pagePath">
        <img class="u-page__item__slot-icon" slot="inactive-icon" :src="item.iconPath" />
        <img class="u-page__item__slot-icon" slot="active-icon" :src="item.selectedIconPath" />
      </u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      tabarList: [],
      tabarIndex: 0,
    };
  },
  computed: {},
  onLoad () { },
  mounted () {
    this.getTbabar();
  },
  methods: {
    getTbabar () {
      let arr = this.$storage.getStorage("tabBar");
      this.tabarList = this.$storage.getStorage("userInfo").utype == "1" ? arr.doctor : arr.patient;
      // this.tabarIndex = this.$storage.getStorage("tabarIndex") || 0;
      //根据路由信息获取当前激活的是哪一个菜单
      let pages = getCurrentPages();
      var urlTest = "/" + pages[0].route;
      for (let i = 0; i < this.tabarList.length; i++) {
        if (this.tabarList[i].pagePath == urlTest) {
          this.tabarIndex = i;
        }
      }
    },
    beforeSwitch (index) {
      uni.redirectTo({
        url: this.tabarList[index].pagePath,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.u-page__item__slot-icon {
  width: 20px;
  height: 20px;
}
</style>
