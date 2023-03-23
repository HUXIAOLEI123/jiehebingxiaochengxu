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
          <div class="c252D57">{{ formDate.FirstVisitDate }}</div>
        </div>
        <div class="row">
          <div class="cGray">随访方式:</div>
          <div class="c252D57">{{ formDate.FirstVisitTypeName }}</div>
        </div>
        <div class="row">
          <div class="cGray">患者类型:</div>
          <div class="c252D57">{{ formDate.PatientTypeName }}</div>
        </div>
        <div class="row">
          <div class="cGray">痰菌情况:</div>
        </div>
        <uni-data-checkbox v-model="formDate.Sputum" :localdata="enumData.A0015" multiple></uni-data-checkbox>
        <div class="row">
          <div class="cGray">耐药情况:</div>
        </div>
        <uni-data-checkbox v-model="formDate.Endurance" :localdata="enumData.A0024" multiple></uni-data-checkbox>
        <div class="division">症状及体征</div>
        <uni-data-checkbox v-model="formDate.Symptom" :localdata="enumData.A0023" multiple></uni-data-checkbox>
        <div class="row">
          <div class="cGray">其他症状:</div>
          <div class="c252D57">{{ formDate.SymptomOther || '无' }}</div>
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
          <div class="cGray">督导人员选择:</div>
          <div class="c252D57">{{ formDate.SupervisorName }}</div>
        </div>
        <div class="division">家庭居住环境评估</div>
        <div class="row">
          <div class="cGray">单独的居室:</div>
          <div class="c252D57">{{ formDate.AloneHonceName }}</div>
        </div>
        <div class="row">
          <div class="cGray">通风情况:</div>
          <div class="c252D57">{{ formDate.AerationName }}</div>
        </div>
        <div class="division">生活方式评估</div>
        <div class="row">
          <div class="cGray">吸烟:</div>
          <div class="c252D57">{{ formDate.Smoking || 0 }}只/日</div>
        </div>
        <div class="row">
          <div class="cGray">饮酒:</div>
          <div class="c252D57">{{ formDate.Alcohol || 0 }}两/日</div>
        </div>
        <div class="division">健康教育及培训</div>
        <div class="row">
          <div class="cGray">取药地点:</div>
          <div class="c252D57">{{ formDate.DrugPlace }}</div>
        </div>
        <div class="row">
          <div class="cGray">时间:</div>
          <div class="c252D57">{{ formDate.DrugTime }}</div>
        </div>
        <div class="row">
          <div class="cGray">服药记录卡的填写:</div>
          <div class="c252D57">{{ formDate.RecordCardName }}</div>
        </div>
        <div class="row">
          <div class="cGray">服药方法及药品存放:</div>
          <div class="c252D57">{{ formDate.MethodName }}</div>
        </div>
        <div class="row">
          <div class="cGray">肺结核治疗疗程:</div>
          <div class="c252D57">{{ formDate.ProcessName }}</div>
        </div>
        <div class="row">
          <div class="cGray">不规律服药危害:</div>
          <div class="c252D57">{{ formDate.HarmName }}</div>
        </div>
        <div class="row">
          <div class="cGray">服药后不良反应及处理:</div>
          <div class="c252D57">{{ formDate.AdverseReactionName }}</div>
        </div>
        <div class="row">
          <div class="cGray">治疗期间复诊查痰:</div>
          <div class="c252D57">{{ formDate.SputumExaminationName }}</div>
        </div>
        <div class="row">
          <div class="cGray">外出期间如何坚持服药:</div>
          <div class="c252D57">{{ formDate.GoOutMedicationName }}</div>
        </div>
        <div class="row">
          <div class="cGray">生活习惯及注意事项:</div>
          <div class="c252D57">{{ formDate.LifehabitName }}</div>
        </div>
        <div class="row">
          <div class="cGray">密切接触者检查:</div>
          <div class="c252D57">{{ formDate.CloseContactName }}</div>
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
import { pulmonaryfirstvisitsFirstVisitId } from "@/api/patient.js"
import { dictionarycategory } from "@/api/dictionaryCategory.js"
export default {
  data () {
    return {
      VisitId: "",
      formDate: {},
      enumData: {
        A0023: [],
        A0027: [],
        A0025: [],
        A0015: [],
        A0024: [],
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
      let res = await pulmonaryfirstvisitsFirstVisitId({ VisitId: this.VisitId });
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
      let res = await dictionarycategory({ CategoryCode: "A0023,A0027,A0025,A0015,A0024" });
      let arr = res.Response.items;
      arr.forEach((i) => {
        i.text = i.DetailsName,
          i.value = i.DetailsCode,
          i.disable = true
      })
      this.enumData.A0023 = arr.filter((i) => i.CategoryCode == 'A0023');
      this.enumData.A0027 = arr.filter((i) => i.CategoryCode == 'A0027');
      this.enumData.A0025 = arr.filter((i) => i.CategoryCode == 'A0025');
      this.enumData.A0015 = arr.filter((i) => i.CategoryCode == 'A0015');
      this.enumData.A0024 = arr.filter((i) => i.CategoryCode == 'A0024');
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
/deep/ .u-checkbox-label--left {
  display: inline-block;
  width: 30%;
  vertical-align: middle;
}

/deep/ .u-checkbox__icon-wrap--square {
  display: inline-block;
  vertical-align: middle;
}
.division {
  width: 100%;
  text-align: left;
  font-weight: 600;
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
