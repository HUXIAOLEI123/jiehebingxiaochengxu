<template>
  <div class="main">
    <sysHead text="报告详情" showBack slot="top"></sysHead>
    <img v-for="item of imgList" :src="item.FilePath" :key="item.RelationGuid" />
  </div>
</template>

<script>
import { filestorageinfosFiles } from "@/api/patient.js"
export default {
  data () {
    return {
      imgList: [],
      FileRelationGuid: "",
    };
  },
  onLoad (param) {
    if (param.FileRelationGuid) {
      this.FileRelationGuid = param.FileRelationGuid
      this.getList()
    }
  },
  methods: {
    async getList () {
      let param = {
        relationGuids: this.FileRelationGuid
      }
      let res = await filestorageinfosFiles(param);
      let arr = res.Response
      arr.forEach((i) => {
        // let str = i.FilePath.slice(8, i.FilePath.length);
        let str = i.FilePath;
        str = str.replace('\\', '/')
        i.FilePath = this.$video_url  + str;
      })
      this.imgList = arr;
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  margin-top: 60px;
  background: #fff;
  padding: 0px 13px;
  font-size: 17px;
}
</style>
