<template>
  <div>
    <div class="doctor_head">
      <div class="doctor_info">
        <img :src="huanzhemorentouxiang" alt="" class="img" />
        <div class="ml15">
          <div class="F20 cWhite mt10">{{ patientInfo.Name }}</div>
          <div class="mt10 doctor_location">
            <img src="@/assets/pages/doctor/location.png" alt="" class="location_icon" />
            <div class="F13 cWhite LH15">{{ patientInfo.Address }}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div style="width: 80%; margin-left: 10%">
          <div class="row" @click="gotoDrugDrinkingRecord">
            <div style="display: flex">
              <img src="@/assets/pages/patient/fuyaojilu.png" alt="" class="icon" />
              <div class="F15 cGray text">服药记录</div>
            </div>
            <div class="F15 cGray text">></div>
          </div>
          <div class="row" @click="gotoLookList">
            <div style="display: flex">
              <img src="@/assets/pages/patient/jianchajilu.png" alt="" class="icon" />
              <div class="F15 cGray text">检查记录</div>
            </div>
            <div class="F15 cGray text">></div>
          </div>
          <div class="row" @click="gotoReviewList">
            <div style="display: flex">
              <img src="@/assets/pages/patient/fuchajilu.png" alt="" class="icon" />
              <div class="F15 cGray text">复查记录</div>
            </div>
            <div class="F15 cGray text">></div>
          </div>
          <div class="row" @click="gotoFallillRecordList">
            <div style="display: flex">
              <img src="@/assets/pages/patient/buliangfanying.png" alt="" class="icon" />
              <div class="F15 cGray text">不良反应记录</div>
            </div>
            <div class="F15 cGray text">></div>
          </div>
          <div class="row" @click="gotoInterruoList">
            <div style="display: flex">
              <img src="@/assets/pages/patient/zhongduanzhiliaojilu.png" alt="" class="icon" />
              <div class="F15 cGray text">中断服药记录</div>
            </div>
            <div class="F15 cGray text">></div>
          </div>
          <div class="row" @click="gotoFollowup">
            <div style="display: flex">
              <img src="@/assets/pages/patient/zhongduanzhiliaojilu.png" alt="" class="icon" />
              <div class="F15 cGray text">随访记录</div>
            </div>
            <div class="F15 cGray text">></div>
          </div>
          <div class="row" @click="contactDoctor">
            <div style="display: flex">
              <img src="@/assets/pages/patient/lianxiyisheng.png" alt="" class="icon" />
              <div class="F15 cGray text">联系医生</div>
            </div>
            <div class="F15 cGray text">></div>
          </div>
          <div class="row" @click="editPassword">
            <div style="display: flex">
              <img src="@/assets/pages/patient/lianxiyisheng.png" alt="" class="icon" />
              <div class="F15 cGray text">修改密码</div>
            </div>
            <div class="F15 cGray text">></div>
          </div>
        </div>
      </div>
      <div class="out" @click="goout">退出</div>
      <tabber />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      DiagnosisId: "",
      patientInfo: {
        Name: "",
        Address: "",
      },
    };
  },
  created () {
    let res = this.$storage.getStorage("patientInfo")
    this.DiagnosisId = res.CurrentDiagnosisId;
    this.patientInfo = res;
  },
  methods: {
    //服药记录
    gotoDrugDrinkingRecord () {
      uni.navigateTo({
        url: "/pages/patient/drugDrinkingRecord?DiagnosisId=" + this.DiagnosisId
      });
    },
    //不良反应记录
    gotoFallillRecordList () {
      uni.navigateTo({
        url: "/pages/patient/fallillRecordList?DiagnosisId=" + this.DiagnosisId
      });
    },
    //中断服药记录
    gotoInterruoList () {
      uni.navigateTo({
        url: "/pages/patient/interruptList?DiagnosisId=" + this.DiagnosisId
      });
    },
    //检查记录
    gotoLookList () {
      uni.navigateTo({
        url: "/pages/patient/lookList?DiagnosisId=" + this.DiagnosisId
      });
    },
    //随访记录
    gotoFollowup () {
      uni.navigateTo({
        url: "/pages/patient/followup?DiagnosisId=" + this.DiagnosisId
      })
    },
    //复查记录
    gotoReviewList () {
      uni.navigateTo({
        url: "/pages/patient/reviewList?DiagnosisId=" + this.DiagnosisId
      });
    },
    //退出登录
    goout () {
      this.$storage.removeStorage("userInfo");
      uni.redirectTo({
        url: "/pages/login/login",
      });
    },
    //联系医生
    contactDoctor () {
      // uni.navigateTo({
      //   url: "/pages/patient/contactDoctor",
      // });
      uni.navigateTo({
        url: "/pages/patient/messageList",
      });
    },
    //修改密码
    editPassword () {
      uni.navigateTo({
        url: "/pages/doctor/editPassword?type=patient",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.cAACFFC {
  color: #aacffc;
}
.out {
  width: 100%;
  margin-top: 28px;
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
    border-radius: 5px;
    background: #fff;
    padding-bottom: 58px;
    z-index: 9999;
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
