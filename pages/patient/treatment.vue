<template>
  <div>
    <div class="head" v-if="list.length === 1">
      <div class="text">治疗卡</div>
    </div>
    <div class="head" v-else>
      <u-tabs :list="list" @click="click" class="tabs mt10" :lineWidth="80" :activeStyle="activeStyle"></u-tabs>
    </div>
    <div class="division"></div>
    <div style="overflow: hidden">
      <div class="main">
        <div class="card">
          <div class="patientName">
            <div>
              <span>{{ fomrData.Name }}</span>
              <span class="age">{{ fomrData.Age }}岁</span>
            </div>
            <div class="sex">{{ fomrData.SexName }}</div>
          </div>
          <div class="row">
            <div class="label">紧急联系人:</div>
            <div class="value">{{ fomrData.ContactName }}</div>
          </div>
          <div class="row">
            <div class="label">联系电话:</div>
            <div class="value">{{ fomrData.ContactPhone }}</div>
          </div>
          <div class="row">
            <div class="label address">详细住址:</div>
            <div class="value">{{ fomrData.Address }}</div>
          </div>
        </div>
        <div class="card">
          <div class="patientName">治疗卡信息</div>
          <div class="row">
            <div class="label">诊断:</div>
            <div class="value">{{ selectList.DiagnosisTypeName }}</div>
          </div>
          <div class="row">
            <div class="label">开始治疗时间:</div>
            <div class="value">{{ selectList.TreatmentStartDate | formmatDate }}</div>
          </div>
          <div class="row">
            <div class="label">预计结束治疗时间:</div>
            <div class="value">{{ selectList.EndTreatmentTime | formmatDate }}</div>
          </div>
          <div class="row">
            <div class="label">治疗方案:</div>
            <div class="value">{{ selectList.TreatmentPlanName }}</div>
          </div>
          <div class="row">
            <div class="label">应服药天数:</div>
            <div class="value">{{ selectList.ShouldTakeMedicineDays }}天</div>
          </div>
          <div class="row">
            <div class="label">已服药天数:</div>
            <div class="value">{{ selectList.ActualTakeMedicineDays }}天</div>
          </div>
          <div class="row">
            <div class="label">服药记录:</div>
            <div class="look" @click="gotoDrugDrinkingRecord">查看</div>
          </div>
          <div class="row">
            <div class="label">不良反应记录:</div>
            <div class="look" @click="gotoFallillRecordList">查看</div>
          </div>
          <div class="row">
            <div class="label">中断服药记录:</div>
            <div class="look" @click="gotoInterruoList">查看</div>
          </div>
          <div class="row">
            <div class="label">检查记录:</div>
            <div class="look" @click="gotoLookList">查看</div>
          </div>
          <div class="row">
            <div class="label">复查记录:</div>
            <div class="look" @click="gotoReviewList">查看</div>
          </div>
          <div class="row">
            <div class="label">随访记录:</div>
            <div class="look" @click="gotoFollowup">查看</div>
          </div>
        </div>
      </div>
    </div>
    <tabber />
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeStyle: {
        color: "#006AEC"
      },
      list: [],
      selectList: {
        DiagnosisTypeName: "",
        RegisterTime: "",
        EndTreatmentTime: "",
        TreatmentPlanName: "",
        ShouldTakeMedicineDays: "",
        ActualTakeMedicineDays: "",
        DiagnosisId: "",
        IsClose: "",
      },
      fomrData: {
        Name: "",
        SexName: "",
        ContactName: "",
        ContactPhone: "",
        Address: "",
      }
    };
  },
  filters: {
    formmatDate (val) {
      if (val) {
        return val.slice(0, 10)
      }
    }
  },
  created () {
    let res = this.$storage.getStorage("patientInfo")
    let arr = res.TreatmentCardInfoDtos;
    arr.map((i) => i.name = i.TreatmentPlanName)
    this.list = arr;
    this.fomrData = Object.assign(this.fomrData, res);
    this.fomrData = this.$util.formatObj(this.fomrData)
    this.selectList = Object.assign(this.selectList, arr[0])
  },
  methods: {
    click (item) {
      this.selectList = Object.assign(this.selectList, item)
    },
    //服药记录
    gotoDrugDrinkingRecord () {
      uni.navigateTo({
        url: "/pages/patient/drugDrinkingRecord?DiagnosisId=" + this.selectList.DiagnosisId
      })
    },
    //随访记录
    gotoFollowup () {
      uni.navigateTo({
        url: "/pages/patient/followup?DiagnosisId=" + this.selectList.DiagnosisId
      })
    },
    //不良反应记录
    gotoFallillRecordList () {
      uni.navigateTo({
        url: "/pages/patient/fallillRecordList?DiagnosisId=" + this.selectList.DiagnosisId
      })
    },
    //中断服药记录
    gotoInterruoList () {
      uni.navigateTo({
        url: "/pages/patient/interruptList?DiagnosisId=" + this.selectList.DiagnosisId
      })
    },
    //检查记录
    gotoLookList () {
      uni.navigateTo({
        url: "/pages/patient/lookList?DiagnosisId=" + this.selectList.DiagnosisId
      })
    },
    //复查记录
    gotoReviewList () {
      uni.navigateTo({
        url: "/pages/patient/reviewList?DiagnosisId=" + this.selectList.DiagnosisId
      })
    },

  },
};
</script>
<style lang="scss" scoped>

::v-deep {
  .u-tabs__wrapper__nav__item__text {
    font-size: 18px !important;
  }
  .u-tabs__wrapper {
    width: 100vw !important;
    display: flex;
    flex-direction: column !important;
    justify-content: space-around !important;
  }
}

.division{
  height: 6px;
  width: 100%;
  margin-top: 10px;
  background: #f2f2f2;
}
.head {
  font-size: 18px;
  text-align: center;
  line-height: 64px;
  color: #222222;
  height: 64px;
  padding-top: 40px;
  display: flex;
  background: #ffffff;
  .text {
    text-align: center;
    width: 100vw;
  }
  .tabs {
    font-size: 18px !important;
  }
}
.main {
  height: calc(100vh - 140px);
  overflow: auto;
}
.submit {
  width: 90%;
  margin-left: 5%;
  margin-top: 24px;
  background: #006aec;
  border-radius: 4px;
  text-align: center;
  line-height: 44px;
  font-size: 15px;
  color: #ffffff;
}
.card {
  background: #fff;
  margin-top: 3px;
  padding: 17px;
  .patientName {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    color: #252d57;
    height: 50px;
    line-height: 35px;
    border-bottom: 1px solid #dddddd;
    .age {
      font-size: 14px;
      color: #006aec;
      line-height: 35px;
      padding: 3px 8px;
      border: 1px solid #006aec;
      border-radius: 2px;
      margin-left: 7px;
    }
    .sex {
      font-size: 17px;
      color: #666666;
      line-height: 35px;
      margin-right: 3px;
    }
  }
  .row {
    display: flex;
    justify-content: space-between;
    line-height: 35px;
    font-size: 17px;
    margin-bottom: 1px;
    .label {
      color: #666666;
      width: 160px !important;
    }
    .value {
      color: #252d57;
      word-wrap: break-word;
    }
    .look {
      color: #006aec;
    }
  }
  .label {
    color: #666666;
  }
  .input {
    margin-top: 15px;
  }
}
</style>
