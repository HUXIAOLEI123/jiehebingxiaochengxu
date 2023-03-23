<template>
  <div>
    <view class="doctor_head" id="head">
      <div style="padding: 20px; background: #0074fe">
        <div class="doctor_info">
          <img :src="huanzhemorentouxiang" alt="" class="img" />
          <div class="ml15">
            <div class="F20 cWhite mt10">{{ doctorInfo.RealName }}</div>
            <div class="F13 cAACFFC mt10">{{ doctorInfo.OrganizationName }}</div>
          </div>
        </div>
        <div class="cWhite F14 ml10 mr10 mt14 patient_num">
          <div>管理患者:{{ doctorInfo.ManagePatients || 0 }}人</div>
          <div>治愈患者:{{ doctorInfo.CuredPatients || 0 }}人</div>
        </div>
        <div class="search_type_list">
          <div
            v-for="item of searchTypeList"
            :key="item.value"
            :class="[item.isActvie ? 'cWhite' : 'c8BBFFE']"
            @click="selectSearchType(item)"
          >
            <div>
              <img :src="item.isActvie ? item.activeIcon : item.icon" class="icon_class" />
              <div>{{ item.name }}</div>
            </div>
          </div>
        </div>
        <div class="mt20">
          <gljy-data-picker
            ref="picker"
            :initList="initList"
            @load="loadNode"
            @itemOnclick="itemOnclick"
            isLoad
            isSuper
          ></gljy-data-picker>
          <div @click="$refs.picker._show()">
            <u--input
              placeholder="请选择区域"
              disabled
              disabledColor="#fff"
              v-model="regionName"
              suffixIcon="arrow-down"
              suffixIconStyle="color: #909399"
            ></u--input>
          </div>
        </div>
      </div>
      <div style="padding: 20px 20px 20px 20px; background: #fff">
        <!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
        <!-- #ifndef APP-NVUE -->
        <u-input v-model="searchValue" clearable placeholder="请输入搜索内容">
          <!-- #endif -->
          <!-- #ifdef APP-NVUE -->
          <u--input v-model="searchValue" clearable placeholder="请输入搜索内容">
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
        <div class="search_type_all" v-if="searchTypeKey !== '4'">
          <div v-for="item of searchType" :key="item.key">
            <div :class="[item.isActive ? 'isActive' : '']" @click="changeSearch(item)">
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </view>
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
      <div class="doctor_main">
        <div class="patient_info">
          <div v-for="(item, index) in tableList" :key="index" :id="'ddd' + index">
            <div v-if="searchTypeKey == '1'">
              <div class="layout_patient">
                <div class="mt20" style="width: 100%">
                  <div class="flexC">
                    <div class="name">
                      <span>{{ item.Name }}</span>
                      <span class="TreatmentPlanName">{{ item.TreatmentPlanName }}</span>
                    </div>
                    <div class="cBlue" @click="discontinueTreatment(item)" v-if="!item.IsManagement">确认</div>
                  </div>
                  <div class="flexC LH35">
                    <div class="cGray F15">中断服药时间:</div>
                    <div class="F15 c252D57">{{ item.SubmitTime }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="searchTypeKey == '2'">
              <div class="layout_patient">
                <div style="width: 100%">
                  <div class="patient_searchtype_3">
                    <div class="name">
                      <span>{{ item.Name }}</span>
                      <span class="TreatmentPlanName">{{ item.TreatmentPlanName }}</span>
                    </div>
                    <div class="handle3" @click="handlePatient(item, 'add')" v-if="!item.IsManagement">处置</div>
                    <div class="handle3" @click="handlePatient(item, 'detail')">查看详情</div>
                  </div>
                  <div class="form">
                    <div class="cGray F15">不良反应时长:</div>
                    <div class="F15 c252D57">{{ item.AdverseReactiondurationName }}</div>
                  </div>
                  <div class="form">
                    <div class="F15 cGray">不良反应:</div>
                    <div class="F15 c252D57">{{ item.AdverseReactionName }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="searchTypeKey == '3'">
              <div class="layout_patient">
                <div style="width: 100%">
                  <div class="patient_searchtype_3">
                    <div class="name">
                      <span>{{ item.Name }}</span>
                      <span v-if="item.DataSources == '3'">【电子药盒上传】</span>
                      <span class="TreatmentPlanName">{{ item.TreatmentPlanName }}</span>
                    </div>
                    <div class="handle3" @click="transformation(item)" v-if="!item.SubmitConfirm">确认转化</div>
                    <div class="handle3" @click="showVideo(item)" v-if="item.VideoUrl && !item.isShowVideo">
                      查看视频
                    </div>
                  </div>
                  <div class="form" v-if="item.VideoUrl && item.isShowVideo" :id="'dasda' + index">
                    <video :src="item.VideoUrl" :id="'asdasdd' + index" class="patient_video"></video>
                  </div>
                  <div class="row mt10 mb10">
                    <div class="cGray">提交时间:</div>
                    <div class="c252D57">{{ item.SubmitTime || '' }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="searchTypeKey == '4'">
              <div class="layout_patient">
                <div style="width: 100%">
                  <div class="patient_searchtype_3">
                    <div class="name">
                      <span>{{ item.Name }}</span>
                      <span class="TreatmentPlanName">{{ item.TreatmentPlanName }}</span>
                    </div>
                    <div class="handle3" @click="gotoFollowUp(item)">去随访</div>
                    <div class="handle3" @click="detail(item)">查看详情</div>
                  </div>
                  <div class="form flexC">
                    <div class="cGray F15">随访类型:</div>
                    <div class="F15 c252D57">{{ item.VisitTypeName }}</div>
                  </div>
                  <div class="form flexC">
                    <div class="cGray F15">本次随访时间:</div>
                    <div class="F15 c252D57">{{ item.VisitDate }}</div>
                  </div>
                  <div class="form flexC">
                    <div class="F15 cGray">下次随访时间:</div>
                    <div class="F15 c252D57">{{ item.NextVisitDate }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <u-empty mode="list" text="暂无数据" :icon="noData" marginTop="100" v-if="tableList.length == 0"></u-empty>
        </div>
      </div>
    </scroll-view>
    <tabber id="bottom" />
  </div>
</template>

<script>
import iconUrl from "@/assets/index.js";
import { regionsCascade } from "@/api/dictionaryCategory.js";
import {
  doctorhome,
  pulmonaryinterruptsDoctorhomepage,
  pulmonarybadreactionsDoctorhomepage,
  pulmonarymedicinesDoctorhomepage,
  pulmonaryvisitsDoctorhomepage,
  pulmonarymedicinesMedicineconfirm,
  pulmonaryinterruptsManagement
} from "@/api/doctor.js"
const searchTypeList = [
  {
    name: "服药转化",
    value: "3",
    isActvie: true,
    activeIcon: iconUrl.fuyaozhuanhua_active,
    icon: iconUrl.fuyaozhuanhua,
  },
  {
    name: "不良反应",
    value: "2",
    isActvie: false,
    activeIcon: iconUrl.buliangfanying_active,
    icon: iconUrl.buliangfanying,
  },
  {
    name: "中断服药",
    value: "1",
    isActvie: false,
    activeIcon: iconUrl.zhongduanzhiliao_active,
    icon: iconUrl.zhongduanzhiliao,
  },
  {
    name: "随访管理",
    value: "4",
    isActvie: false,
    activeIcon: iconUrl.suifangguanli_active,
    icon: iconUrl.suifangguanli,
  },
];
const searchType = [
  { label: "全部", key: "01", isActive: true },
  { label: "未处理", key: "02", isActive: false },
  { label: "已处置", key: "03", isActive: false },
];
export default {
  data () {
    return {
      isShow: true,
      searchTypeList,
      searchType,
      searchValue: "",
      searchTypeKey: "3",
      regionCode: "",
      regionName: "",
      IsManagement: "",
      doctorInfo: {},//医生信息
      initList: [],
    };
  },
  created () {
    this.getDoctorInfo()
    this.initRegions()
  },
  onShow () {
    this.searchTypeList = [
      {
        name: "服药转化",
        value: "3",
        isActvie: true,
        activeIcon: iconUrl.fuyaozhuanhua_active,
        icon: iconUrl.fuyaozhuanhua,
      },
      {
        name: "不良反应",
        value: "2",
        isActvie: false,
        activeIcon: iconUrl.buliangfanying_active,
        icon: iconUrl.buliangfanying,
      },
      {
        name: "中断服药",
        value: "1",
        isActvie: false,
        activeIcon: iconUrl.zhongduanzhiliao_active,
        icon: iconUrl.zhongduanzhiliao,
      },
      {
        name: "随访管理",
        value: "4",
        isActvie: false,
        activeIcon: iconUrl.suifangguanli_active,
        icon: iconUrl.suifangguanli,
      },
    ];
    this.searchType = [
      { label: "全部", key: "01", isActive: true },
      { label: "未处理", key: "02", isActive: false },
      { label: "已处置", key: "03", isActive: false },
    ];
  },
  methods: {
    // 显示服药记录视频
    showVideo (i) {
      let arr = [];
      this.tableList.forEach((item) => {
        if (i.MedicineId == item.MedicineId) {
          item.isShowVideo = true;
        } else {
          item.isShowVideo = false;
        }
        arr.push(item)
      });
      this.tableList = arr;
    },
    async getDoctorInfo () {
      let res = await doctorhome();
      this.$storage.setStorage("doctorInfo", res.Response);
      this.doctorInfo = res.Response;
      this.getList()
    },
    //获取列表患者信息
    async getList () {
      var param = {
        PageNumber: this.pageNo,
        PageSize: this.pageSize,
        Content: this.searchValue,
        IsManagement: this.IsManagement,
        RegionCode: this.regionCode
      }
      let res = {};
      let arr = []
      switch (this.searchTypeKey) {
        //中断服药
        case '1':
          res = await pulmonaryinterruptsDoctorhomepage(param);
          arr = res.Response.items;
          break;
        //不良反应
        case '2':
          res = await pulmonarybadreactionsDoctorhomepage(param)
          arr = res.Response.items;
          break;
        //服药转换
        case '3':
          res = await pulmonarymedicinesDoctorhomepage(param)
          arr = res.Response.items;
          arr.forEach((i) => {
            if (i.VideoUrl) {
              i.VideoUrl = this.$video_url + i.VideoUrl;
            }
          })
          break;
        //随访管理
        case '4':
          res = await pulmonaryvisitsDoctorhomepage(param)
          arr = res.Response.items;
          arr.forEach((i) => {
            if (i.VisitType == '1') {
              i.VisitTypeName = '首次随访'
            }
            if (i.VisitType == '2') {
              i.VisitTypeName = '后续随访'
            }
          })
          break;
        default:
          break;
      }
      this.tableList = this.tableList.concat(arr)
      this.scrollStatus = false;
      this.$forceUpdate();
    },
    async initRegions () {
      let res = await regionsCascade('360000000000');
      this.initList = res.Response.items;
    },
    //创建后续随访信息
    gotoFollowUp (item) {
      uni.navigateTo({
        url: "/pages/doctor/moreFollowup?PersonId=" + item.PersonId + '&DiagnosisId=' + item.DiagnosisId + '&Name=' + item.Name + '&TreatmentPlan=' + item.TreatmentPlanName + "&FileNumber=" + item.FileNumber
      });
    },
    //随访详情
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
    async loadNode (item, resolve) {
      //获取到当前点击的id值
      let rgid = item.RegionCode;
      let res = await regionsCascade(rgid);
      resolve(res.Response.items); //调用回调
    },
    itemOnclick (res) {
      if (res) {
        this.regionCode = res.RegionCode
        this.regionName = res.RegionName
      } else {
        this.regionCode = ''
        this.regionName = ''
      }
      this.pageNo = 1;
      this.tableList = [];
      this.getList()
    },
    //不良反应处置
    handlePatient (e, opt) {
      uni.navigateTo({
        url: "/pages/doctor/handlePatient?badReactionId=" + e.BadReactionId + "&opt=" + opt,
      });
    },
    // 服药转换
    async transformation (i) {
      await pulmonarymedicinesMedicineconfirm([i.MedicineId + ""]);
      uni.showToast({
        title: '转换成功',
        icon: 'none',
        duration: 3000,
      });
      this.pageNo = 1;
      this.tableList = [];
      this.getList()
    },
    //中断服药确认
    async discontinueTreatment (i) {
      await pulmonaryinterruptsManagement([i.InterruptId]);
      uni.showToast({
        title: '确认成功',
        icon: 'none',
        duration: 3000,
      });
      this.pageNo = 1;
      this.tableList = [];
      this.getList()
    },
    //选择筛选
    selectSearchType (item) {
      this.tableList = [];
      this.pageNo = 1;
      let arr = this.searchTypeList;
      arr.forEach((i) => {
        i.isActvie = false;
        if (i.value == item.value) {
          item.isActvie = true;
          this.searchTypeKey = item.value;
        }
      });
      this.searchTypeList = arr;
      this.searchValue = '';
      this.getScrollHeight();
      let searchType = this.searchType;
      searchType.forEach((i) => {
        i.isActive = false;
        if (i.key == '01') {
          i.isActive = true
          this.IsManagement = ''
        }
      })
      this.searchType = searchType;
      this.getList()
    },
    searchInput () {
      this.tableList = [];
      this.pageNo = 1;
      this.getList()
    },
    //筛选患者
    changeSearch (e) {
      this.tableList = [];
      this.pageNo = 1;
      let arr = this.searchType;
      arr.forEach((i) => {
        i.isActive = false;
        if (i.key == e.key) {
          e.isActive = true;
          if (i.key == '01') this.IsManagement = ''
          if (i.key == '02') this.IsManagement = false
          if (i.key == '03') this.IsManagement = true
        }
      });
      this.searchType = arr;
      this.getList()
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .u-input {
    background: #fff;
  }
}
.row {
  display: flex;
  justify-content: space-between;
}
.cAACFFC {
  color: #aacffc;
}
.c252D57 {
  color: #252d57;
}
.doctor_head {
  background: #0074fe;
  .doctor_info {
    display: flex;
    .img {
      width: 70px;
      height: 70px;
      border-radius: 35px;
    }
  }
  .icon_class {
    width: 24px;
    height: 24px;
    margin-left: 14px;
  }
  .patient_num {
    display: flex;
    justify-content: space-between;
  }
  .search_type_list {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    line-height: 20px;
    margin-top: 28px;
  }
  .search_type_all {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 0px 20px;
    .isActive {
      color: #006aec;
      padding-bottom: 3px;
      border-bottom: 2px solid #006aec;
    }
  }
}
.search_two {
  margin-top: 20px;
  padding: 20px 20px 0px 20px;
  background: #fff;
}
.doctor_main {
  overflow: auto;
  background: #fff;
  padding: 0px 20px 20px 20px;
  .layout_patient {
    display: flex;
    padding-bottom: 10px;
    padding-top: 5px;
    border-bottom: 1px solid #dddddd;
    .TreatmentPlanName {
      background: #e2eefd;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #006aec;
      padding: 3px 6px;
      text-align: center;
      margin-left: 9px;
    }
    .patient_searchtype_3 {
      display: flex;
      justify-content: space-between;
    }
    .patient_video {
      width: 80% !important;
      height: 141px;
      margin-top: 15px;
    }
    .handle {
      padding: 3px 10px;
      text-align: center;
      color: #006aec;
      border-radius: 2px;
      border: 2px solid #006aec;
      line-height: 30px;
    }
    .handle3 {
      text-align: center;
      color: #006aec;
    }
    .detail {
      padding: 3px 10px;
      line-height: 30px;
      margin-left: 10px;
      text-align: center;
      color: #ffffff;
      background: #006aec;
      border: 2px solid #006aec;
      border-radius: 2px;
    }
    .name {
      color: #252d57;
      font-size: 17px;
      margin-right: 26px;
    }
    .form {
      display: flex;
      line-height: 35px;
      div {
        margin-right: 5px;
      }
    }
    .col70 {
      width: 75%;
    }
    .col30 {
      width: 25%;
    }
  }
}
</style>
