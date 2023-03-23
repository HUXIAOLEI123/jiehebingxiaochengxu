<template>
  <div>
    <div class="head">
      <div class="select_day">
        <!-- <div @click="gotoDay">回到今天</div> -->
        <div></div>
        <div class="year">
          <div class="F18">{{ newTime }}</div>
        </div>
        <div @click="gotoToDrugDrinkingRecord">查看更多</div>
      </div>
      <div class="week_list">
        <div v-for="item of weekList" :key="item.key">
          {{ item.name }}
        </div>
      </div>
      <div class="day_list">
        <div v-for="item of dayList" :key="item.key">
          <div class="F22 item" :class="item.style">{{ item.num }}</div>
        </div>
      </div>
    </div>
    <div class="patient_info">
      <div class="row">
        <div class="col">
          <div class="flex">
            <div class="icon" style="background: #46d4a4"></div>
            <div>已服药</div>
          </div>
          <div class="mr10">{{ statistics.ActualTakeMedicineDays || 0 }}天</div>
        </div>
        <div class="col ml10">
          <div class="flex">
            <div class="icon" style="background: #006aec"></div>
            <div>剩余服药</div>
          </div>
          <div class="mr10">{{ statistics.RemainingTakeMedicineDays || 0 }}天</div>
        </div>
      </div>
      <div class="row mt20 pb16">
        <div class="col">
          <div class="flex">
            <div class="icon" style="background: #ff23f7"></div>
            <div>服药异常</div>
          </div>
          <div class="mr10">{{ statistics.AbnormalTakeMedicineCount || 0 }}次</div>
        </div>
        <div class="col ml10">
          <div class="flex">
            <div class="icon" style="background: #ff4323"></div>
            <div>已停药</div>
          </div>
          <div class="mr10">{{ statistics.StopTakeMedicineDays || 0 }}天</div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="flex">
        <img src="@/assets/pages/patient/capsule.png" alt="" class="capsule_icon" />
        <div class="message_warn">消息提醒</div>
      </div>
      <div v-for="item of messageList" :key="item.key" class="row_message mt10">
        <div>
          <div class="cGray F16 mt10">{{ item.Content }}</div>
          <div class="c999 F14 mt10">{{ item.ReminderDate }}</div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="flex">
        <img src="@/assets/pages/patient/capsule.png" alt="" class="capsule_icon" />
        <div class="message_warn">
          <div>今日监察</div>
          <div class="looktoday" @click="gotoToDay">今日服药记录</div>
        </div>
      </div>
      <div v-if="true">
        <div class="todayvideo">
          <video :src="src" v-if="src" class="todayvideoCom"></video>
          <div class="row p10 mb10" v-if="src">
            <div class="cGray">提交时间:</div>
            <div class="c252D57">{{ SubmitTime || '' }}</div>
          </div>
          <div class="today_no_drug" v-else>暂无视频</div>
        </div>
        <div class="btn" @click="recordVideo">录制服药视频</div>
        <div class="btn mt20" @click="submitOk">手动服药确认</div>
      </div>
    </div>
    <div class="card">
      <div class="flex">
        <img src="@/assets/pages/patient/capsule.png" alt="" class="capsule_icon" />
        <div class="message_warn">不良反应</div>
      </div>
      <div>
        <div class="btn mt20" @click="record">记录不良反应</div>
      </div>
    </div>
    <tabber />
    <u-calendar
      :show="show"
      @confirm="selectDate"
      @close="show = false"
      closeOnClickOverlay
      :minDate="fomconfig.minDate"
      :maxDate="fomconfig.maxDate"
      monthNum="13"
    ></u-calendar>
  </div>
</template>

