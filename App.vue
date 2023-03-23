<script>
import { mapMutations } from "vuex";
import checkUpdate from "@/uni_modules/uni-upgrade-center-app/utils/check-update";

export default {
  onLaunch: function () {
    // #ifdef APP-PLUS
    // App平台检测升级，服务端代码是通过uniCloud的云函数实现的，详情可参考：https://ext.dcloud.net.cn/plugin?id=4542
    if (plus.runtime.appid !== "HBuilder") {
      // 真机运行不需要检查更新，真机运行时appid固定为'HBuilder'，这是调试基座的appid
      checkUpdate();
    }

    // 一键登录预登陆，可以显著提高登录速度
    uni.preLogin({
      provider: "univerify",
      success: (res) => {
        // 成功
        this.setUniverifyErrorMsg();
        console.log("preLogin success: ", res);
      },
      fail: (res) => {
        this.setUniverifyLogin(false);
        this.setUniverifyErrorMsg(res.errMsg);
        // 失败
        console.log("preLogin fail res: ", res);
      },
    });
    // #endif
  },
  onShow: function () {},
  onHide: function () {},
  methods: {
    ...mapMutations(["setUniverifyErrorMsg", "setUniverifyLogin"]),
  },
};	
</script>


<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";

</style>
<style>
@import "./common/common.css";
/* #ifndef APP-PLUS-NVUE */
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import "./common/uni.css";
@import "@/static/customicons.css";
/* H5 兼容 pc 所需 */
/* #ifdef H5 */
@media screen and (min-width: 768px) {
  body {
    overflow-y: scroll;
  }
}
uni-page-head .uni-page-head__title{
  font-size: 18px !important;
}
uni-page-body {
  background-color: #f5f5f5 !important;
  min-height: 100% !important;
  height: auto !important;
}

.uni-top-window uni-tabbar .uni-tabbar {
  background-color: #fff !important;
}

.uni-app--showleftwindow .hideOnPc {
  display: none !important;
}

/* #endif */

</style>
