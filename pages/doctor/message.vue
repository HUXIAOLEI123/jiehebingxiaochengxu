<template>
  <div>
    <div id="head">
      <sysHead text="患者留言" slot="top"></sysHead>
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
      <div style="overflow: hidden">
        <div style="overflow: auto; height: 70vh">
          <div v-for="(item, index) in tableList" @click="selectPatient(item)" :key="index" class="patient_card">
            <div class="user_info">
              <div class="flex">
                <u-avatar shape="square"></u-avatar>
                <div class="user_name ml10">{{ item.PatientName }}</div>
              </div>
              <div class="F14 LH35">{{ item.LastMessageTime }}</div>
            </div>
            <div class="cGray F17 LH28 text">{{ item.LastMessage }}</div>
          </div>
          <u-empty mode="list" text="暂无数据" :icon="noData" marginTop="100" v-if="tableList.length == 0"></u-empty>
        </div>
      </div>
    </scroll-view>
    <tabber slot="bottom" />
  </div>
</template>

<script>
import { apimessages } from "@/api/doctor";
const searchList = [
  { label: '全部患者', key: '001', isActive: false },
  { label: '异常患者', key: '002', isActive: true },
  { label: '正常患者', key: '003', isActive: false },
]
export default {
  data () {
    return {
      searchList,
      tableList: [],
    }
  },
  onShow () {
    this.tableList = [];
    this.pageNo = 1;
    this.getList()
  },
  methods: {
    //选择患者，跳转与患者聊天页面
    selectPatient (item) {
      uni.navigateTo({
        url: "/pages/patient/contactDoctor?MainId=" + item.MainId + '&type=doctor&PatientName=' + item.PatientName
      });
    },
    //初始化地区数据
    async initRegions () {
      let res = await regionsCascade('360000000000');
      this.initList = res.Response.items;
    },
    async loadNode (item, resolve) {
      //获取到当前点击的id值
      let rgid = item.RegionCode;
      let res = await regionsCascade(rgid);
      resolve(res.Response.items); //调用回调
    },
    //选择区域事件
    itemOnclick (res) {
      if (res) {
        this.RegionCode = res.RegionCode
        this.RegionName = res.RegionName
      } else {
        this.RegionCode = ''
        this.RegionName = ''
      }
      this.getList()
    },
    //获取列表数据
    async getList (pageNo, pageSize) {
      var param = {
        Name: this.Name,
        RegionCode: this.RegionCode,
        IsNormal: this.IsNormal,
        PageNumber: this.pageNo,
        PageSize: this.pageSize,
      }
      let res = await apimessages(param);
      res.Response.items.forEach((i) => {
        i = this.$util.formatObj(i)
      })
      this.tableList = this.tableList.concat(res.Response.items)
      this.scrollStatus = false;
      this.$forceUpdate();
    },
    changPatientType (e) {
      let arr = this.searchList
      arr.forEach((i) => {
        i.isActive = false
        if (i.key == e.key) {
          e.isActive = true
        }
      })
      this.searchList = arr
    },
  },
}
</script>
<style lang="scss" scoped>
.head {
  font-size: 18px;
  text-align: center;
  line-height: 64px;
  color: #222222;
  height: 64px;
  background: #ffffff;
}
.search_head {
  margin-top: 10px;
  background: #ffffff;
  padding: 16px;
  .patient_type {
    display: flex;
    margin-top: 16px;
    justify-content: space-between;
    .active {
      color: #ffffff;
      font-size: 15px;
      background: #006aec;
      padding: 5px 10px;
      border-radius: 17px;
      text-align: center;
    }
    .noactive {
      color: #666666;
      font-size: 15px;
      padding: 5px 10px;
      background: #eef0f4;
      border-radius: 17px;
      text-align: center;
    }
  }
}
    .text{
      width: 100%!important;
      text-align: right!important;
    }
.patient_card {
  padding: 16px;
  background: #ffffff;
  box-shadow: 0px 3px 8px 0px rgba(61, 61, 62, 0.17);
  border-radius: 5px;
  margin-top: 6px;
  .row {
    display: flex;
    padding: 5px 10px;
    color: #252d57;
    justify-content: space-between;
  }
  .user_info {
    display: flex;
    justify-content: space-between;
    .user_name {
      color: #252d57;
      line-height: 35px;
      font-size: 20px;
    }
    .toDayIsDrugTrue {
      color: #006aec;
      line-height: 35px;
    }
    .toDayIsDrugFalse {
      color: #ff0000;
      line-height: 35px;
    }
    .need {
      color: #006aec;
      line-height: 35px;
      padding: 0px 10px;
      background: #fefdff;
      border: 1px solid #006aec;
      border-radius: 17px;
    }
    .noneed {
      color: #999999;
      line-height: 35px;
      background: #fefdff;
      padding: 0px 10px;
      border: 1px solid #dddddd;
      border-radius: 17px;
    }
  }
}
</style>