<script>
import {
  patienthome,
  messagereminder,
  statistics,
  pulmonarymedicinesmedicine,
  filestorageinfos,
  pulmonarymedicines,
  badreactionrecord
} from "@/api/patient.js"
const weekList = [
  { name: "一", key: "1" },
  { name: "二", key: "2" },
  { name: "三", key: "3" },
  { name: "四", key: "4" },
  { name: "五", key: "5" },
  { name: "六", key: "6" },
  { name: "日", key: "7" },
];
export default {
  data () {
    return {
      badreactionrecordList: [],
      newTime: "",
      fomconfig: {
        minDate: "",
        maxDate: "",
      },
      searchForm: {
        startDate: "",
        endDate: "",
      },
      DiagnosisId: "",
      src: "",
      SubmitTime: "",
      show: false,
      weekList,
      dayList: [],
      dayListCopy: [],
      messageList: [],
      statistics: {
        ShouldTakeMedicineDays: "",
        ActualTakeMedicineDays: "",
        AbnormalTakeMedicineCount: "",
        RemainingTreatmentDays: "",
      }
    };
  },
  created () {
    this.setMinAndMaxDate();//设置日历的最大时间和最小时间
    this.newTime = this.$util.getTime().slice(0, 7)
  },
  onShow () {
    this.getPaitentInfo();//获取患者个人信息和治疗卡信息及获取消息提醒
  },
  methods: {
    //查看今日服药记录
    gotoToDay () {
      uni.navigateTo({
        url: "/pages/patient/drugDrinkingRecord?DiagnosisId=" + this.DiagnosisId + "&toDay=1"
      });
    },
    //查看更多
    gotoToDrugDrinkingRecord () {
      uni.navigateTo({
        url: "/pages/patient/drugDrinkingRecord?DiagnosisId=" + this.DiagnosisId
      });
    },
    //回到今天
    gotoDay () {
      this.newTime = this.$util.getTime().slice(0, 7)
      this.getWeekTime()
    },
    async getPaitentInfo () {
      let patientInfo = await patienthome();
      patientInfo.Response.MainId = "40769ec5-b277-44ae-9177-d0b7383ec966"
      this.$storage.setStorage("patientInfo", patientInfo.Response);
      this.DiagnosisId = patientInfo.Response.CurrentDiagnosisId;
      let res = await messagereminder(patientInfo.Response.CurrentDiagnosisId);
      this.messageList = res.Response;
      this.getToDayRecord();
      this.getWeekTime()
      this.getBadreactionrecord()
    },
    //查询不良反应记录
    async getBadreactionrecord () {
      let timesStamp = this.$util.getTime('', 'yyyyMMdd');
      var param = {
        DiagnosisId: this.DiagnosisId,
        SubmitTimes: [timesStamp + ' 00:00:00', timesStamp + ' 23:59:59'],
        PageNumber: 1,
        PageSize: 10,
      }
      let res = await badreactionrecord(param);
      this.badreactionrecordList = res.Response.items;
    },
    //获取患者的服药记录
    async getToDayRecord () {
      let date = new Date().toLocaleDateString().replaceAll("/", "-")
      let res = await pulmonarymedicines({
        DiagnosisId: this.DiagnosisId,
        SubmitTimes: [
          date + ' 00:00:00', date + " 23:59:59"
        ],
        PageNumber: 1,
        PageSize: 99
      });
      let arr = res.Response.items;
      let url = ''
      if (arr.length > 0) {
        url = arr[0].VideoUrl;
        this.SubmitTime = arr[0].SubmitTime;
      }
      if (url) {
        url = this.$video_url + url;
      }
      this.src = url
    },
    //记录不良反应
    record () {
      uni.navigateTo({
        url: "/pages/patient/fallillrecord",
      });
    },
    //录制视频
    async recordVideo () {
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
        let res = await pulmonarymedicinesmedicine({
          DiagnosisId: this.DiagnosisId,
          FileRelationGuid: data.Response[0].RelationGuid,
          VideoURL: data.Response[0].FilePath
        })
        this.getToDayRecord()
        this.$u.toast(data.Message)
        uni.hideLoading()
      }
    },
    //服药确认
    async submitOk () {
      await pulmonarymedicinesmedicine({
        DiagnosisId: this.DiagnosisId
      })
      uni.showToast({
        title: '服药成功！',
        icon: 'none',
        duration: 3000,
      });
      this.getToDayRecord()
    },
    selectDate (e) {
      let date = this.formatTime(e[0] + ' 00:00:00')
      this.newTime = e[0].slice(0, 7)
      this.getWeekTime(date)
      this.show = false;
    },
    formatTime (str) {
      let date = ''
      if (!str) return date
      const tempStrs = str.split(' ')
      const dateStrs = tempStrs[0].split('-')
      const year = parseInt(dateStrs[0], 10)
      const month = parseInt(dateStrs[1], 10) - 1
      const day = parseInt(dateStrs[2], 10)
      const timeStrs = tempStrs[1].split(':')
      const hour = parseInt(timeStrs[0], 10)
      const minute = parseInt(timeStrs[1], 10)
      const second = parseInt(timeStrs[2], 10)
      date = new Date(year, month, day, hour, minute, second)
      return date
    },
    getTime (date, format) {
      format = format || 'yyyyMMdd'
      let stopTime = date || new Date() //获取目前的时间
      let y = stopTime.getFullYear()  //获取目前的年份
      let m = stopTime.getMonth() + 1 //获取当前的月份，月份是从0开始的，要+1
      m = m < 10 ? '0' + m : m  //如果月份小于10的话为01、02否则为10、11
      let d = stopTime.getDate() //获取当前几号
      d = d < 10 ? '0' + d : d
      let h = stopTime.getHours() //获取当前小时
      h = h < 10 ? '0' + h : h
      let minute = stopTime.getMinutes()  //获取当前分钟
      minute = minute < 10 ? '0' + minute : minute
      let second = stopTime.getSeconds() //获取当前秒
      second = second < 10 ? '0' + second : second
      let yyyyMMddHHmm = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second //现在格式为2021-11-22 13:53:12
      let yyyyMMdd = y + '-' + m + '-' + d //现在格式为2021-11-22
      if (format == 'yyyyMMddHHmm') {
        return yyyyMMddHHmm
      } else {
        return yyyyMMdd
      }
    },
    //获取当前一周时间
    async getWeekTime (date) {
      var new_Date = date || new Date(); //获取指定日期当周的一周日期
      var timesStamp = new_Date.getTime();
      var currenDay = new_Date.getDay();
      let dayType = this.compareTime(this.getTime(new_Date), this.getTime())
      var dates = [];
      for (var i = 0; i < 7; i++) {
        var das = this.getTime(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7))), 'yyyyMMdd');
        if (i == 0) this.searchForm.startDate = das;
        if (i == 6) this.searchForm.endDate = das;
        let date = das;
        das = das.slice(das.lastIndexOf("-") + 1, das.length);
        let o = {
          num: das,
          key: das,
          date: date
        };
        if (i + 1 === currenDay) o.style = 'day';
        if (i + 1 > currenDay) o.style = 'future';
        if (dayType == '2' && o.style != 'day') o.style = 'normal';
        dates.push(o);
      }
      this.dayListCopy = dates;
      let param = {
        diagnosisId: this.DiagnosisId,
        startDate: this.searchForm.startDate,
        endDate: this.searchForm.endDate,
      }
      let res = await statistics(param);
      this.statistics = Object.assign(this.statistics, res.Response)
      this.dayList = this.dayListCopy;
      this.dayList.forEach(i => {
        i.MedicationSituation = ''
      })
      for (let index = 0; index < this.dayList.length; index++) {
        this.dayList[index].MedicationSituation = res.Response.MedicationCalendars[index].MedicationSituation;
        if (this.dayList[index].MedicationSituation == 2 && this.dayList[index].style !== 'day') {
          this.dayList[index].style = 'abnormal'
        }
        if (this.dayList[index].MedicationSituation == 1) {
          this.dayList[index].style = 'normal'
        }
        if (this.dayList[index].MedicationSituation == 0 && this.dayList[index].style !== 'day') {
          this.dayList[index].style = 'red'
        }
        if (this.dayList[index].MedicationSituation == 4) {
          this.dayList[index].style = 'future'
        }
      }
    },
    compareTime (startTime, endTime) {
      var startTimes = startTime.substring(0, 10).split('-');
      var endTimes = endTime.substring(0, 10).split('-');
      startTime = startTimes[1] + '-' + startTimes[2] + '-' + startTimes[0] + ' ' + startTime.substring(10, 19);
      endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
      var resultTime = (Date.parse(endTime) - Date.parse(startTime)) / 3600 / 1000;
      if (resultTime < 0) { //endTime小于tartTime
        return '1'
      } else if (resultTime > 0) { //endTime大于tartTime
        return '2'
      } else if (resultTime == 0) { //endTime等于tartTime
        return '3'
      } else {
        console.log('计算时间异常')
      }
    },
    //设置日历的最大时间和最小时间
    setMinAndMaxDate () {
      const d = new Date();
      const year = d.getFullYear();
      let month = d.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      const date = d.getDate();
      this.fomconfig.minDate = `${year - 1}-${month}-${date}`
      this.fomconfig.maxDate = `${year}-${month}-${date + 1}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  line-height: 20px;
}
.card {
  background: #ffffff;
  padding: 13px 14px 25px 14px;
  margin-top: 6px;
  .todayvideo {
    .todayvideoCom {
      margin: 0 auto;
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  .today_no_drug {
    width: 100%;
    font-size: 18px;
    color: #666666;
    padding: 10px 0px;
    line-height: 17px;
    margin: 34px 0px;
    text-align: center;
  }
  .btn {
    height: 44px;
    background: #006aec;
    border-radius: 5px;
    font-size: 18px;
    color: #ffffff;
    line-height: 44px;
    text-align: center;
  }
  .row_message {
    padding-bottom: 11px;
    border-bottom: 1px solid #dddddd;
  }
  .flex {
    display: flex;
    .capsule_icon {
      width: 8px;
      height: 16px;
      margin-top: 1px;
      margin-right: 7px;
    }
    .message_warn {
      font-size: 18px;
      color: #252d57;
      line-height: 17px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .looktoday {
        font-size: 18px;
        color: #0074fe;
        text-align: center;
        font-weight: 500;
      }
    }
  }
}
.patient_info {
  background: #ffffff;
  padding: 39px 14px 0px 14px;
  margin-top: 6px;
  .row {
    display: flex;
    .col {
      display: flex;
      width: 50%;
      justify-content: space-between;
      .flex {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color: #666666;
        line-height: 17px;
      }
      .icon {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-top: 5px;
        margin-right: 6px;
      }
    }
  }
}
.head {
  background: #ffffff;
  padding: 80px 14px 0px 14px;
  .day_list {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    .item {
      width: 44px;
      text-align: center;
      border-radius: 5px;
      line-height: 44px;
      div {
        width: 100%;
        text-align: center;
      }
    }
    //正常状态无异常
    .normal {
      background: #46d4a4;
      color: #ffffff;
    }
    //异常
    .abnormal {
      background: #ff23f7;
      color: #ffffff;
    }
    .red {
      background: #ff4323;
      color: #ffffff;
    }
    .day {
      color: #006aec;
      border: 2px solid #006aec;
    }
    .future {
      color: #252d57;
    }
  }
  .week_list {
    color: #999999;
    font-size: 12px;
    display: flex;
    justify-content: space-around;
    margin-top: 39px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eeeeee;
  }
  .select_day {
    display: flex;
    justify-content: space-between;
    color: #252d57;
    font-size: 14px;
    .year {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
