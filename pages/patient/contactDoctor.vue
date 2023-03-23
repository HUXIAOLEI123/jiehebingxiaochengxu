<template>
  <div>
    <sysHead :text="title" showBack></sysHead>
    <div style="overflow: hidden">
      <div class="main">
        <scroll-view scroll-y="true" style="height: 95%" :scroll-top="scrollTopHeight" scroll-with-animation="true">
          <div v-for="item of messageList" :key="item.DetailId">
            <div :class="item.className">
              <div class="left-container">
                <div class="F12 c999 t_c mt20">{{ item.DetailTime }}</div>
                <div class="name">{{ item.DetailUserName }}</div>
                <p class="comment">{{ item.DetailContent }}</p>
              </div>
              <img :src="huanzhemorentouxiang" class="img" v-if="item.DetailUserType == '1'" />
              <img :src="huanzhemorentouxiang" class="img" v-if="item.DetailUserType == '2'" />
            </div>
          </div>
        </scroll-view>
        <div ref="headers"></div>
      </div>
    </div>
    <div class="send">
      <!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
      <!-- #ifndef APP-NVUE -->
      <u-input v-model="value">
        <!-- #endif -->
        <!-- #ifdef APP-NVUE -->
        <u--input v-model="value">
          <!-- #endif -->
          <template slot="suffix">
            <div class="btn" @click="sendInfo">发 送</div>
            <!-- <u-button text="" iconColor='#006aec' type="success"></u-button> -->
          </template>
          <!-- #ifdef APP-NVUE -->
        </u--input>
        <!-- #endif -->
        <!-- #ifndef APP-NVUE -->
      </u-input>
      <!-- #endif -->
    </div>
  </div>
</template>

<script>
import { messagemaindetails, setMessagemaindetails } from "@/api/patient.js"
export default {
  data () {
    return {
      messageList: [],
      value: "",
      MainId: "",
      scrollTopHeight: "",
      newDataHeight: 1000,
      title: "联系医生",
      PatientName: "",
      type: ""
    };
  },
  onLoad (param) {
    this.type = param.type;
    this.MainId = param.MainId;
    this.PatientName = param.PatientName
  },
  mounted () {
    if (this.type == 'doctor') {
      this.getMessage()
      this.title = this.PatientName
    } else {
      this.getMessage()
    }
  },
  methods: {
    getTime () {
      let stopTime = new Date() //获取目前的时间
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
      let newTmm = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second //现在格式为2021-11-22 13:53:12
      return newTmm
    },
    async getMessage () {
      let res = await messagemaindetails(this.MainId);
      let arr = res.Response.items.reverse();
      arr.forEach((i) => {
        if (this.type == 'doctor') {
          if (i.DetailUserType == '2') {
            i.className = 'doctor'
          }
          if (i.DetailUserType == '1') {
            i.className = 'patient'
          }
        } else {
          if (i.DetailUserType == '1') {
            i.className = 'doctor'
          }
          if (i.DetailUserType == '2') {
            i.className = 'patient'
          }
        }
      })
      this.messageList = arr;
      this.returnTop()
    },
    returnTop () {
      uni.getSystemInfo({
        success: res => { //res.windowHeight是返回的屏幕高度
          this.$nextTick(() => {
            this.scrollTopHeight = res.windowHeight + this.newDataHeight * 1000
          })
        }
      });
    },
    async sendInfo () {
      if (this.$util.isEmpty(this.value)) {
        return uni.showToast({
          title: '消息不可为空！',
          icon: 'none',
        });
      }
      let param = {
        MainId: this.MainId,
        DetailTime: this.getTime(),
        DetailContent: this.value,
        DetailUserType: "2"
      }
      if (this.type == 'doctor') param.DetailUserType = '1'
      await setMessagemaindetails(param)
      this.value = "";
      this.newDataHeight = this.newDataHeight + 1000
      this.getMessage();
    },
    back () {
      uni.navigateBack();
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .u-input {
    padding: 0px 0px 0px 6px !important;
  }
}
.btn {
  height: 44px;
  background: #006aec;
  border-radius: 5px;
  font-size: 18px;
  color: #ffffff;
  line-height: 44px;
  text-align: center;
  width: 100px;
}
.t_c {
  text-align: center !important;
}
.send {
  padding: 10px 10px 2px 10px;
}
.main {
  height: calc(100vh - 160px);
  overflow: auto;
}
.patient {
  display: flex;
  box-sizing: border-box;
  border: 1px solid transparent;

  .img {
    width: 34px;
    height: 34px;
    border-radius: 17px;
    margin-top: 50px !important;
  }
  .left-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    .name {
      text-align: right;
      color: #666666;
      font-size: 14px;
      line-height: 30px;
      float: right;
      margin-right: 10px;
    }
  }
  /deep/.u-avatar {
    display: inline-block;
    width: 34px;
    margin-top: 100px !important;
    height: 100%;
  }
  .comment {
    width: 60%;
    padding: 8px 16px;
    line-height: 30px;
    word-break: break-all;
    position: relative;
    margin: 0px 100px 0;
    background: #fff;
    color: #222222;
    border-radius: 5px;
    box-shadow: -2px 0px 8px 0px rgba(61, 61, 62, 0.17);
  }
  .comment:after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 5px;
    right: -10px;
    border: solid 8px;
    border-color: transparent transparent transparent #fff;
    font-size: 0;
  }
}
.doctor {
  display: flex;
  box-sizing: border-box;
  border: 1px solid transparent;
  flex-direction: row-reverse;

  .img {
    width: 34px;
    height: 34px;
    margin-top: 50px !important;
  }
  .left-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    .name {
      text-align: left;
      color: #666666;
      font-size: 14px;
      line-height: 30px;
      margin-left: 20px;
    }
  }
  /deep/.u-avatar {
    height: 100%;
    image {
      display: inline-block;
      width: 34px;
      margin-top: 100px !important;
    }
  }
  .comment {
    width: 60%;
    padding: 8px 5px;
    line-height: 30px;
    word-break: break-all;
    position: relative;
    margin: 0px 20px 0;
    background: #fff;
    color: #222222;
    border-radius: 5px;
    box-shadow: -2px 0px 8px 0px rgba(61, 61, 62, 0.17);
  }
  .comment:after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 5px;
    left: -20px;
    border: solid 12px;
    border-color: transparent #fff transparent transparent;
    font-size: 0;
  }
}
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
    width: calc(100vw - 60px);
  }
}
</style>
