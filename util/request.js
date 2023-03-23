const BASE_URL = 'https://api.jxwsyl.com/jhb-api/api/';
import Storag from '@/common/storage';

export const request = options => {
  //加载loading
  // uni.showLoading({
  //   title: '加载中',
  // });
  let header = {
    'Content-Type': 'application/json',
    Authorization: '',
  };
  if (Storag.getStorage('userInfo') !== null) {
    header.Authorization = 'Bearer ' + Storag.getStorage('userInfo').token;
  }
  return new Promise((resolve, reject) => {
    uni.request({
      // 开发者服务器接口地址（请求服务器地址 + 具体接口名）
      url: BASE_URL + options.url,
      // 请求方式（若不传，则默认为 GET ）
      method: options.method || 'GET',
      // 请求参数（若不传，则默认为 {} ）
      data: options.data || {},
      // 请求头（若不传，则默认为 header ）
      header: options.header || header,
      // 请求成功
      success: res => {
        // 此判断可根据自己需要更改
        if (res.data.StatusCode == 200) {
          resolve(res.data);
        } else {
          uni.showToast({
            title: res.data.Message,
            icon: 'none',
            duration: 3000,
          });
        }
      },
      // 请求失败
      fail: err => {
        uni.$emit('z-paging-error-emit');
        uni.showToast({
          title: '请求接口失败！',
          icon: 'none',
          duration: 3000,
        });
        reject(err);
      },
      //请求结束之后，执行的回调函数（成功或失败都会执行）
      complete() {
        //隐藏loading
        // uni.hideLoading();
      },
    });
  });
};

export default { request };
