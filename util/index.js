const util = {
  /**
   *
   * @param {String} key 需要存/取缓存的key
   * @param {*} value 存的值
   * @param {Number} seconds 过期时间
   * @returns  如果只传key，那么就是获取缓存，反之就是设置缓存
   */
  getStorage(key, value, seconds = 3600) {
    let nowTime = Date.parse(new Date()) / 1000;
    if (key && value) {
      let expire = nowTime + Number(seconds);
      uni.setStorageSync(key, JSON.stringify(value) + '|' + expire);
      console.log('已经把' + key + '存入缓存,过期时间为' + expire);
    } else if (key && !value) {
      let val = uni.getStorageSync(key);
      if (val) {
        // 缓存存在，判断是否过期
        let temp = val.split('|');
        if (!temp[1] || temp[1] <= nowTime) {
          // uni.removeStorageSync(key)
          // this.refreshToken();//更换token
          console.log(key + '缓存已失效');
          return '';
        } else {
          return JSON.parse(temp[0]);
        }
      }
    }
    console.log('没有' + key + '的缓存');
  },
  //判断字符是否为空
  isEmpty(obj, type = 'String') {
    if (type === 'Object') {
      if (JSON.stringify(obj) === '{}' || typeof obj == 'undefined' || obj == null) {
        return true; //如果为空，返回false
      }
      return false; //如果不为空，返回true
    }
    if (typeof obj == 'undefined' || obj == null || obj == '') {
      return true;
    } else {
      return false;
    }
  },
  isPhone(phone) {
    return /^1(3\d|4\d|5\d|6\d|7\d|8\d|9\d)\d{8}$/g.test(phone);
  },
  isCardNo(card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) {
      return false;
    }
    return true;
  },
  /**
   * 遍历对象，返回PATCH格式
   * @param {*} formData 最新的表单数据
   * @param {*} copyFormData 原先的表单数据
   * @param {*} excludeArr 不需要遍历的字段
   * @returns 需要更新的值
   */
  compareObj: (formData, copyFormData, excludeArr = []) => {
    const changeData = [];
    for (let key in formData) {
      let oldValue = copyFormData[key];
      let value = formData[key];
      let arr = [];
      arr = excludeArr.filter(i => {
        return i == key;
      });
      if (oldValue !== value && arr.length == 0) {
        changeData.push({
          op: 'Replace',
          path: key,
          value,
        });
      }
    }
    return changeData;
  },
  /**
   * 遍历对象，如果对象的属性是null或者undefined ，则处理成空字符串
   * @param {*} obj 对象
   * 返回值是
   */
  formatObj(obj) {
    if (typeof obj !== 'object') return;
    for (let item in obj) {
      if (obj[item] == undefined || obj[item] == null) {
        obj[item] = '';
      }
    }
    return obj;
  },
  getTime(date, format) {
    format = format || 'yyyyMMdd';
    let stopTime = date || new Date(); //获取目前的时间
    let y = stopTime.getFullYear(); //获取目前的年份
    let m = stopTime.getMonth() + 1; //获取当前的月份，月份是从0开始的，要+1
    m = m < 10 ? '0' + m : m; //如果月份小于10的话为01、02否则为10、11
    let d = stopTime.getDate(); //获取当前几号
    d = d < 10 ? '0' + d : d;
    let h = stopTime.getHours(); //获取当前小时
    h = h < 10 ? '0' + h : h;
    let minute = stopTime.getMinutes(); //获取当前分钟
    minute = minute < 10 ? '0' + minute : minute;
    let second = stopTime.getSeconds(); //获取当前秒
    second = second < 10 ? '0' + second : second;
    let yyyyMMddHHmm = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second; //现在格式为2021-11-22 13:53:12
    let yyyyMMdd = y + '-' + m + '-' + d; //现在格式为2021-11-22
    if (format == 'yyyyMMddHHmm') {
      return yyyyMMddHHmm;
    } else {
      return yyyyMMdd;
    }
  },
  getEnumData(param, url) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: url + 'api/dictionaryitems',
        data: param,
        header: {
          Authorization: 'Bearer ' + uni.getStorageSync('token'),
          ContentType: 'application/json;charset=UTF-8',
        },
        success: res => {
          res.data.data.forEach(item => {
            (item.name = item.DictionaryText), (item.value = item.DictionaryValue);
          });
          resolve(res.data.data);
        },
      });
    });
  },
};
export default util;
