<template>
  <div></div>
</template>

<script>
import Storag from '@/common/storage';
import { getRefreshToken } from "@/api/login.js"
export default {
  data () {
    return {};
  },
  created () {
    this.refreshToken()
  },
  methods: {
    //更换token
    async refreshToken () {
      let userInfo = Storag.getStorage('userInfo');
      if (!userInfo) {
        return uni.redirectTo({
          url: "/pages/login/login",
        });

      }
      let res = await getRefreshToken(userInfo.token);
      let obj = Object.assign(userInfo, res.Response)
      this.$storage.setStorage('userInfo', obj);
      this.getGotoPage();
    },
    getGotoPage () {
      let userInfo = this.$storage.getStorage("userInfo");
      if (userInfo) {
        if (userInfo.utype == "1") {
          uni.redirectTo({
            url: "/pages/doctor/index",
          });
        } else if (userInfo.utype == "2") {
          uni.redirectTo({
            url: "/pages/patient/index",
          });
        }
      } else {
        uni.redirectTo({
          url: "/pages/login/login",
        });
      }
    },
  },
};
</script>
