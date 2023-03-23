<template>
  <div>
    <sysHead text="修改密码" showBack></sysHead>
    <div style="margin-top: 20px">
      <div class="row">
        <div class="label">原密码</div>
        <div class="input">
          <u--input placeholder="请输入原密码" v-model="formData.oldPassword" border="none"></u--input>
        </div>
      </div>
      <div class="row">
        <div class="label">新密码</div>
        <div class="input">
          <u--input placeholder="请输入新密码" v-model="formData.newPassword" border="none"></u--input>
        </div>
      </div>
      <div class="row">
        <div class="label">确认密码</div>
        <div class="input">
          <u--input placeholder="请再次输入新密码" v-model="formData.newPassword2" border="none"></u--input>
        </div>
      </div>
    </div>
    <div class="submit" @click="submit">提交</div>
  </div>
</template>

<script>
import { password, doctorPassword } from "@/api/login.js"
export default {
  data () {
    return {
      formData: {
        oldPassword: "",
        newPassword: "",
        patientUserId: "",
        userId: "",
        newPassword2: "",
        type: ""
      }
    };
  },
  onLoad (param) {
    if (!param.type) return;
    this.type = param.type;
    console.log(this.type);
    let res = this.$storage.getStorage("userInfo")
    this.formData.patientUserId = res.userId
    this.formData.userId = res.userId
  },
  methods: {
    //修改密码提交
    async submit () {
      if (!this.formData.oldPassword || !this.formData.newPassword || !this.formData.newPassword2) {
        return uni.showToast({
          title: '还有信息未填写',
          icon: 'none',
          duration: 3000,
        });
      }
      if (!this.formData.newPassword2 !== !this.formData.newPassword) {
        return uni.showToast({
          title: '新密码不一致！',
          icon: 'none',
          duration: 3000,
        });
      }
      if (this.type == 'patient') {
        await password(this.formData);
      } else {
        await doctorPassword(this.formData);
      }
      uni.navigateBack();
    }
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
  margin-top: 167px;
  background: #006aec;
  border-radius: 4px;
  text-align: center;
  line-height: 44px;
  font-size: 15px;
  color: #ffffff;
}
.row {
  display: flex;
  background: #fff;
  height: 50px;
  line-height: 50px;
  font-size: 17px;
  color: #252d57;
  margin-bottom: 1px;
  .label {
    margin-left: 12px;
    width: 100px;
  }
  .input {
    margin-top: 13px;
    width: 80%;
  }
}
</style>
