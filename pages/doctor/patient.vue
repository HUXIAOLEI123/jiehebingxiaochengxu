<template>
  <div>
    <div id="head">
      <sysHead text="患者"></sysHead>
      <div class="search_head">
        <gljy-data-picker
          ref="picker"
          :initList="initList"
          @load="loadNode"
          @itemOnclick="itemOnclick"
          isLoad
          isSuper
        ></gljy-data-picker>
        <div @click="$refs.picker._show()" class="mb10">
          <u--input
            placeholder="请选择区域"
            disabled
            disabledColor="#fff"
            v-model="RegionName"
            suffixIcon="arrow-down"
            suffixIconStyle="color: #909399"
          ></u--input>
        </div>
        <!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
        <!-- #ifndef APP-NVUE -->
        <u-input v-model="Name" clearable placeholder="请输入患者姓名" class="mt10">
          <!-- #endif -->
          <!-- #ifdef APP-NVUE -->
          <u--input v-model="Name" clearable placeholder="请输入患者姓名">
            <!-- #endif -->
            <template slot="suffix">
              <u-icon name="search" color="#2979ff" size="28" @click="searchInput"></u-icon>
            </template>
            <!-- #ifdef APP-NVUE -->
          </u--input>
          <!-- #endif -->
          <!-- #ifndef APP-NVUE -->
        </u-input>
        <!-- #endif -->
        <div class="patient_type">
          <div
            v-for="item of searchList"
            :key="item.key"
            :class="[item.isActive ? 'active' : 'noactive']"
            @click="changPatientType(item)"
          >
            {{ item.label }}
          </div>
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
      <div style="overflow: hidden">
        <div style="overflow: auto">
          <div v-for="(item, index) in tableList" :key="index" class="patient_card">
            <div class="user_info">
              <div class="flex">
                <img :src="huanzhemorentouxiang" class="img" />
                <div class="user_name ml10">{{ item.Name }}</div>
              </div>
              <div :class="[item.TodayMedicine ? 'toDayIsDrugTrue' : 'toDayIsDrugFalse']">
                {{ item.TodayMedicine | formaterDay }}
              </div>
              <div class="need" @click="selectPatient(item)">联系患者</div>
              <div class="need" @click="detail(item)">查看详情</div>
            </div>
            <div class="row">
              <div>{{ item.RegionCodeName }}</div>
            </div>
            <div class="row">
              <div>剩余治疗天数&nbsp;{{ item.RemainingTreatmentDays }}</div>
              <div>服药异常&nbsp;{{ item.MedicineAbnormalCount }}</div>
            </div>
            <div class="row">
              <div>中断服药&nbsp;{{ item.InterruptCount }}</div>
              <div>不良反应&nbsp;{{ item.BadReactionCount }}</div>
            </div>
          </div>
          <u-empty mode="list" text="暂无数据" :icon="noData" marginTop="100" v-if="tableList.length == 0"></u-empty>
        </div>
      </div>
    </scroll-view>
    <tabber slot="bottom" />
  </div>
</template>

<script>
const searchList = [
  { label: "全部患者", key: "001", isActive: false },
  { label: "异常患者", key: "002", isActive: true },
  { label: "正常患者", key: "003", isActive: false },
];
import { doctorhomePatientlist, addMessages } from "@/api/doctor";
import { regionsCascade } from "@/api/dictionaryCategory.js"
export default {
  data () {
    return {
      searchList,
      tableList: [],
      IsNormal: false,
      RegionCode: "",
      RegionName: "",
      Name: "",
      initList: [],
    };
  },
  filters: {
    formaterDay (val) {
      if (val) return "今日已服药";
      if (!val) return "今日未服药";
    },
  },
  created () {
    this.getList()
    this.initRegions()
  },
  onShow () {
    this.searchList = [
      { label: "全部患者", key: "001", isActive: false },
      { label: "异常患者", key: "002", isActive: true },
      { label: "正常患者", key: "003", isActive: false },
    ];
  },
  methods: {
    searchInput () {
      this.tableList = [];
      this.pageNo = 1;
      this.getList()
    },
    //联系患者
    async selectPatient (item) {
      let res = await addMessages({
        PatientId: item.PatientUserId,
        UserId: this.$storage.getStorage("userInfo").userId
      })
      uni.navigateTo({
        url: "/pages/patient/contactDoctor?MainId=" + res.Response.MainId + '&type=doctor&PatientName=' + item.Name
      });
    },
    //患者详情
    detail (i) {
      uni.navigateTo({
        url: "/pages/doctor/treatment?personId=" + i.PersonId
      })
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
      this.pageNo = 1;
      this.tableList = [];
      this.getList()
    },
    //获取列表数据
    async getList () {
      var param = {
        Name: this.Name,
        RegionCode: this.RegionCode,
        IsNormal: this.IsNormal,
        PageNumber: this.pageNo,
        PageSize: this.pageSize,
      }
      let res = await doctorhomePatientlist(param);
      this.tableList = this.tableList.concat(res.Response.items)
      this.scrollStatus = false;
      this.$forceUpdate();
    },
    //切换不同类型患者
    changPatientType (e) {
      let arr = this.searchList;
      arr.forEach((i) => {
        i.isActive = false;
        if (i.key == e.key) {
          e.isActive = true;
          if (i.key == '001') this.IsNormal = ''
          if (i.key == '002') this.IsNormal = false
          if (i.key == '003') this.IsNormal = true
        }
      });
      this.searchList = arr;
      this.pageNo = 1;
      this.tableList = [];
      this.getList()
    },
  },
};
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
  .img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
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
      background: #e2eefd;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #006aec;
      line-height: 25px;
      padding: 3px 6px;
      height: 25px;
      margin-top: 5px;
    }
    .toDayIsDrugFalse {
      background: #fef5dd;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ec5e00;
      margin-top: 5px;
      line-height: 25px;
      height: 25px;
    }
    .need {
      color: #006aec;
      line-height: 35px;
      text-align: center;
      height: 35px;
    }
  }
}
</style>
