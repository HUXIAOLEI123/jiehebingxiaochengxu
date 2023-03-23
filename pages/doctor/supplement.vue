<template>
  <div>
    <div id="head">
      <sysHead text="服药补录" showBack slot="top"></sysHead>
      <div style="height: 20px" slot="top"></div>
      <div class="search" v-if="toDay !== '1'" slot="top">
        <div class="flex">
          <div class="LH35">开始时间:</div>
          <sysDatetimePicker v-model="startTime" mode="date" @input="searchList" class="ml20 w70"></sysDatetimePicker>
        </div>
        <div class="flex mt10">
          <div class="LH35">结束时间:</div>
          <sysDatetimePicker v-model="endTime" mode="date" @input="searchList" class="ml20 w70"></sysDatetimePicker>
        </div>
        <div class="flexC">
          <div class="btn" @click="submit">提交</div>
          <div class="btn" @click="selectAll">全选当页</div>
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
        <div v-for="(item, index) in tableList" class="item" :key="index">
          <div class="flexC" style="width: 100%">
            <div style="width: 100%">
              <div class="flexC">
                <div class="cGray">异常服药日期</div>
                <div class="c252D57">{{ item.AbnormalDate | formmatDate }}</div>
              </div>
              <div class="flexC">
                <div class="cGray">应服药次数</div>
                <div class="c252D57">{{ item.ShouldTakeMedicineTimes }}</div>
              </div>
              <div class="flexC">
                <div class="cGray">实际服药次数</div>
                <div class="c252D57">{{ item.ActualTakeMedicineTimes }}</div>
              </div>
            </div>
            <div class="checkbox">
              <checkbox-group @change="selectChecked($event, item)" class="ml20">
                <label>
                  <checkbox :value="item.AbnormalDate" :checked="item.checked" />
                </label>
              </checkbox-group>
            </div>
          </div>
        </div>
        <u-empty mode="list" text="暂无数据" :icon="noData" marginTop="100" v-if="tableList.length == 0"></u-empty>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import { pulmonarymedicinesMedicineabnormal, pulmonarymedicinesMedicinesupplement } from "@/api/doctor.js"
export default {
  data () {
    return {
      startTime: "",
      endTime: "",
      DiagnosisId: "",
      toDay: ""
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
      if (val) {
        return val.slice(0, 10)
      }
    }
  },
  methods: {
    searchList () {
      this.pageNo = 1;
      this.tableList = [];
      this.getList()
    },
    async submit () {
      let arr = [];
      this.tableList.forEach((i) => {
        if (i.checked) {
          arr.push(i.AbnormalDate)
        }
      })
      if (arr.length == 0) return uni.showToast({
        title: '未选择患者',
        icon: 'none',
        duration: 3000,
      });
      let param = {
        diagnosisId: this.DiagnosisId,
        Arr: arr
      }
      await pulmonarymedicinesMedicinesupplement(param)
      this.searchList()
    },
    //全选
    selectAll () {
      this.tableList.forEach((i) => {
        i.checked = true
      });
      this.$forceUpdate()
    },
    //选择
    selectChecked (e, item) {
      this.tableList.forEach((i) => {
        if (item.AbnormalDate !== i.AbnormalDate) return;
        if (e.detail.value.length > 0) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
      this.$forceUpdate()
    },
    async getList () {
      var param = {
        DiagnosisId: this.DiagnosisId,
        PageNumber: this.pageNo,
        PageSize: this.pageSize,
        SubmitTimes: []
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
      let res = await pulmonarymedicinesMedicineabnormal(param);
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
  .checkbox {
    width: 70px;
    line-height: 80px;
  }
  .item {
    padding: 21px 0px;
    border-bottom: 1px solid #dddddd;
    .icon {
      width: 141px;
      height: 141px;
    }
    .btn {
      width: 104px;
      height: 44px;
      background: #a0cfff;
      border-radius: 22px;
      text-align: center;
      font-size: 17px;
      color: #ffffff;
      line-height: 44px;
    }
  }
}
.search {
  background: #fff;
  padding: 8px 12px 18px 12px;
  margin-top: 8px;
  .btn {
    margin-top: 10px;
    width: 45%;
    height: 44px;
    background: #006aec;
    border-radius: 10px;
    text-align: center;
    font-size: 17px;
    color: #ffffff;
    line-height: 44px;
  }
}
</style>
