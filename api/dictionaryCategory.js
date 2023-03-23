import { request } from '@/util/request.js';

// 获取字典类别列表
export function dictionarycategory(data) {
  var param = {
    PageNumber: data.PageNumber || 1,
    PageSize: data.PageSize || 9999,
    url: '',
  };
  let arr = data.CategoryCode.split(',');
  for (let i = 0; i < arr.length; i++) {
    if (i == 0) {
      param.url = '?CategoryCode=' + arr[i];
    } else {
      param.url = param.url + '&CategoryCode=' + arr[i];
    }
  }
  param.url = param.url + '&PageNumber=' + param.PageNumber + '&PageSize=' + param.PageSize;
  return request({
    url: 'dictionarydetails' + param.url,
    method: 'GET',
  });
}
// 获取行政区划联级选择器
export function regionsCascade(data) {
  return request({
    url: 'regions/?Reg_RegionCode=' + data + '&PageNumber=1&PageSize=999999',
    method: 'GET',
  });
}
