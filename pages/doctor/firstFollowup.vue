<template>
  <div>
    <u-notify ref="uNotify"></u-notify>
    <sysHead text="随访登记" showBack></sysHead>
    <div class="main">
      <div class="item">
        <div class="row">
          <div class="cGray">姓名:</div>
          <div class="c252D57">{{ formDate.Name }}</div>
        </div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            <span>随访时间:</span>
          </div>
          <sysDatetimePicker v-model="formDate.FirstVisitDate" mode="datetime"></sysDatetimePicker>
        </div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            <span>患者类型:</span>
          </div>
          <uni-data-checkbox v-model="formDate.PatientType" :localdata="enumData.A0014"></uni-data-checkbox>
        </div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            随访方式:
          </div>
          <div class="c252D57" @click="select('A0022')">
            {{ formDate.FirstVisitTypeName || '点击选择' }}
          </div>
        </div>
        <div class="division">症状及体征</div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            症状及体征:
          </div>
        </div>
        <uni-data-checkbox v-model="formDate.Symptom" :localdata="enumData.A0023" multiple></uni-data-checkbox>
        <div class="row">
          <div class="cGray">其他症状:</div>
          <div class="c252D57">
            <u--input placeholder="请输入" v-model="formDate.SymptomOther"></u--input>
          </div>
        </div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            耐药情况:
          </div>
        </div>
        <uni-data-checkbox v-model="formDate.Endurance" :localdata="enumData.A0024"></uni-data-checkbox>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            痰菌情况:
          </div>
        </div>
        <uni-data-checkbox v-model="formDate.Sputum" :localdata="enumData.A0015"></uni-data-checkbox>
        <div class="division">用药</div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            化疗方案:
          </div>
          <div class="c252D57">{{ formDate.TreatmentPlan }}</div>
        </div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            用法:
          </div>
          <uni-data-checkbox v-model="formDate.DrugUsage" :localdata="enumData.A0027"></uni-data-checkbox>
        </div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            药品剂型:
          </div>
        </div>
        <uni-data-checkbox v-model="formDate.DrugsType" :localdata="enumData.A0025" multiple></uni-data-checkbox>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            督导人员:
          </div>
          <div class="c252D57" @click="select('A0026')">
            {{ formDate.SupervisorName || '点击选择' }}
          </div>
        </div>
        <div class="row">
          <div class="cGray">其他督导人员:</div>
          <div class="c252D57">
            <u--input placeholder="请输入" v-model="formDate.SupervisorOther"></u--input>
          </div>
        </div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            单独居室:
          </div>
        </div>
        <uni-data-checkbox v-model="formDate.AloneHonce" :localdata="enumData.A0002"></uni-data-checkbox>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            通风情况:
          </div>
        </div>
        <uni-data-checkbox v-model="formDate.Aeration" :localdata="enumData.A0028"></uni-data-checkbox>
        <div class="row">
          <div class="cGray">日吸烟量:</div>
          <div class="c252D57">
            <u--input placeholder="请输入" v-model="formDate.Smoking"></u--input>
          </div>
        </div>
        <div class="row">
          <div class="cGray">建议日吸烟量:</div>
          <div class="c252D57">
            <u--input placeholder="请输入" v-model="formDate.ProposalSmoking"></u--input>
          </div>
        </div>
        <div class="row">
          <div class="cGray">日饮酒量:</div>
          <div class="c252D57">
            <u--input placeholder="请输入" v-model="formDate.Alcohol"></u--input>
          </div>
        </div>
        <div class="row">
          <div class="cGray">建议日饮酒量:</div>
          <div class="c252D57">
            <u--input placeholder="请输入" v-model="formDate.ProposalAlcohol"></u--input>
          </div>
        </div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            取药时间:
          </div>
          <sysDatetimePicker v-model="formDate.DrugTime" mode="datetime"></sysDatetimePicker>
        </div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            取药地点:
          </div>
          <div class="c252D57">
            <u--input placeholder="请输入" v-model="formDate.DrugPlace"></u--input>
          </div>
        </div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            服药记录卡的填写:
          </div>
        </div>
        <uni-data-checkbox v-model="formDate.RecordCard" :localdata="enumData.A0029"></uni-data-checkbox>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            服药方法及药品存放:
          </div>
        </div>
        <uni-data-checkbox v-model="formDate.Method" :localdata="enumData.A0029"></uni-data-checkbox>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            肺结核治疗疗程:
          </div>
        </div>
        <uni-data-checkbox v-model="formDate.Process" :localdata="enumData.A0029"></uni-data-checkbox>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            不规律服药危害:
          </div>
        </div>
        <uni-data-checkbox v-model="formDate.Harm" :localdata="enumData.A0029"></uni-data-checkbox>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            服药后不良反应及处理:
          </div>
        </div>
        <uni-data-checkbox v-model="formDate.AdverseReaction" :localdata="enumData.A0029"></uni-data-checkbox>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            治疗期间复诊查痰:
          </div>
        </div>
        <uni-data-checkbox v-model="formDate.SputumExamination" :localdata="enumData.A0029"></uni-data-checkbox>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            外出期间如何坚持服药:
          </div>
        </div>
        <uni-data-checkbox v-model="formDate.GoOutMedication" :localdata="enumData.A0029"></uni-data-checkbox>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            生活习惯及注意事项:
          </div>
        </div>
        <uni-data-checkbox v-model="formDate.Lifehabit" :localdata="enumData.A0029"></uni-data-checkbox>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            密切接触者检查:
          </div>
        </div>
        <uni-data-checkbox v-model="formDate.CloseContact" :localdata="enumData.A0029"></uni-data-checkbox>

        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            下次随访时间:
          </div>
          <sysDatetimePicker v-model="formDate.NextVisitDate"></sysDatetimePicker>
        </div>
        <div class="row">
          <div class="cGray">备注:</div>
          <div class="c252D57">
            <u--input placeholder="请输入" v-model="formDate.Remarks"></u--input>
          </div>
        </div>
      </div>
    </div>
    <wyb-action-sheet ref="actionSheet" :options="actionSheetDate" @itemclick="selectValue" />
    <div class="btn" @click="SubmitConfirm">提交</div>
    <div style="width: 100%; height: 10px"></div>
  </div>
