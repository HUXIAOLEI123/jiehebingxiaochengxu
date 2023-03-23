<template>
  <div>
    <u-datetime-picker
      :show="show"
      v-model="valueTime"
      :mode="mode"
      :formatter="formatter"
      @close="show = false"
      ref="datetimePicker"
      closeOnClickOverlay
      :defaultIndex="defaultIndex"
      @cancel="show = false"
      @confirm="selectTimeChange"
    ></u-datetime-picker>
    <div class="btn" @click="show = true">
      <span class="time">{{ selectTimeText }}</span>
      <span class="placeholder" v-if="!selectTimeText">点击选择时间</span>
      <img src="@/assets/date.png" class="icon" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //当前选中时间
    value: {
      type: [String, Number],
      default: "",
    },
    /**
     * 展示格式
     * date为日期选择，time为时间选择，year-month为年月选择 datetime为全部时间
     */
    mode: {
      type: String,
      default: "date",
    },
  },
  data () {
    return {
      show: false,
      valueTime: Number(new Date()),
      selectTimeText: "",
      defaultIndex: [2]
    };
  },
  watch: {
    value (val) {
      this.selectTimeText = this.value;
    },
  },
  onReady () {
    // 微信小程序需要用此写法
    this.$refs.datetimePicker.setFormatter(this.formatter);
  },
  created () {
    this.selectTimeText = this.value;
  },
  methods: {
    formatTime (value) {
      if (value) {
        let date = new Date(value); // 时间戳为秒：10位数
        //let date = new Date(value)    // 时间戳为毫秒：13位数
        let year = date.getFullYear();
        let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        let second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
        //date为日期选择，time为时间选择，year-month为年月选择 datetime为全部时间
        switch (this.mode) {
          case "date":
            return `${year}-${month}-${day}`;
          case "time":
            return `${hour}:${minute}`;
          case "year-month":
            return `${year}-${month}`;
          case "datetime":
            return `${year}-${month}-${day} ${hour}:${minute}`;
          default:
            return "";
        }
      } else {
        return "";
      }
    },
    formatter (type, value) {
      if (type === "year") {
        return `${value}年`;
      }
      if (type === "month") {
        return `${value}月`;
      }
      if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    selectTimeChange (e) {
      if (this.mode == "time") {
        this.selectTimeText = e.value;
      } else {
        this.selectTimeText = this.formatTime(e.value);
      }
      this.show = false;
      this.$emit("input", this.selectTimeText);
    },
  },
};
</script>
<style lang="scss" scoped>
.btn {
  width: 100%;
  height: 34px;
  border: 1px solid #dddddd;
  border-radius: 2px;
  .placeholder {
    color: #999;
    margin-left: 10px;
    font-size: 16px;
    line-height: 34px;
  }
  .time {
    margin-left: 10px;
    font-size: 18px;
    line-height: 34px;
  }
  .icon {
    width: 14px;
    height: 14px;
    float: right;
    margin: 10px;
  }
}
</style>
