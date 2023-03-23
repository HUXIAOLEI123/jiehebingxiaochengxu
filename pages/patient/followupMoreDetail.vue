<template>
  <div>
    <u-notify ref="uNotify"></u-notify>
    <sysHead text="随访详情" showBack></sysHead>
    <div class="main">
      <div class="item">
        <div class="row">
          <div class="cGray">姓名:</div>
          <div class="c252D57">{{ formDate.Name }}</div>
        </div>
        <div class="row">
          <div class="cGray">随访时间:</div>
          <div class="c252D57">{{ formDate.VisitDate }}</div>
        </div>
        <div class="row">
          <div class="cGray">治疗月序:</div>
          <div class="c252D57">{{ formDate.TreatmentMonth }}</div>
        </div>
        <div class="row">
          <div class="cGray">督导人员:</div>
          <div class="c252D57">{{ formDate.SupervisorName }}</div>
        </div>
        <div class="row">
          <div class="cGray">随访方式:</div>
          <div class="c252D57">{{ formDate.VisitTypeName }}</div>
        </div>
        <div class="division">症状及体征</div>
        <div class="row">
          <div class="cGray">症状及体征:</div>
        </div>
        <uni-data-checkbox v-model="formDate.Symptom" :localdata="enumData.A0023" multiple></uni-data-checkbox>
        <div class="row">
          <div class="cGray">症状及体征其他:</div>
          <div class="c252D57">{{ formDate.SymptomOther || '' }}</div>
        </div>
        <div class="division">生活方式指导</div>
        <div class="row">
          <div class="cGray">吸烟:</div>
          <div class="c252D57">{{ formDate.Smoking || 0 }}/支</div>
        </div>
        <div class="row">
          <div class="cGray">饮酒:</div>
          <div class="c252D57">{{ formDate.Alcohol || 0 }}/两</div>
        </div>
        <div class="division">用药</div>
        <div class="row">
          <div class="cGray">化疗方案:</div>
          <div class="c252D57">{{ formDate.TreatmentPlan }}</div>
        </div>
        <div class="row">
          <div class="cGray">用法:</div>
        </div>
        <uni-data-checkbox v-model="formDate.DrugUsage" :localdata="enumData.A0027" multiple></uni-data-checkbox>
        <div class="row">
          <div class="cGray">药品剂型:</div>
        </div>
        <uni-data-checkbox v-model="formDate.DrugsType" :localdata="enumData.A0025" multiple></uni-data-checkbox>
        <div class="row">
          <div class="cGray">漏服药次数:</div>
          <div class="c252D57">{{ formDate.MissedMedicationTimes }}次</div>
        </div>
        <div class="row">
          <div class="cGray">有无药物不良反应:</div>
          <div class="c252D57">{{ formDate.ADRName }}</div>
        </div>
        <div class="row" v-if="formDate.ADR == '1'">
          <div class="cGray">药物不良反应描述:</div>
          <div class="c252D57">{{ formDate.ADRDesc }}</div>
        </div>
        <div class="row">
          <div class="cGray">有无并发症或合并症:</div>
          <div class="c252D57">{{ formDate.ComplicationName }}</div>
        </div>
        <div class="row" v-if="formDate.Complication == '1'">
          <div class="cGray">并发症或合并症描述:</div>
          <div class="c252D57">{{ formDate.ComplicationDesc }}</div>
        </div>
        <div class="division">转诊</div>
        <div class="row">
          <div class="cGray">是否转诊:</div>
          <div class="c252D57">{{ formDate.IsReferral == true ? '是' : '否' }}</div>
        </div>
        <tempalte v-if="formDate.IsReferral">
          <div class="row">
            <div class="cGray">转诊科别:</div>
            <div class="c252D57">{{ formDate.ReferralDepartment }}</div>
          </div>
          <div class="row">
            <div class="cGray">转诊原因:</div>
            <div class="c252D57">{{ formDate.ReferralReason }}</div>
          </div>
          <div class="row">
            <div class="cGray">2周内随访,随访结果:</div>
            <div class="c252D57">{{ formDate.FollowUpResults }}</div>
          </div>
        </tempalte>
        <div class="row">
          <div class="cGray">处理意见:</div>
          <div class="c252D57">{{ formDate.HandlingOpinions }}</div>
        </div>
        <div class="row">
          <div class="cGray">下次随访时间:</div>
          <div class="c252D57">{{ formDate.NextVisitDate }}</div>
        </div>
        <div class="row">
          <div class="cGray">随访医生签名:</div>
          <div class="c252D57">{{ formDate.FollowDoctorName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pulmonarypatientvisits } from "@/api/patient.js"
import { dictionarycategory } from "@/api/dictionaryCategory.js"
export default {
  data () {
    return {
      VisitId: "",
      formDate: {},
      enumData: {
        A0023: [],
        A0027: [],
        A0025: []
      },
    };
  },
  onLoad (param) {
    if (param.VisitId) {
      this.VisitId = param.VisitId
      this.getList()
    }
  },
  created () {
    this.getEnum()
  },
  methods: {
    async getList () {
      let res = await pulmonarypatientvisits({ VisitId: this.VisitId });
      for (let i in res.Response) {
        if (res.Response[i] == null || res.Response[i] == undefined) {
          res.Response[i] = ''
        }
      }
      this.formDate = res.Response;
      this.formDate.Symptom = this.formDate.Symptom.split(',')
      this.formDate.DrugUsage = this.formDate.DrugUsage.split(',')
      this.formDate.DrugsType = this.formDate.DrugsType.split(',')
    },
    async getEnum () {
      let res = await dictionarycategory({ CategoryCode: "A0023,A0027,A0025" });
      let arr = res.Response.items;
      arr.forEach((i) => {
        i.text = i.DetailsName,
          i.value = i.DetailsCode,
          i.disable = true
      })
      this.enumData.A0023 = arr.filter((i) => i.CategoryCode == 'A0023');
      this.enumData.A0027 = arr.filter((i) => i.CategoryCode == 'A0027');
      this.enumData.A0025 = arr.filter((i) => i.CategoryCode == 'A0025');
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .uni-data-checklist {
    // margin-top: -35px !important;
    margin-left: 20px !important;
  }
}
.division {
  width: 100%;
  text-align: left;
  font-weight: 600;
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
  margin-top: 6px;
  background: #fff;
  padding: 0px 13px;
  font-size: 17px;
  line-height: 35px;
  .item {
    padding: 10px 0px;
    .row {
      margin-left: 10px;
      display: flex;
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