</template>

<script>
import { addPulmonaryfirstvisits, updataPulmonaryfirstvisits } from "@/api/doctor.js"
import { pulmonaryfirstvisitsFirstVisitId } from "@/api/patient.js"
import { dictionarycategory } from "@/api/dictionaryCategory.js"
export default {
  data () {
    return {
      VisitId: "",
      formDate: {
        FirstVisitDate: "",
        NextVisitDate: "",
        DrugTime: "",
        Symptom: [],
        DrugsType: [],
      },
      actionSheetDate: [],
      actionSheetType: "",
      enumData: {
        A0002: [],
        A0014: [],
        A0022: [],
        A0023: [],
        A0024: [],
        A0015: [],
        A0025: [],
        A0026: [],
        A0027: [],
        A0028: [],
        A0029: [],
      },
      VisitId: "",
      copyFormData: {}
    };
  },
  onLoad (param) {
    this.formDate.Name = param.Name;
    this.formDate.DiagnosisId = param.DiagnosisId;
    this.formDate.PersonId = param.PersonId;
    this.formDate.TreatmentPlan = param.TreatmentPlan;
    this.formDate.FileNumber = param.FileNumber;
    if (param.VisitId) {
      this.getDetail(param.VisitId)
      this.VisitId = param.VisitId
    }
  },
  created () {
    this.getEnum()
    var date = new Date();
    date.setMonth(date.getMonth() + 1);
    this.formDate.NextVisitDate = this.$util.getTime(date)
  },
  methods: {
    //获取患者信息
    async getDetail (VisitId) {
      let res = await pulmonaryfirstvisitsFirstVisitId({ VisitId: VisitId });
      this.formDate = { ...res.Response }
      this.formDate.Symptom = res.Response.Symptom.split(",")
      this.formDate.DrugsType = res.Response.DrugsType.split(",")
      this.formDate.DrugTime = res.Response.DrugTime.slice(0,10)
      this.formDate.FirstVisitDate = res.Response.FirstVisitDate.slice(0,10)
      this.formDate.NextVisitDate = res.Response.NextVisitDate.slice(0,10)
      this.copyFormData = { ...res.Response }
    },
    //提交
    async SubmitConfirm () {
      let formDate = Object.assign({}, this.formDate);
      formDate.Symptom = formDate.Symptom.join(",")
      formDate.DrugsType = formDate.DrugsType.join(",")
      let str = "FirstVisitDate,PatientType,FirstVisitType,Symptom,Endurance,Sputum,DrugsType,Supervisor,DrugUsage,AloneHonce,Aeration,DrugTime,DrugPlace,RecordCard,Method,Process,Harm,AdverseReaction,SputumExamination,GoOutMedication,Lifehabit,CloseContact,NextVisitDate"
      let arr = str.split(",");
      for (let item of arr) {
        if (!formDate[item]) {
          return uni.showToast({
            title: "还有必填项未填写",
            icon: "none",
            position: "top"
          })
        }
      }
      if (this.VisitId) {
        let arr = this.$util.compareObj(formDate, this.copyFormData)
        var data = {
          firstVisitId: this.VisitId,
          arr
        }
        await updataPulmonaryfirstvisits(data);
      } else {
        await addPulmonaryfirstvisits(formDate);
      }
      uni.navigateBack();
    },
    //点击下拉
    select (type) {
      this.actionSheetDate = this.enumData[type];
      this.actionSheetType = type;
      this.$refs.actionSheet.showActionSheet()
    },
    //下拉选择事件
    selectValue (e) {
      switch (this.actionSheetType) {
        case 'A0026':
          this.formDate.SupervisorName = e.DetailsName
          this.formDate.Supervisor = e.DetailsCode
          break;
        case "A0022":
          this.formDate.FirstVisitTypeName = e.DetailsName
          this.formDate.FirstVisitType = e.DetailsCode
          break;
      }
      this.$forceUpdate()
    },
    async getEnum () {
      let res = await dictionarycategory({ CategoryCode: "A0002,A0014,A0022,A0023,A0024,A0025,A0026,A0027,A0028,A0029,A0015" });
      let arr = res.Response.items;
      arr.forEach((i) => {
        i.text = i.DetailsName,
          i.label = i.DetailsName,
          i.value = i.DetailsCode
      })
      this.enumData.A0002 = arr.filter((i) => i.CategoryCode == 'A0002');
      this.enumData.A0014 = arr.filter((i) => i.CategoryCode == 'A0014');
      this.enumData.A0022 = arr.filter((i) => i.CategoryCode == 'A0022');
      this.enumData.A0023 = arr.filter((i) => i.CategoryCode == 'A0023');
      this.enumData.A0024 = arr.filter((i) => i.CategoryCode == 'A0024');
      this.enumData.A0025 = arr.filter((i) => i.CategoryCode == 'A0025');
      this.enumData.A0026 = arr.filter((i) => i.CategoryCode == 'A0026');
      this.enumData.A0027 = arr.filter((i) => i.CategoryCode == 'A0027');
      this.enumData.A0028 = arr.filter((i) => i.CategoryCode == 'A0028');
      this.enumData.A0029 = arr.filter((i) => i.CategoryCode == 'A0029');
      this.enumData.A0015 = arr.filter((i) => i.CategoryCode == 'A0015');
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .uni-data-checklist {
    margin-left: 20px !important;
  }
}
.required {
  margin-right: 5px;
  color: red;
}
.btn {
  width: 96%;
  height: 44px;
  margin: 10px 2% 10px 2%;
  text-align: center;
  background: #006aec;
  border-radius: 10px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 44px;
  color: #ffffff;
}
.division {
  width: 100%;
  text-align: left;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #252d57;
  line-height: 35px;
}
/deep/ .u-checkbox-label--left {
  display: inline-block;
  width: 30%;
  vertical-align: middle;
}

/deep/ .u-checkbox__icon-wrap--square {
  display: inline-block;
  vertical-align: middle;
}
.mt-40 {
  margin-top: -40px;
}
.main {
  margin-top: 20px;
  background: #fff;
  padding: 0px 13px;
  font-size: 17px;
  line-height: 35px;
  .item {
    padding: 10px 0px;
    .row {
      padding: 5px 0px;
      margin-left: 10px;
      display: flex;
      border-bottom: 1px solid #f2f2f2;
      justify-content: space-between;
    }
  }
}
.search {
  background: #fff;
  padding: 8px 12px 18px 12px;
  margin-top: 8px;
}
</style>
