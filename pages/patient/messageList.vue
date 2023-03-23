<template>
  <div>
    <div id="head">
      <sysHead text="医生列表" showBack></sysHead>
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
                <div class="user_name ml10">{{ item.UserName }}</div>
              </div>
              <div class="F14 LH35">{{ item.LastMessageTime }}</div>
            </div>
            <div class="cGray F17 LH28 text">{{ item.LastMessage }}</div>
          </div>
          <u-empty mode="list" text="暂无数据" :icon="noData" marginTop="100" v-if="tableList.length == 0"></u-empty>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import { addMessages } from "@/api/doctor";
import { bypatient } from "@/api/patient";
export default {
  data () {
    return {
      tableList: [],
    }
  },
  created () {
  },
  onShow () {
    this.tableList = [];
    this.pageNo = 1;
    this.setContenList()
    this.getList()
  },
  methods: {
    //创建与当前治疗卡医生的对话
    async setContenList () {
      await addMessages({
        PatientId: this.$storage.getStorage("userInfo").userId,
        UserId: this.$storage.getStorage("patientInfo").CurrentResponsibilityId
      })
    },
    //选择患者，跳转与患者聊天页面
    selectPatient (item) {
      uni.navigateTo({
        url: "/pages/patient/contactDoctor?MainId=" + item.MainId + '&type=patient&PatientName=' + item.UserName
      });
    },
    //获取列表数据
    async getList (pageNo, pageSize) {
      let res = await bypatient();
      res.Response.forEach((i) => {
        i = this.$util.formatObj(i)
      })
      this.tableList = this.tableList.concat(res.Response)
      this.scrollStatus = false;
      this.$forceUpdate();
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
.text {
  width: 100% !important;
  text-align: right !important;
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
