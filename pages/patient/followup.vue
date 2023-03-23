<template>
  <div>
    <div id="head">
      <sysHead text="随访记录" showBack slot="top"></sysHead>
      <div style="height: 20px" slot="top"></div>
    </div>
    <scroll-view
      scroll-y="true"
      :style="scrollHeight"
      v-if="scrollHeight"
      refresher-enabled
      class="scroll-Y"
      :refresher-triggered="scrollStatus"
      @refresherrefresh="refresh"
      @scrolltolower="loadMore"
    >
      <div class="main">
        <div v-for="item of tableList" :key="item.VisitId" class="item">
          <div class="row">
            <div class="cblack">
              <span>随访日期:</span>
              <span>{{ item.VisitDate | formmatDate }}</span>
            </div>
          </div>
          <div class="row">
            <div class="cblack">
              <span>随访类型:</span>
              <span>{{ item.VisitType == '1' ? '首次随访' : '后续随访' }}</span>
            </div>
          </div>
          <div class="row">
            <div class="cblack">
              <span>随访人员:</span>
              <span>{{ item.VisitDoctorName }}</span>
            </div>
          </div>
          <div class="row">
            <div class="cblack">
              <span>随访方式:</span>
              <span>{{ item.VisitModeName }}</span>
            </div>
            <div class="detail">
              <div @click="edit(item)" class="mr10" v-if="$storage.getStorage('userInfo').utype == '1'">编辑</div>
              <div @click="detail(item)">查看详情</div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import { pulmonaryvisits } from "@/api/patient.js"
export default {
  data () {
    return {
      SubmitTimes: "",
      DiagnosisId: "",
    };
  },
  onLoad (param) {
    if (param.DiagnosisId) {
      this.DiagnosisId = param.DiagnosisId
      this.getList()
    }
  },
  filters: {
    formmatDate (val) {
      if (val) return val.slice(0, 16)
    }
  },
  methods: {
    detail (item) {
      if (item.VisitType == '1') {
        uni.navigateTo({
          url: "/pages/patient/followupFirstDetail?VisitId=" + item.VisitId
        });
      } else {
        uni.navigateTo({
          url: "/pages/patient/followupMoreDetail?VisitId=" + item.VisitId
        });
      }
    },
    edit (item) {
      if (item.VisitType == '1') {
        uni.navigateTo({
          url: "/pages/doctor/firstFollowup?VisitId=" + item.VisitId
        });
      } else {
        uni.navigateTo({
          url: "/pages/doctor/moreFollowup?VisitId=" + item.VisitId
        });
      }
    },
    async getList (pageNo, pageSize) {
      var new_Date = new Date(); //获取指定日期当周的一周日期
      var timesStamp = new_Date.toLocaleDateString().replaceAll("/", "-");
      var param = {
        DiagnosisId: this.DiagnosisId,
        SubmitTimes: [this.SubmitTimes || '', this.SubmitTimes ? timesStamp : ''],
        PageNumber: this.pageNo,
        PageSize: this.pageSize,
        ApplicationType: "2",// ApplicationType 2 复查 1 常规检查
      }
      let res = await pulmonaryvisits(param);
      this.tableList = this.tableList.concat(res.Response.items)
      this.scrollStatus = false;
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  margin-top: 6px;
  background: #fff;
  padding: 0px 0px;
  font-size: 17px;
  line-height: 35px;
  .item {
    padding: 21px;
    border-bottom: 1px solid #dddddd;
    .detail {
      display: flex;
      .icon {
        width: 20px;
        height: 20px;
        margin-top: 7.5px;
        margin-right: 8px;
      }
    }
    .row {
      display: flex;
      justify-content: space-between;
      .followupBtn {
        color: #0000bf;
        padding: 0px 5px;
        border: 1px solid #0000bf;
        border-radius: 2px;
      }
      .detail {
        color: #0000bf;
        font-size: 14px;
      }
    }
  }
}
.search {
  background: #fff;
  padding: 8px 12px 18px 12px;
  margin-top: 8px;
}
</style>
