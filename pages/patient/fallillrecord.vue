<template>
  <div>
    <u-notify ref="uNotify"></u-notify>
    <sysHead text="不良反应记录" showBack></sysHead>
    <div class="main">
      <div class="card">
        <div class="row">
          <div class="label">当前治疗方案:</div>
          <div class="value">传统药物治疗</div>
        </div>
        <div class="row">
          <div class="label" @click="show = true">
            <span class="cRed mr4">*</span>
            不良反应时长:
          </div>
          <div class="value" @click="show = true">
            {{ formData.AdverseReactiondurationText || '点击选择' }}
          </div>
        </div>
        <u-picker
          :show="show"
          :columns="enumData.A0020"
          keyName="text"
          @cancel="show = false"
          closeOnClickOverlay
          @chang="selectValue"
          @close="show = false"
          @confirm="selectValue"
        ></u-picker>
        <div class="row">
          <div class="label">请选择不良反应:</div>
        </div>
        <uni-data-checkbox v-model="formData.AdverseReaction" :localdata="enumData.A0023" multiple></uni-data-checkbox>
        <div class="row">
          <div class="label">其他不良反应:</div>
          <div class="value"></div>
        </div>
        <u--textarea
          v-model="formData.AdverseReactionOther"
          confirmType="done"
          style="width: calc(100vw - 40px)"
        ></u--textarea>

        <div class="row" v-if="isDoctor">
          <div class="label">处置方法:</div>
          <div class="value"></div>
        </div>
        <u--textarea
          v-if="isDoctor"
          v-model="formData.ManagementMethod"
          confirmType="done"
          style="width: calc(100vw - 40px)"
        ></u--textarea>
      </div>
      <div class="btn mt20" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
import { pulmonarybadreactionsBadreaction } from "@/api/patient.js"
import { dictionarycategory } from "@/api/dictionaryCategory.js"
const fallIllList = [
  { name: "咳嗽咳痰", value: "1" },
  { name: "低热盗汗", value: "2" },
  { name: "咳血或血痰", value: "3" },
  { name: "胸痛消瘦", value: "4" },
  { name: "恶心纳差", value: "5" },
  { name: "头痛失眠", value: "6" },
  { name: "视物模糊", value: "7" },
  { name: "皮肤瘙痒、皮疹", value: "8" },
  { name: "耳鸣、听力下降", value: "9" },
  { name: "其他", value: "10" },
];
export default {
  data () {
    return {
      fallIllList,
      show: false,
      isDoctor: null,
      checkboxValue1: [],
      DiagnosisId: "",
      formData: {
        PersonId: "",
        DiagnosisId: "",
        DataSources: 1,//1患者上传 2医牛上传
        AdverseReactionOther: "",
        AdverseReaction: [],
        AdverseReactionduration: "",
        AdverseReactiondurationText: ""
      },
      enumData: {
        A0020: [],
        A0023: []
      },
    };
  },
  created () {
    let res = this.$storage.getStorage("patientInfo")
    this.DiagnosisId = res.CurrentDiagnosisId;
    this.isDoctor = res.isDoctor;
    if (this.isDoctor) {
      this.formData.DataSources = 2
    }
    this.getEnum()
    let patientInfo = this.$storage.getStorage('patientInfo');
    this.formData.PersonId = patientInfo.PersonId;
    this.formData.DiagnosisId = patientInfo.CurrentDiagnosisId;
  },
  methods: {
    selectValue (e) {
      this.formData.AdverseReactiondurationText = e.value[0].text
      this.formData.AdverseReactionduration = e.value[0].value;
      this.show = false
    },
    async getEnum () {
      let res = await dictionarycategory({ CategoryCode: "A0020,A0023" })
      let arr = res.Response.items;
      arr.forEach((i) => {
        i.text = i.DetailsName,
          i.value = i.DetailsCode,
          i.id = i.DetailsCode
      })
      this.enumData.A0023 = arr.filter((i) => i.CategoryCode == 'A0023');
      let a0020 = arr.filter((i) => i.CategoryCode == 'A0020');
      this.enumData.A0020.push(a0020)
    },
    async submit () {
      if (this.$util.isEmpty(this.formData.AdverseReactionduration)) {
        return uni.showToast({ title: "请选择不良反应时长", icon: 'none' })
      }
      if (this.$util.isEmpty(this.formData.AdverseReactionOther) && this.formData.AdverseReaction.length == 0) {
        return uni.showToast({ title: "不良反应和其他不良反应不得都为空", icon: 'none' })
      }
      let formData = Object.assign({}, this.formData)
      formData.AdverseReaction = formData.AdverseReaction.join(",")
      await pulmonarybadreactionsBadreaction(formData);
      uni.showToast({ title: "提交成功", icon: 'none' })
      this.formData.AdverseReactiondurationText = ''
      this.formData.AdverseReactionduration = ''
      this.formData.AdverseReaction = [];
      this.formData.AdverseReactionOther = '';
      this.$forceUpdate()
      // uni.redirectTo({
      //   url: "/pages/patient/fallillRecordList?DiagnosisId=" + this.DiagnosisId,
      // });

    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  margin-top: 4px;
  background: #fff;
  padding: 0px 13px;
  font-size: 18px;
  line-height: 35px;
  .btn {
    width: calc(100vw - 26px);
    height: 44px;
    background: #006aec;
    border-radius: 5px;
    font-size: 18px;
    color: #ffffff;
    line-height: 44px;
    text-align: center;
  }
}
.card {
  background: #fff;
  margin-top: 3px;
  padding: 17px;
  .row {
    display: flex;
    justify-content: space-between;
    line-height: 35px;
    font-size: 17px;
    margin-bottom: 1px;
    .label {
      color: #666666;
      width: 160px !important;
    }
    .value {
      color: #252d57;
      word-wrap: break-word;
    }
    .look {
      color: #006aec;
    }
  }
  .label {
    color: #666666;
  }
  .input {
    margin-top: 15px;
  }
}
</style>
