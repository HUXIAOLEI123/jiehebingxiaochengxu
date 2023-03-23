<template>
  <div>
    <div id="head">
      <sysHead text="不良反应记录" showBack slot="top"></sysHead>
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
        <div v-for="item of tableList" :key="item.index" class="item">
          <div class="row">
            <div class="cGray">反应时间:</div>
            <div class="c252D57">{{ item.SubmitTime }}</div>
          </div>
          <div class="row">
            <div class="cGray">不良反应:</div>
            <div class="c252D57">{{ item.AdverseReactionName || '' }}</div>
          </div>
          <div class="row">
            <div class="cGray">信息来源:</div>
            <div class="c252D57">{{ item.DataSources == 1 ? '患者录入' : '医生录入' }}</div>
          </div>
          <div class="row">
            <div class="cGray">其他不良反应:</div>
            <div class="c252D57">{{ item.AdverseReactionOther || '' }}</div>
          </div>
          <div class="row">
            <div class="cGray">不良反应处置方法:</div>
            <div class="c252D57">{{ item.ManagementMethod || '' }}</div>
          </div>
          <!-- <div class="row">
            <div class="cGray">处置结果:</div>
            <div class="c252D57">{{ item.ManagementMethod || '' }}</div>
          </div> -->
        </div>
        <u-empty mode="list" text="暂无数据" :icon="noData" marginTop="100" v-if="tableList.length == 0"></u-empty>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import { badreactionrecord } from "@/api/patient";
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
    }
  },
  onShow () {
    this.getList()
  },
  methods: {
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
      let res = await badreactionrecord(param);
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
  font-size: 18px;
  line-height: 35px;
  .item {
    padding: 21px;
    border-bottom: 1px solid #dddddd;
    font-size: 17px;
    line-height: 35px;
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
