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
          <sysDatetimePicker v-model="formDate.VisitDate" mode="datetime"></sysDatetimePicker>
        </div>
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
            <u-input placeholder="请输入" v-model="formDate.SupervisorOther"></u-input>
          </div>
        </div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            随访方式:
          </div>
          <div class="c252D57" @click="select('A0022')">
            {{ formDate.VisitTypeName || '点击选择' }}
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
          <div class="cGray">症状及体征其他:</div>
          <div class="c252D57">
            <u-input placeholder="请输入" v-model="formDate.SymptomOther"></u-input>
          </div>
        </div>
        <div class="division">生活方式指导</div>
        <div class="row">
          <div class="cGray">日吸烟量:</div>
          <div class="c252D57">
            <u-input placeholder="请输入" v-model="formDate.Smoking"></u-input>
          </div>
        </div>
        <div class="row">
          <div class="cGray">建议日吸烟量:</div>
          <div class="c252D57">
            <u-input placeholder="请输入" v-model="formDate.ProposalSmoking"></u-input>
          </div>
        </div>
        <div class="row">
          <div class="cGray">日饮酒量:</div>
          <div class="c252D57">
            <u-input placeholder="请输入" v-model="formDate.Alcohol"></u-input>
          </div>
        </div>
        <div class="row">
          <div class="cGray">建议日饮酒量:</div>
          <div class="c252D57">
            <u-input placeholder="请输入" v-model="formDate.ProposalAlcohol"></u-input>
          </div>
        </div>
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
            漏服药次数:
          </div>
          <div class="c252D57">
            <u-input placeholder="请输入" v-model="formDate.MissedMedicationTimes"></u-input>
          </div>
        </div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            有无药物不良反应:
          </div>
          <uni-data-checkbox v-model="formDate.ADR" :localdata="enumData.A0002"></uni-data-checkbox>
        </div>
        <div class="row" v-if="formDate.ADR == '1'">
          <div class="cGray">药物不良反应描述:</div>
          <div class="c252D57">
            <u-input placeholder="请输入" v-model="formDate.ADRDesc"></u-input>
          </div>
        </div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            有无并发症或合并症:
          </div>
          <uni-data-checkbox v-model="formDate.Complication" :localdata="enumData.A0002"></uni-data-checkbox>
        </div>
        <div class="row" v-if="formDate.Complication == '1'">
          <div class="cGray">并发症或合并症描述:</div>
          <div class="c252D57">
            <u-input placeholder="请输入" v-model="formDate.ComplicationDesc"></u-input>
          </div>
        </div>
        <div class="division">转诊</div>
        <div class="row">
          <div class="cGray">
            <span class="required">*</span>
            是否转诊:
          </div>
          <uni-data-checkbox v-model="formDate.IsReferral" :localdata="enumData.IsReferral"></uni-data-checkbox>
        </div>
        <tempalte v-if="formDate.IsReferral">
          <div class="row">
            <div class="cGray">转诊科别:</div>
            <div class="c252D57">
              <u-input placeholder="请输入" v-model="formDate.ReferralDepartment"></u-input>
            </div>
          </div>
          <div class="row">
            <div class="cGray">转诊原因:</div>
            <div class="c252D57">
              <u-input placeholder="请输入" v-model="formDate.ReferralReason"></u-input>
            </div>
          </div>
          <div class="row">
            <div class="cGray">2周内随访,随访结果:</div>
            <div class="c252D57">
              <u-input placeholder="请输入" v-model="formDate.FollowUpResults"></u-input>
            </div>
          </div>
        </tempalte>
        <div class="row">
          <div class="cGray">处理意见:</div>
          <div class="c252D57">
            <u-input placeholder="请输入" v-model="formDate.HandlingOpinions"></u-input>
          </div>
        </div>
        <div class="row" v-if="!formDate.StopTreatmentTime">
          <div class="cGray">
            <span class="required">*</span>
            下次随访时间:
          </div>
          <sysDatetimePicker v-model="formDate.NextVisitDate"></sysDatetimePicker>
        </div>
        <div class="row">
          <div class="cGray">停止治疗时间:</div>
          <sysDatetimePicker v-model="formDate.StopTreatmentTime"></sysDatetimePicker>
        </div>
        <template v-if="formDate.StopTreatmentTime">
          <div class="row">
            <div class="cGray">停止治疗原因:</div>
          </div>
          <uni-data-checkbox v-model="formDate.StopTreatmentReason" :localdata="enumData.A0030"></uni-data-checkbox>
          <div class="row">
            <div class="cGray">应访视次数:</div>
            <div class="c252D57">
              <u-input placeholder="请输入" type="number" v-model="formDate.RequiredVisitsTimes"></u-input>
            </div>
          </div>
          <div class="row">
            <div class="cGray">实际访视次数:</div>
            <div class="c252D57">
              <u-input placeholder="请输入" type="number" v-model="formDate.ActualVisitsTimes"></u-input>
            </div>
          </div>
          <div class="row">
            <div class="cGray">应服药次数:</div>
            <div class="c252D57">
              <u-input
                placeholder="请输入"
                @blur="computeRate"
                type="number"
                v-model="formDate.RequiredMedicineTimes"
              ></u-input>
            </div>
          </div>
          <div class="row">
            <div class="cGray">实际服药次数:</div>
            <div class="c252D57">
              <u-input
                placeholder="请输入"
                @blur="computeRate"
                type="number"
                v-model="formDate.ActualMedicineTimes"
              ></u-input>
            </div>
          </div>
          <div class="row">
            <div class="cGray">服药率:</div>
            <div class="c252D57 flex">
              <u-input placeholder="请输入" v-model="formDate.MedicationRate" readonly></u-input>
              %
            </div>
          </div>
        </template>
        <div class="row">
          <div class="cGray">备注:</div>
          <div class="c252D57">
            <u-input placeholder="请输入" v-model="formDate.Remarks"></u-input>
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
import { addPulmonarypatientvisits, pulmonarypatientvisits, upDataPulmonarypatientvisits } from "@/api/doctor.js"
import { dictionarycategory } from "@/api/dictionaryCategory.js"
export default {
  data () {
    return {
      VisitId: "",
      formDate: {
        VisitDate: "",
        NextVisitDate: "",
        StopTreatmentTime: "",
        DrugUsage: '',
        Symptom: [],
        DrugsType: [],
      },
      actionSheetDate: [],
      actionSheetType: "",
      enumData: {
        A0002: [],
        A0023: [],
        A0027: [],
        A0025: [],
        A0022: [],
        A0026: [],
        A0030: [],
        IsReferral: [
          { "value": true, "text": "是" }, { "value": false, "text": "否" },
        ]
      },
      opt: "",
      copyFormData: {},
      VisitId: ""

    };
  },
  onLoad (param) {
    this.formDate.Name = param.Name;
    this.formDate.DiagnosisId = param.DiagnosisId;
    this.formDate.PersonId = param.PersonId;
    this.formDate.TreatmentPlan = param.TreatmentPlan;
    this.formDate.FileNumber = param.FileNumber;
    if (param.VisitId) {
      this.VisitId = param.VisitId
      this.getDetail(param.VisitId)
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
      let res = await pulmonarypatientvisits(VisitId);
      for (let item in res.Response) {
        if (res.Response[item] == null) {
          res.Response[item] = ''
        }
      }
      this.formDate = { ...res.Response }
      this.formDate.Symptom = res.Response.Symptom.split(",")
      this.formDate.DrugsType = res.Response.DrugsType.split(",")
      this.formDate.MissedMedicationTimes = res.Response.MissedMedicationTimes + ''
      if (res.Response.StopTreatmentTime) {
        this.formDate.StopTreatmentTime = res.Response.StopTreatmentTime.slice(0, 10)
      }
      if (res.Response.VisitDate) {
        this.formDate.VisitDate = res.Response.VisitDate.slice(0, 10)
      }
      if (res.Response.NextVisitDate) {
        this.formDate.NextVisitDate = res.Response.NextVisitDate.slice(0, 10)
      }
      this.copyFormData = { ...res.Response }
    },
    //提交
    async SubmitConfirm () {
      let formDate = Object.assign({}, this.formDate);
      formDate.Symptom = formDate.Symptom.join(",")
      formDate.DrugsType = formDate.DrugsType.join(",")
      let str = "VisitDate,Supervisor,VisitType,Symptom,TreatmentPlan,DrugUsage,DrugsType,MissedMedicationTimes,ADR,Complication,NextVisitDate"
      if (this.formDate.StopTreatmentTime) {
        str = "VisitDate,Supervisor,VisitType,Symptom,TreatmentPlan,DrugUsage,DrugsType,MissedMedicationTimes,ADR,Complication"
      }
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
      if (formDate.StopTreatmentTime) {// 如果有了治疗时间，那么就不需要下次随访时间了
        formDate.NextVisitDate = ''
      }
      if (this.VisitId) {//编辑
        let arr = this.$util.compareObj(formDate, this.copyFormData)
        var data = {
          patientVisitId: this.VisitId,
          arr
        }
        await upDataPulmonarypatientvisits(data);
      } else {
        await addPulmonarypatientvisits(formDate);
      }
      uni.navigateBack();
    },
    computeRate () {
      if (this.formDate.ActualMedicineTimes && this.formDate.RequiredMedicineTimes) {
        this.formDate.MedicationRate = Number(this.formDate.ActualMedicineTimes) / Number(this.formDate.RequiredMedicineTimes) * 100
        this.$forceUpdate()
      }
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
          this.formDate.VisitTypeName = e.DetailsName
          this.formDate.VisitType = e.DetailsCode
          break;
      }
      this.$forceUpdate()
    },
    async getEnum () {
      let res = await dictionarycategory({ CategoryCode: "A0002,A0022,A0023,A0027,A0025,A0026,A0030" });
      let arr = res.Response.items;
      arr.forEach((i) => {
        i.text = i.DetailsName,
          i.label = i.DetailsName,
          i.value = i.DetailsCode
      })
      this.enumData.A0002 = arr.filter((i) => i.CategoryCode == 'A0002');
      this.enumData.A0022 = arr.filter((i) => i.CategoryCode == 'A0022');
      this.enumData.A0023 = arr.filter((i) => i.CategoryCode == 'A0023');
      this.enumData.A0025 = arr.filter((i) => i.CategoryCode == 'A0025');
      this.enumData.A0026 = arr.filter((i) => i.CategoryCode == 'A0026');
      this.enumData.A0027 = arr.filter((i) => i.CategoryCode == 'A0027');
      this.enumData.A0030 = arr.filter((i) => i.CategoryCode == 'A0030');
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
