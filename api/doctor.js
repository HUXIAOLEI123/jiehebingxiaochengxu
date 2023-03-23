import { request } from '@/util/request.js';

// 获取检查明细信息
export function inspectapplicationsInspectrecord(data) {
  return request({
    url: 'inspectapplications/inspectrecord',
    method: 'GET',
    data,
  });
}
// 获取不良反应记录
export function pulmonarybadreactions(data) {
  return request({
    url: 'pulmonarybadreactions',
    method: 'GET',
    data,
  });
}
//获取不良反应信息
export function pulmonarybadreactionsBadReactionId(data) {
  return request({
    url: 'pulmonarybadreactions/' + data,
    method: 'GET',
  });
}
// 获取医生端首页不良反应记录
export function pulmonarybadreactionsDoctorhomepage(data) {
  return request({
    url: 'pulmonarybadreactions/doctorhomepage',
    method: 'GET',
    data,
  });
}
// 创建处置信息
export function pulmonarybadreactionsManagement(data) {
  return request({
    url: 'pulmonarybadreactions/management/' + data.badReactionId,
    method: 'POST',
    data: data.managementMethod,
  });
}
// 获取第一次入户随访信息详情
export function pulmonaryfirstvisitsFirstVisitId(data) {
  return request({
    url: 'pulmonaryfirstvisits/' + data,
    method: 'GET',
  });
}
// 获取中断服药明细列表
export function pulmonaryinterrupts(data) {
  return request({
    url: 'pulmonaryinterrupts',
    method: 'GET',
    data,
  });
}
// 获取医生端首页中断服药记录
export function pulmonaryinterruptsDoctorhomepage(data) {
  return request({
    url: 'pulmonaryinterrupts/doctorhomepage',
    method: 'GET',
    data,
  });
}
// 中断服药确认
export function pulmonaryinterruptsManagement(data) {
  return request({
    url: 'pulmonaryinterrupts/management',
    method: 'POST',
    data,
  });
}
// 获取服药明细列表
export function pulmonarymedicines(data) {
  return request({
    url: 'pulmonarymedicines',
    method: 'GET',
    data,
  });
}
// 获取医生端首页服药转换记录
export function pulmonarymedicinesDoctorhomepage(data) {
  return request({
    url: 'pulmonarymedicines/doctorhomepage',
    method: 'GET',
    data,
  });
}
// 服药转换
export function pulmonarymedicinesMedicineconfirm(data) {
  return request({
    url: 'pulmonarymedicines/medicineconfirm',
    method: 'POST',
    data,
  });
}
// 获取服药统计(完成率、日历)
export function pulmonarymedicinesStatistics(data) {
  return request({
    url: 'pulmonarymedicines/statistics/' + data.diagnosisId + '/' + data.startDate + '/' + data.endDate,
    method: 'GET',
    data,
  });
}
// 服药转换
export function pulmonarymedicinesTest(data) {
  return request({
    url: 'pulmonarymedicines/test/' + data.medicineId,
    method: 'GET',
  });
}
// 后续随访获取信息
export function pulmonarypatientvisits(data) {
  return request({
    url: 'pulmonarypatientvisits/' + data,
    method: 'GET',
    data,
  });
}
// 创建后续随访信息
export function addPulmonarypatientvisits(data) {
  return request({
    url: 'pulmonarypatientvisits',
    method: 'POST',
    data,
  });
}
// 更新信息 (Auth policies: Permission)
export function upDataPulmonarypatientvisits(data) {
  return request({
    url: 'pulmonarypatientvisits/'+ data.patientVisitId,
    method: 'PATCH',
    data:data.arr,
  });
}
// 创建第一次入户随访信息
export function addPulmonaryfirstvisits(data) {
  return request({
    url: 'pulmonaryfirstvisits',
    method: 'POST',
    data,
  });
}
// 更新第一次入户随访信息 (Auth policies: Permission)
export function updataPulmonaryfirstvisits(data) {
  return request({
    url: 'pulmonaryfirstvisits/'+ data.firstVisitId,
    method: 'PATCH',
    data:data.arr,
  });
}
// 随访管理随访明细列表
export function pulmonaryvisits(data) {
  return request({
    url: 'pulmonaryvisits',
    method: 'GET',
    data,
  });
}
// 获取管理医生端首页随访管理记录
export function pulmonaryvisitsDoctorhomepage(data) {
  return request({
    url: 'pulmonaryvisits/doctorhomepage',
    method: 'GET',
    data,
  });
}
// 留言列表获取留言患者列表
export function messages(data) {
  return request({
    url: 'messages',
    method: 'GET',
    data,
  });
}
// 留言管理创建对话信息
export function addMessages(data) {
  return request({
    url: 'messages',
    method: 'POST',
    data,
  });
}
// 医生首页 我的基本信息
export function doctorhome(data) {
  return request({
    url: 'doctorhome',
    method: 'GET',
    data,
  });
}
// 医生首页 患者管理列表
export function doctorhomePatientlist(data) {
  return request({
    url: 'doctorhome/patientlist',
    method: 'GET',
    data,
  });
}
// 档案管理 基本信息和治疗卡信息
export function personsTreatmentCardInfo(data) {
  return request({
    url: 'persons/treatmentCardInfo/' + data,
    method: 'GET',
  });
}
// 获取对话详细信息列表
export function messagemaindetails(data) {
  return request({
    url: 'messagemaindetails',
    method: 'GET',
    data,
  });
}
// 获取患者留言列表
export function apimessages(data) {
  return request({
    url: 'messages',
    method: 'GET',
    data,
  });
}
// 创建信息
export function addMessagemaindetails(data) {
  return request({
    url: 'messagemaindetails',
    method: 'POST',
    data,
  });
}

// 获取中断服药和异常服药列表，适用于医生端
export function pulmonarymedicinesMedicineabnormal(data) {
  let time = '';
  if (data.SubmitTimes.length > 0) {
    time = '&SubmitTimes=' + data.SubmitTimes[0] + '&SubmitTimes=' + data.SubmitTimes[1];
  }
  return request({
    url:
      'pulmonarymedicines/medicineabnormal?DiagnosisId=' +
      data.DiagnosisId +
      '&PageNumber=' +
      data.PageNumber +
      '&PageSize=' +
      data.PageSize +
      time,
    method: 'GET',
  });
}

// 医生批量提交患者服药
export function pulmonarymedicinesMedicinesupplement(data) {
  return request({
    url: 'pulmonarymedicines/medicinesupplement?diagnosisId=' + data.diagnosisId,
    method: 'POST',
    data:data.Arr,
  });
}
