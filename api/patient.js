import { request } from '@/util/request.js';
import Storag from '@/common/storage';

// 健康宣教
export function healtheducationpushrecords(data) {
  return request({
    url: 'healtheducationpushrecords',
    method: 'GET',
    data,
  });
}
// 健康宣教已读
export function healtheducationpushrecordsRead(data) {
  return request({
    url: 'healtheducationpushrecords/read/' + data,
    method: 'POST',
  });
}
// 基本信息和治疗卡信息
export function patienthome(data) {
  return request({
    url: 'patienthome',
    method: 'GET',
    data,
  });
}
// 基本信息和治疗卡信息
export function filestorageinfosFiles(data) {
  return request({
    url: 'filestorageinfos/files',
    method: 'GET',
    data,
  });
}

// 基本信息和治疗卡信息
export function messagereminder(data) {
  return request({
    url: 'patienthome/messagereminder/' + data,
    method: 'GET',
  });
}
// 获取服药明细列表
export function pulmonarymedicines(data) {
  var searchPath = '';
  if (data.SubmitTimes[0]) {
    searchPath = '&SubmitTimes=' + data.SubmitTimes[0] + '&SubmitTimes=' + data.SubmitTimes[1];
  }
  return request({
    url:
      'pulmonarymedicines?DiagnosisId=' +
      data.DiagnosisId +
      '&PageNumber=' +
      data.PageNumber +
      '&PageSize=' +
      data.PageSize +
      searchPath,
    method: 'GET',
  });
}

// 获取不良反应记录
export function badreactionrecord(data) {
  var searchPath = '';
  if (data.SubmitTimes[0]) {
    searchPath = '&SubmitTimes=' + data.SubmitTimes[0] + '&SubmitTimes=' + data.SubmitTimes[1];
  }
  return request({
    url:
      'pulmonarybadreactions?DiagnosisId=' +
      data.DiagnosisId +
      '&PageNumber=' +
      data.PageNumber +
      '&PageSize=' +
      data.PageSize +
      searchPath,
    method: 'GET',
  });
}
// 创建不良反应信息
export function pulmonarybadreactionsBadreaction(data) {
  return request({
    url: 'pulmonarybadreactions/badreaction',
    method: 'POST',
    data,
  });
}

// 获取中断服药记录
export function pulmonaryinterrupts(data) {
  var searchPath = '';
  if (data.SubmitTimes[0]) {
    searchPath = '&SubmitTimes=' + data.SubmitTimes[0] + '&SubmitTimes=' + data.SubmitTimes[1];
  }
  return request({
    url:
      'pulmonaryinterrupts?DiagnosisId=' +
      data.DiagnosisId +
      '&PageNumber=' +
      data.PageNumber +
      '&PageSize=' +
      data.PageSize +
      searchPath,
    method: 'GET',
  });
}
// 随访明细列表
export function pulmonaryvisits(data) {
  return request({
    url:
      'pulmonaryvisits?DiagnosisId=' +
      data.DiagnosisId +
      '&PageNumber=' +
      data.PageNumber +
      '&PageSize=' +
      data.PageSize,
    method: 'GET',
  });
}
// 第一次随访详情
export function pulmonaryfirstvisitsFirstVisitId(data) {
  return request({
    url: 'pulmonaryfirstvisits/firstVisitId?firstVisitId=' + data.VisitId,
    method: 'GET',
  });
}
// 后续随访详情
export function pulmonarypatientvisits(data) {
  return request({
    url: 'pulmonarypatientvisits/' + data.VisitId,
    method: 'GET',
  });
}
// 获取检查记录列表
export function inspectrecord(data) {
  // ApplicationType 2 复查 1 常规检查
  var searchPath = '';
  if (data.SubmitTimes[0]) {
    searchPath = '&SubmitTimes=' + data.SubmitTimes[0] + '&SubmitTimes=' + data.SubmitTimes[1];
  }
  return request({
    url:
      'inspectapplications/inspectrecord?DiagnosisId=' +
      data.DiagnosisId +
      '&ApplicationType=' +
      data.ApplicationType +
      '&PageNumber=' +
      data.PageNumber +
      '&PageSize=' +
      data.PageSize +
      searchPath,
    method: 'GET',
  });
}
// 获取对话信息，患者端创建对话前返回对话列表
export function messagemaindetails(data) {
  return request({
    url: 'messagemaindetails?MainId=' + data + '&PageNumber=1&PageSize=9999',
    method: 'GET',
  });
}
// 获取对话信息 患者端创建对话前返回对话列表 (Auth roles: Patient)
export function bypatient(data) {
  return request({
    url: 'messages/bypatient',
    method: 'GET',
  });
}
// 服药视频重新上传,(先在文件管理上传文件返回guid和url) 适用于患者端 (Auth policies: Permission; roles: Patient)
export function reuploadmedicine(data) {
  return request({
    url: 'pulmonarymedicines/reuploadmedicine?medicineId=' + data.medicineId,
    method: 'POST',
    data: data.data,
  });
}
// 创建信息
export function setMessagemaindetails(data) {
  return request({
    url: 'messagemaindetails',
    method: 'POST',
    data,
  });
}

// 删除信息 (Auth policies: Permission)
export function pulmonarymedicinesDeletes(data) {
  return request({
    url: 'pulmonarymedicines/deletes',
    method: 'POST',
    data,
  });
}
// 创建服药信息
export function pulmonarymedicinesmedicine(data) {
  return request({
    url: 'pulmonarymedicines/medicine',
    method: 'POST',
    data,
  });
}
// 上传文件
export function filestorageinfos(data) {
  return uni.uploadFile({
    url: 'https://api.jxwsyl.com/jhb-api/api/filestorageinfos?type=MedicationVideos',
    formData: {
      files: data,
    },
    filePath: data,
    name: 'files',
    fileType: 'video',
    header: {
      Authorization: 'Bearer ' + Storag.getStorage('userInfo').token,
    },
  });
}

// 获取服药统计(完成率、日历) 适用于PC端服药监督、患者端服药记录
export function statistics(param) {
  return request({
    url: 'pulmonarymedicines/statistics/' + param.diagnosisId + '/' + param.startDate + '/' + param.endDate,
    method: 'GET',
  });
}
