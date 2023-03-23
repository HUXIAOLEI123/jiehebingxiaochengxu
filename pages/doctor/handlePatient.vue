<template>
  <div>
    <sysHead text="不良反应处置" showBack></sysHead>
    <div class="card mt20">
      <div class="patientName">
        <div>
          <span>{{ formDate.Name }}</span>
          <span class="age">{{ formDate.Age }}岁</span>
        </div>
        <div class="sex">{{ formDate.SexName }}</div>
      </div>
      <div class="row">
        <div class="label">紧急联系人:</div>
        <div class="value">{{ formDate.ContactName }}</div>
      </div>
      <div class="row">
        <div class="label">联系电话:</div>
        <div class="value">{{ formDate.ContactPhone }}</div>
      </div>
      <div class="row">
        <div class="label">详细住址:</div>
        <div class="value">{{ formDate.Address }}</div>
      </div>
      <div class="row">
        <div class="label">患者类型:</div>
        <div class="value">{{ formDate.PatientTypeName }}</div>
      </div>
      <div class="row">
        <div class="label">治疗方案:</div>
        <div class="value">{{ formDate.TreatmentPlanName }}</div>
      </div>
    </div>
    <div class="card">
      <div class="patientName">不良反应处置</div>
      <div class="row">
        <div class="label">不良反应时长:</div>
        <div class="value">
          {{ formDate.AdverseReactiondurationName }}
        </div>
      </div>
      <div class="row2">
        <div class="label">不良反应:</div>
        <div class="value">{{ formDate.AdverseReactionName }}</div>
      </div>
      <div class="row2">
        <div class="label">其他不良反应:</div>
        <div class="value">{{ formDate.AdverseReactionOther }}</div>
      </div>
      <div class="row">
        <div class="label">提交时间:</div>
        <div class="value">
          {{ formDate.SubmitTime }}
        </div>
      </div>
      <template v-if="formDate.opt == 'add'">
        <div>
          <div class="label mb10">
            <span class="required">*</span>
            不良反应处置:
          </div>
          <u--textarea class="input" confirmType="done" v-model="managementMethod"></u--textarea>
        </div>
        <div class="row">
          <div class="label">处置时间:</div>
          <div class="value">
            {{ formDate.ManagementTime }}
          </div>
        </div>
        <div class="submit" @click="submit">提交</div>
      </template>
      <template v-if="formDate.opt == 'detail'">
        <div class="row2">
          <div class="label">不良反应处置:</div>
          <div class="value">{{ formDate.managementMethod }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { pulmonarybadreactionsBadReactionId, pulmonarybadreactionsManagement } from "@/api/doctor.js"
export default {
  data () {
    return {
      formDate: {
        badReactionId: "",
        opt: "",
      },
      managementMethod: ""
    };
  },
  created () {
  },
  onLoad (param) {
    this.formDate.badReactionId = param.badReactionId;
    this.formDate.opt = param.opt;
  },
  mounted () {
    this.getData()
  },
  methods: {
    //获取患者信息
    async getData () {
      let res = await pulmonarybadreactionsBadReactionId(this.formDate.badReactionId)
      let obj = Object.assign(this.formDate, res.Response)
      this.formDate = this.$util.formatObj(obj)
      this.$forceUpdate()
    },
    //提交不良反应信息
    async submit () {
      if (!this.managementMethod) {
        return uni.showToast({
          title: "不良反应处置不可为空",
          icon: "none",
          position: "top"
        })
      }
      await pulmonarybadreactionsManagement({
        managementMethod: '"' + this.managementMethod + '"',
        badReactionId: this.formDate.badReactionId
      })
      uni.showToast({
        title: "处置成功",
        icon: "none",
        position: "top"
      })
      uni.navigateBack();
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
.submit {
  width: 90%;
  margin-left: 5%;
  margin-top: 24px;
  background: #006aec;
  border-radius: 4px;
  text-align: center;
  line-height: 44px;
  font-size: 15px;
  color: #ffffff;
}
.card {
  background: #fff;
  padding: 17px;
  .patientName {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    color: #252d57;
    height: 50px;
    line-height: 35px;
    border-bottom: 1px solid #dddddd;
    .age {
      font-size: 14px;
      color: #006aec;
      line-height: 35px;
      padding: 3px 8px;
      border: 1px solid #006aec;
      border-radius: 2px;
      margin-left: 7px;
    }
    .sex {
      font-size: 17px;
      color: #666666;
      line-height: 35px;
      margin-right: 3px;
    }
  }
  .row {
    display: flex;
    justify-content: space-between;
    line-height: 35px;
    font-size: 17px;
    margin-bottom: 1px;
    .label {
      color: #666666;
      width: 120px !important;
    }
    .value {
      color: #252d57;
    }
  }
  .label {
    color: #666666;
  }
  .input {
    margin-top: 15px;
  }
  .row2 {
    display: flex;
    justify-content: space-between;
    line-height: 35px;
    font-size: 17px;
    margin-bottom: 1px;
    .label {
      width: 120px !important;
      color: #666666;
    }
    .value {
      color: #252d57;
      margin-left: 9px;
    }
  }
}
</style>
