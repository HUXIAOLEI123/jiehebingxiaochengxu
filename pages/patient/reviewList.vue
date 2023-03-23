<template>
  <div>
    <div id="head">
      <sysHead text="复查记录" showBack slot="top"></sysHead>
      <div style="height: 20px" slot="top"></div>
      <div class="search" slot="top">
        <div class="flex">
          <div class="LH35">开始时间:</div>
          <sysDatetimePicker v-model="startTime" mode="date" @input="searchList" class="ml20 w70"></sysDatetimePicker>
        </div>
        <div class="flex mt10">
          <div class="LH35">结束时间:</div>
          <sysDatetimePicker v-model="endTime" mode="date" @input="searchList" class="ml20 w70"></sysDatetimePicker>
        </div>
      </div>
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
        <div v-for="item of tableList" :key="item.InspectApplicationId" class="item">
          <div class="row">
            <div class="cGray">结果时间:</div>
            <div class="c252D57">{{ item.InspectResultTime || '' }}</div>
          </div>
          <div class="row">
            <div class="cGray">检查项目:</div>
            <div class="c252D57">{{ item.ApplicationItemName || '' }}</div>
          </div>
          <div class="row">
            <div class="cGray">检查结果:</div>
            <div class="cRed" v-if="item.InspectResult == '异常'">{{ item.InspectResult }}</div>
            <div class="c15C489" v-if="item.InspectResult == '正常'">{{ item.InspectResult }}</div>
          </div>
          <div class="detail" @click="lookDetail(item)" v-if="item.FileRelationGuid">
            <img src="@/assets/detail.png" class="icon" />
            <div class="c006AEC">查看详细报告</div>
          </div>
        </div>
        <u-empty mode="list" text="暂无数据" :icon="noData" marginTop="100" v-if="tableList.length == 0"></u-empty>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import { inspectrecord } from "@/api/patient.js"
export default {
  data () {
    return {
      startTime: "",
      endTime: "",
      DiagnosisId: "",
    };
  },
  onLoad (param) {
    if (param.DiagnosisId) {
      this.DiagnosisId = param.DiagnosisId
      this.getList()
    }
  },
  methods: {
    //查看报告
    lookDetail (item) {
      uni.navigateTo({
        url: "/pages/patient/reviewDetail?FileRelationGuid=" + item.FileRelationGuid
      });
    },
    searchList () {
      this.pageNo = 1;
      this.tableList = [];
      this.getList()
    },
    async getList (pageNo, pageSize) {
      var param = {
        DiagnosisId: this.DiagnosisId,
        SubmitTimes: [],
        PageNumber: this.pageNo,
        PageSize: this.pageSize,
        ApplicationType: "2",// ApplicationType 2 复查 1 常规检查
      }
      if (this.startTime && !this.endTime) {
        param.SubmitTimes = [this.startTime + ' 00:00:00', this.$util.getTime('', 'yyyyMMddHHmm')]
      }
      if (!this.startTime && this.endTime) {
        param.SubmitTimes = ['1990-01-01 00:00:00', this.endTime + ' 23:59:59']
      }
      if (this.startTime && this.endTime) {
        param.SubmitTimes = [this.startTime + ' 00:00:00', this.endTime + ' 23:59:59']
      }
      let res = await inspectrecord(param);
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
  padding: 0px 13px;
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
    }
  }
}
.search {
  background: #fff;
  padding: 8px 12px 18px 12px;
  margin-top: 8px;
}
</style>
