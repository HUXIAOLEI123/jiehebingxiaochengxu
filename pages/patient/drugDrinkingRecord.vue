<template>
  <div>
    <div id="head">
      <sysHead text="服药记录" showBack slot="top"></sysHead>
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
          <div class="row">
            <div class="label">时间:</div>
            <div class="value">{{ item.SubmitTime }}</div>
          </div>
          <div class="row">
            <div class="label">数据来源:</div>
            <div class="value">{{ item.DataSources | formmaterDataSources }}</div>
          </div>
          <!-- <div class="row">
            <div class="label">状态:</div>
            <div :class="[item.SubmitConfirm ? 'statusTrue' : 'statusFalse']">
              {{ item.SubmitConfirm ? '已确认' : '未确认' }}
            </div>
          </div> -->
          <div class="row">
            <div class="label">操作:</div>
            <div class="flex">
              <div class="showVideo" v-if="item.VideoUrl && isPatient" @click="recordVideo(item)">重新录制</div>
              <div class="showVideo ml10" v-if="item.VideoUrl && !item.isShowVideo" @click="lookVideo(item)">
                显示视频
              </div>
              <div class="noVidoe" v-if="!item.VideoUrl">显示视频</div>
              <div class="showVideo ml10" @click="lookVideo(item)" v-if="item.VideoUrl && item.isShowVideo">
                隐藏视频
              </div>
              <div class="showVideo ml10" @click="selectItem(item)" v-if="!item.SubmitConfirm">删除</div>
            </div>
          </div>
          <div class="row" v-if="item.VideoUrl && item.isShowVideo">
            <video :src="item.VideoUrl" class="icon"></video>
          </div>
        </div>
        <u-empty mode="list" text="暂无数据" :icon="noData" marginTop="100" v-if="tableList.length == 0"></u-empty>
      </div>
    </scroll-view>
    <u-modal
      :show="modalShow"
      title="确定删除服药记录?"
      content="记录删除后无法恢复"
      @confirm="deletItem"
      closeOnClickOverlay
      showCancelButton
      showConfirmButton
      @close="modalShow = false"
      @cancel="modalShow = false"
    >
      <view class="slot-content">
        <div style="text-align: center; color: #666">记录删除后无法恢复</div>
      </view>
    </u-modal>
  </div>
</template>

<script>
import {
  pulmonarymedicines,
  filestorageinfos,
  reuploadmedicine,
  pulmonarymedicinesDeletes
} from "@/api/patient.js"
export default {
  data () {
    return {
      startTime: "",
      endTime: "",
      DiagnosisId: "",
      toDay: "",
      isPatient: false,
      selectData: {},
      modalShow: false,
    };
  },
  onLoad (param) {
    if (param.DiagnosisId) {
      this.DiagnosisId = param.DiagnosisId
      this.toDay = param.toDay
      this.getList()
    }
    this.isPatient = this.$storage.getStorage("userInfo").utype == "2" ? true : false;
  },
  filters: {
    formmaterDataSources (val) {
      if(val == 1){
        return '小程序上传'
      }else if(val == 2){
        return '补录'
      }else if(val == 3){
        return '电子药盒上传'
      }else{
        return ''
      }
    }
  },
  methods: {
    //查看视频
    lookVideo (i) {
      let arr = [];
      this.tableList.forEach((item) => {
        if (i.MedicineId == item.MedicineId) {
          if (item.isShowVideo) {
            item.isShowVideo = false
          } else {
            item.isShowVideo = true
          }
        }
        arr.push(item)
      });
      this.tableList = arr
      this.$forceUpdate()
    },
    selectItem (item) {
      this.modalShow = true;
      this.MedicineId = item.MedicineId
    },
    //删除未确认的服药记录
    async deletItem () {
      await pulmonarymedicinesDeletes([this.MedicineId])
      this.$u.toast('删除成功！')
      this.modalShow = false;
      this.searchList()
    },
    searchList () {
      this.pageNo = 1;
      this.tableList = [];
      this.getList()
    },
    async getList () {
      if (this.toDay == '1') {
        let timesStamp1 = this.$util.getTime();
        let timesStamp2 = this.$util.getTime('', 'yyyyMMddHHmm');
        var param = {
          DiagnosisId: this.DiagnosisId,
          SubmitTimes: [timesStamp1 + ' 00:00:00', timesStamp2],
          PageNumber: this.pageNo,
          PageSize: this.pageSize,
        }
      } else {
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
      }
      let res = await pulmonarymedicines(param);
      let arr = res.Response.items;
      arr.forEach((i) => {
        if (i.VideoUrl) {
          i.VideoUrl = this.$video_url + i.VideoUrl;
        }
      })
      this.tableList = this.tableList.concat(arr)
      this.scrollStatus = false;
      this.$forceUpdate();
    },
    //录制视频
    async recordVideo (item) {
      this.selectData = item
      // uploadFile 存储需要上传的文件
      // 1.选择要上传的视频
      uni.chooseVideo({
        maxDuration: 15,		// 拍摄视频最长拍摄时间，单位秒。最长支持 60 秒。
        sourceType: ['camera'],		// album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
        success: (res) => {
          this.uploadfilestorageinfos(res.tempFilePath);//上传视频到存储桶
        },
      });
    },
    //上传视频到存储桶
    async uploadfilestorageinfos (tempFilePath) {
      uni.showLoading({
        mask: true,
        title: '上传中...'
      })
      // 2.上传所选视频到服务器
      const arr = await filestorageinfos(tempFilePath)
      let data = JSON.parse(arr[1].data)
      if (data.StatusCode !== 200) {		// 视频上传失败了
        uni.hideLoading()
        this.$u.toast(data.Message)
        return
      } else {// 视频上传成功
        await reuploadmedicine({
          medicineId: this.selectData.MedicineId,
          data: {
            FileRelationGuid: data.Response[0].RelationGuid,
            VideoURL: data.Response[0].FilePath,
            DiagnosisId: this.selectData.DiagnosisId,
          }
        })
        this.searchList()
        this.$u.toast(data.Message)
        uni.hideLoading()
      }
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
    padding: 21px 0px;
    border-bottom: 1px solid #dddddd;
    .icon {
      margin: 0 auto;
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      line-height: 35px;
      font-size: 17px;
      margin-bottom: 1px;
      .label {
        color: #222222;
        width: 120px !important;
      }
      .value {
        color: #252d57;
      }
      .statusTrue {
        background: #fef5dd;
        border-radius: 15px;
        font-size: 15px;
        padding: 0px 10px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #f98407;
      }
      .statusFalse {
        background: #e3fde2;
        border-radius: 15px;
        font-size: 15px;
        padding: 0px 10px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #09a531;
      }
      .showVideo {
        font-family: PingFang SC;
        font-weight: 500;
        color: #064dde;
        font-size: 15px;
      }
      .noVidoe {
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        font-size: 15px;
      }
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
}
</style>
