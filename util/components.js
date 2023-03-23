

import Vue from 'vue'
// 引入全局组件--三级联动组件
import tabber from '@/components/tabber/tabber'
import sysHead from '@/components/sysHead/sysHead'
import sysDatetimePicker from '@/components/sysDatetimePicker/sysDatetimePicker'
import gljyDataPicker from "@/components/gljy-data-picker/gljy-data-picker.vue";
 
// 引入全局组件
// 第一个参数 全局组件的名字(字符串类型)，第二个参数：哪一个组件（引入的组件名）
Vue.component('tabber',tabber)
Vue.component('sysHead',sysHead)
Vue.component('sysDatetimePicker',sysDatetimePicker)
//https://ext.dcloud.net.cn/plugin?id=6246  省市区联动，级联选择行政区域或部门信息等，支持懒加载
Vue.component('gljyDataPicker',gljyDataPicker);