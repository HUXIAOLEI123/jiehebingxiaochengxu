<template>
  <div>
    <div id="head">
      <sysHead text="健康宣教" slot="top"></sysHead>
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
        <div v-for="item of tableList" :key="item.RecordId" class="row" @click="look(item)">
          <div class="F17 c252D57 LH35 flex">
            <div class="unread" v-if="item.ReadState == '0'"></div>
            <div>{{ item.EducationTitle }}</div>
          </div>
          <div class="F14 c999 LH35">{{ item.ReleaseTime }}</div>
          <img :src="item.CoverImageURL" alt="" class="img" />
        </div>
        <u-empty mode="list" text="暂无数据" :icon="noData" marginTop="100" v-if="tableList.length == 0"></u-empty>
      </div>
    </scroll-view>
    <tabber slot="bottom" />
  </div>
</template>

<script>
import { healtheducationpushrecords } from "@/api/patient.js"
export default {
  data () {
    return {};
  },
  mounted () {
    this.getList()
  },
  created () { },
  methods: {
    async getList () {
      var param = {
        PageNumber: this.pageNo,
        PageSize: this.pageSize,
        DiagnosisId: this.$storage.getStorage("patientInfo").CurrentDiagnosisId
      }
      let data = await healtheducationpushrecords(param);
      let arr = data.Response.items;
      arr.forEach((i) => {
        if (i.CoverImageURL) {
          // let str = i.CoverImageURL.slice(8, i.CoverImageURL.length);
          let str = i.CoverImageURL;
          str = str.replace('\\', '/')
          i.CoverImageURL = this.$video_url + str;
        }
      });
      this.tableList = this.tableList.concat(arr)
      this.scrollStatus = false;
      this.$forceUpdate();
    },
    look (item) {
      uni.navigateTo({
        url: "/pages/patient/educationDetail?RecordId=" + item.RecordId + "&title=" + item.EducationTitle
      });
    }
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
  display: flex;
  background: #ffffff;
  .back {
    width: 24px;
    height: 24px;
    margin-top: 20px;
    margin-left: 5px;
  }
  .text {
    text-align: center;
    width: 100vw;
  }
}
.main {
  overflow: auto;
  padding: 19px 13px;
  margin-top: 7px;
  height: calc(100vh - 200px);
  background: #fff;
  .row {
    padding-bottom: 19px;
    border-bottom: 1px solid #dddddd;
    .flex {
      display: flex;
    }
    .unread {
      margin-top: 15px;
      margin-right: 10px;
      width: 5px;
      height: 5px;
      border-radius: 5px;
      background-color: red;
    }
    .read {
      width: 3px;
      height: 3px;
      border-radius: 3px;
      background-color: rgb(13, 255, 0);
    }
  }
  .img {
    width: 100%;
    height: 144px;
  }
}
</style>
