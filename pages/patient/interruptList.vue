<template>
  <div>
    <div id="head">
      <sysHead text="中断服药记录" showBack slot="top"></sysHead>
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
        <div v-for="item of tableList" :key="item.PersonId" class="item">
          <div class="flexC">
            <div class="cGray F17">中断服药时间:</div>
            <div class="c252D57 F15">{{ item.SubmitTime }}</div>
          </div>
          <!-- <div class="F17 c006AEC" v-if="item.IsManagement">已确认</div>
          <div class="F17 c8BBFFE" v-else>未确认</div> -->
        </div>
        <u-empty mode="list" text="暂无数据" :icon="noData" marginTop="100" v-if="tableList.length == 0"></u-empty>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import { pulmonaryinterrupts } from "@/api/patient.js"
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
      let res = await pulmonaryinterrupts(param);
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
  }
}
.search {
  background: #fff;
  padding: 8px 12px 18px 12px;
  margin-top: 8px;
}
</style>
