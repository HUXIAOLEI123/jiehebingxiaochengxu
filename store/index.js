import Vue from "vue";
import Vuex from "vuex";
import storage from "../common/storage";
import tabBar from "@/util/tabBar.js";

Vue.use(Vuex);

// 获取用户的类型，也可以根据业务判断具体的权限
let userInfo = storage.getStorage("userInfo");

let type = "doctor";
if (userInfo != null) {
  switch (userInfo.utype) {
    case "1":
      type = "doctor";
      break;
    case "2":
      type = "patient";
      break;
    default:
      break;
  }
}

const store = new Vuex.Store({
  state: {
    tabarList: tabBar[type], // 动态底部导航栏
    tabarIndex: 0, // 动态底部导航栏
  },
  mutations: {
    setTabarList(state, list) {
      state.tabarList = list;
    },
    setTabarIndex(state, index) {
      state.tabarIndex = index;
    },
  },
  getters: {},
  actions: {},
});

export default store;
