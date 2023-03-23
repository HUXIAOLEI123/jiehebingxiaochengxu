<template>
  <div class="bg">
    <img src="../../assets/logo.png" alt="" class="logo" />
    <div class="userinfo">
      <div
        v-for="(item, index) in list"
        @click="selectTabs(item)"
        :key="index"
        :class="item.isactive ? 'active' : 'noactive'"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="user_account">
      <u--input placeholder="请输入账号" border="surround" v-model="login.identifier" />
    </div>
    <div class="input">
      <u--input placeholder="请输入密码" border="surround" v-model="login.credential" type="password" />
    </div>
    <div class="login_btn" @click="loginFun">登录</div>
    <div class="user_authorization">
      <u-checkbox-group v-model="userValue" placement="row" shape="circle">
        <u-checkbox name="one" label=" "></u-checkbox>
        我已同意
        <span class="c006AEC" @click="lookPrivacyAgreement">《用户隐私协议》</span>
      </u-checkbox-group>
    </div>
    <u-modal :show="show" title=" " closeOnClickOverlay @close="show = false" @confirm="show = false">
      <view class="slot-content">
        <div class="modalcontent">
          {{ content }}
        </div>
      </view>
    </u-modal>
  </div>
</template>

<script>
const content = `《江西肺结核》小程序尊重和保护用户的隐私。本隐私政策将告诉您我们如何收集和使用有关您的信息，以及我们如何保护这些信息的安全。您成为《江西肺结核》小程序用户前务必仔细阅读本隐私条款并同意所有隐私条款。本隐私政策条款在您注册成为《江西肺结核》小程序用户后立即生效，并对您及《江西肺结核》小程序产生约束力。

一、我们可能收集的用户信息

我们提供服务时，可能会收集、储存和使用下列与您有关的信息。如果您不提供相关信息，可能无法注册成为我们的用户或无法享受我们提供的某些服务，或者无法达到相关服务拟达到的效果。

1、您提供的信息

•  您在注册账户或使用我们的服务时，向我们提供的相关个人信息，例如电话号码、身份证号码、银行卡号等。

• 您通过我们的服务向其他方提供的共享信息，以及您使用我们的服务时所储存的信息。

2、其他方分享的您的信息

其他方使用我们的服务时所提供有关您的共享信息。

3、我们获取的您的信息。 您使用服务时我们可能收集如下信息：

• 日志信息，指您使用我们的服务时，系统可能通过cookies、webbeacon或其他方式自动采集的技术信息，包括：设备或软件信息，例如您的移动设备、网页浏览器或用于接入我们服务的其他程序所提供的配置信息、您的IP地址和移动设备所用的版本和设备识别码；以及您在使用我们服务时要求提供的其他信息和内容详情。

• 位置信息，指您开启设备定位功能并使用我们基于位置提供的相关服务时，收集的有关您位置的信息。您可以通过关闭定位功能，停止对您的地理位置信息的收集。

• 交易信息，指我们对您在《江西肺结核》小程序平台上形成的交易数据信息进行分析并形成用户信用数据库。

4、合作机构提供的您的信息

我们会通过第三方机构（包括但不限于通过合法的征信机构个人信用信息基础数据库及外部数据）查询您的信用报告中的身份、联系方式等个人身份、电信信息、地址、位置等基本 信息和关联人信息以及个人贷款、各类信用卡和对外担保等信用及在商业活动中形成的各类交易记录，个人信贷交易信息及公共费用缴纳、违法违规信息及非银行类信息的其他信息，获取的您的肖像、工作情况、收入情况、家庭情况、社会关系情况、招聘应聘以及您在《江西肺结核》小程序的交易记录和使用信息等。

二、我们可能如何使用用户信息

1、在我们提供服务时，用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，确保我们向您提供的产品和服务的安全性；

2、帮助我们设计新服务，改善我们现有服务；

3、使我们更加了解您如何接入和使用我们的服务，从而针对性地回应您的个性化需求；

4、软件认证或管理软件升级；

5、让您参与有关我们产品和服务的调查。

为了让您有更好的体验、改善我们的服务或您同意的其他用途，在符合相关法律法规的前提下，我们可能将通过某一项服务所收集的信息，以汇集信息或者个性化的方式，用于我们的其他服务。例如，在您使用我们的一项服务时所收集的信息，可能在另一服务中用于向您提供特定内容，或向您展示与您相关的、非普遍推送的信息。如果我们在相关服务中提供了相应选项，您也可以授权我们将该服务所提供和储存的信息用于我们的其他服务。

三、我们可能与第三方共享的用户信息

在下列情况下，我们可能会共享您的个人信息：

1、您逾期未偿还借款本息，我们将向公众（包括但不限于出借人、您手机通讯录中不时更新的联系人、该等联系人手机中不时更新的联系人、您提供的社交账号的联系人或群体）披露您的用户信息；

2、其他注册用户就您在《江西肺结核》小程序活动中的违约行为发起诉讼程序时，我们将应该等注册用户的请求向该等注册用户披露您的用户信息；

3、应行政、司法部门的要求向该等机构提供您的用户信息；

4、债权人委托催收时，向受托催收主体提供您的用户信息；

5、您通过《江西肺结核》小程序平台向第三方合作机构申请相关产品服务时，我们将根据您的授权向第三方提供您的用户信息；

6、我们以及我们的关联公司，可能将您的个人信息与我们的关联公司、合作伙伴及第三方服务供应商、承包商及代理（例如代表我们发出短信或推送通知的通讯服务提供商、为我们提供位置数据的地图服务供应商）分享（他们可能并非位于您所在的法域），为了我们向您提供或改善我们的服务；

• 随着我们业务的持续发展，我们以及我们的关联公司有可能进行合并、收购、资产转让或类似的交易，您的个人信息有可能作为此类交易的一部分而被转移；
• 依据法律要求必须向第三方提供您的用户信息的情形；

四、我们如何保护用户信息

我们使用各种安全技术和程序，以防信息的丢失、不当使用、未经授权阅览或披露。但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网行业，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。

五、账户注销

当用户需要注销本账号时，可联系 《江西肺结核》小程序 客服人员进行验证注销。

六、隐私政策的修改

由于法律法规的变更，以及为了与互联网的新发展和可能的发展趋势保持同步，我们可能会不定时修改本政策。因此，我们保留自行决定实施此类修改的权利，如该等修订造成您在本《隐私政策》下权利的实质减少，我们将在修订生效前通过在主页上显著位置提示或向您推送通知或以其他方式通知您。在该种情况下，若您继续使用我们的服务，即表示同意受经修订的本《隐私政策》的约束 `
import { login } from "@/api/login.js"
import tabBar from "@/util/tabBar.js";
export default {
  data () {
    return {
      show: false,
      content,
      list: [
        { name: '患者登录', isactive: true, source: '3', utype: '2' },
        { name: '医生登录', isactive: false, source: '2', utype: '1' }
      ], userValue: [],
      login: {
        // identifier: "15209821233",
        // credential: "jxCDC!2022",
        identifier: "",
        credential: "",
        source: "3",
      },
      utype: '2'
    };
  },
  created () {
    this.setTabbar()
  },
  methods: {
    selectTabs (e) {
      let arr = this.list;
      arr.forEach((i) => {
        if (i.name == e.name) {
          i.isactive = true;
          this.utype = e.utype;
          this.login.source = e.source;
        } else {
          i.isactive = false;
        }
      });
      this.list = arr;
      this.$forceUpdate()
      // if (e.name == '患者登录') {
      //   this.login.identifier = "15209821233",
      //     this.login.credential = "jxCDC!2022"
      // } else {
      //   this.login.identifier = "13479170204",
      //     this.login.credential = "jxCDC!2022"
      // }
    },
    //查看用户隐私协议
    lookPrivacyAgreement () {
      this.show = true;
    },
    setTabbar () {
      let o = {
        patient: tabBar.patient,
        doctor: tabBar.doctor,
      }
      this.$storage.setStorage("tabBar", o)
      this.$storage.setStorage("tabarIndex", 0)
    },
    async loginFun () {
      if (this.userValue.length == 0) {
        return uni.showToast({
          title: "请阅读并勾选用户隐私协议",
          icon: "none",
          duration: 3000,
          position: "top"
        })
      }
      if (!this.login.identifier || !this.login.credential) return uni.showToast({
        title: "账号或密码不可为空",
        icon: "none",
        duration: 3000,
        position: "top"
      })
      let token = await login(this.login);
      let unserInfo = Object.assign({ utype: this.utype }, token.Response)
      this.$storage.setStorage('userInfo', unserInfo)
      uni.redirectTo({
        url: "/pages/login/index"
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.input {
  width: 90%;
  margin-left: 5%;
}
.userinfo {
  width: 80%;
  margin-top: 80rpx;
  margin-left: 10%;
  font-size: 36rpx;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 70rpx;
  display: flex;
  justify-content: space-around;
  .noactive {
    color: #252d57;
  }
  .active {
    color: #006aec;
    border-bottom: 2px solid #006aec;
  }
}
.userinfo_type {
  width: 100%;
}
.modalcontent {
  height: 50vh;
  overflow: auto;
}
.bg {
  padding: 20px;
  height: calc(100vh - 40px);
  background: #fff;
  .logo {
    margin-left: calc(50vw - 127px);
    width: 235px;
    height: 75px;
    margin-top: 75px;
  }
  .user_account {
    width: 90%;
    margin: 124rpx 0 20rpx 5%;
  }
  .login_btn {
    width: 90%;
    margin-left: 5%;
    height: 44px;
    background: #006aec;
    border-radius: 5px;
    font-size: 18px;
    color: #ffffff;
    line-height: 44px;
    margin-top: 50rpx;
    text-align: center;
  }
  .user_authorization {
    color: #252d57;
    line-height: 35px;
    position: absolute;
    bottom: 50px;
    left: 20%;
  }
}
</style>
