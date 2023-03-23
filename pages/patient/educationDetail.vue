<template>
  <div>
    <u-notify ref="uNotify"></u-notify>
    <sysHead :text="title" showBack></sysHead>
    <div class="p10">
      <div class="F17 t_c LH35">{{ formDate.title }}</div>
      <div class="F14 c999 LH35">{{ formDate.ReleaseTime }}</div>
    </div>
    <mp-html :content="formDate.EducationContent" />
  </div>
</template>

<script>
import { healtheducationpushrecordsRead } from "@/api/patient.js"
export default {
  data () {
    return {
      title: "",
      RecordId: "",
      formDate: {},
    };
  },
  onLoad (param) {
    if (param.RecordId) {
      this.RecordId = param.RecordId;
      this.title = param.title;
      this.getList()
    }
  },
  methods: {
    async getList () {
      let res = await healtheducationpushrecordsRead(this.RecordId);
      this.formDate = res.Response;
      this.formDate.EducationContent = res.Response.EducationContent.replace(/iframe/g, 'video')
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
