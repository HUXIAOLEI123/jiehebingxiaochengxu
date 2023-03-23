<template>
  <div>
    <!-- <img src="@/assets/headportrait.png" class="img" /> -->
    <div class="doctor_head">
      <div class="doctor_info">
        <img :src="huanzhemorentouxiang" class="img" />
        <div class="ml15">
          <div class="F20 cWhite mt10">{{ doctorInfo.RealName }}</div>
          <div class="mt10 doctor_location">
            <img src="@/assets/pages/doctor/location.png" alt="" class="location_icon" />
            <div class="F13 cWhite LH15">{{ doctorInfo.Address }}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div style="width: 80%; margin-left: 10%">
          <div class="row" @click="editPassword">
            <div style="display: flex">
              <img src="@/assets/pages/doctor/edituserpassword.png" alt="" class="icon" />
              <div class="F15 cGray text">修改密码</div>
            </div>
            <div class="F15 cGray text">></div>
          </div>
        </div>
      </div>
    </div>
    <div class="out" @click="goout">退出</div>
    <tabber />
  </div>
</template>

<script>
export default {
  data () {
    return {
      doctorInfo: {}
    };
  },
  created () {
    let res = this.$storage.getStorage("doctorInfo")
    this.doctorInfo = res;
  },
  methods: {
    //退出登录
    goout () {
      this.$storage.removeStorage("userInfo");
      uni.redirectTo({
        url: "/pages/login/login"
      })
    },
    //修改密码
    editPassword () {
      uni.navigateTo({
        url: "/pages/doctor/editPassword?type=doector"
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.cAACFFC {
  color: #aacffc;
}
.out {
  width: calc(100% -40px);
  margin: 20px;
  z-index: 99999;
  margin-top: 15vh;
  background: #006aec;
  border-radius: 4px;
  text-align: center;
  line-height: 44px;
  font-size: 15px;
  color: #ffffff;
}
.doctor_head {
  padding: 20px;
  height: 291px;
  background: #0074fe;
  .card {
    margin-top: 50px;
    width: 100%;
    height: 158px;
    border-radius: 5px;
    background: #fff;
    .row {
      padding: 19px 0px 10px 0px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e2e1e1;
    }
    .icon {
      width: 15px;
      height: 16px;
    }
    .text {
      margin-left: 3px;
      line-height: 15px;
    }
  }
  .doctor_info {
    display: flex;
    margin-top: 76px;
    .doctor_location {
      display: flex;
      .location_icon {
        width: 11px;
        height: 15px;
        margin-right: 5px;
      }
    }
    .img {
      width: 70px;
      height: 70px;
      border-radius: 35px;
    }
  }
}
</style>
