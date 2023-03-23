// 区分存储类型 type
// 自定义名称前缀 prefix
// 支持设置过期时间 expire
// 支持加密可选，开发环境下未方便调试可关闭加密

// 支持数据加密 这里采用 crypto-js 加密 也可使用其他方式

// 判断是否支持 Storage isSupportStorage

// 设置 setStorage

// 获取 getStorage

// 是否存在 hasStorage

// 获取所有key getStorageKeys

// 根据索引获取key getStorageForIndex

// 获取localStorage长度 getStorageLength

// 获取全部 getAllStorage

// 删除 removeStorage

// 清空 clearStorage

//定义参数 类型 window.localStorage,window.sessionStorage,

const config = {
  type: "localStorage", // 本地存储类型 localStorage/sessionStorage
  expire: 1, //过期时间 单位：天
  isEncrypt: true, // 默认加密 为了调试方便, 开发过程中可以不加密
};

export default {
  // 设置 setStorage
  setStorage(key, value, expire = 0) {
    if (value === "" || value === null || value === undefined) {
      value = null;
    }
    expire = (expire ? expire : config.expire) * 60000 * 86400;
    let data = {
      value: value, // 存储值
      time: Date.now(), //存值时间戳
      expire: expire, // 过期时间
    };
    uni.setStorageSync(key, JSON.stringify(data));
    // window[config.type].setItem(key, JSON.stringify(data));
  },
  // 获取 getStorage
  getStorage(key) {
    // key 不存在判断
    if (!uni.getStorageSync(key)) {
      return null;
    }
    // 优化 持续使用中续期
    let storage = uni.getStorageSync(key)
    storage = JSON.parse(storage);
    let nowTime = Date.now();
    // 过期删除
    if (storage.expire && config.expire * 6000 * 86400 < nowTime - storage.time) {
      this.removeStorage(key);
      return null;
    } else {
      // 未过期期间被调用 则自动续期 进行保活
      this.setStorage(key, storage.value);
      return storage.value;
    }
  },
  // 获取全部 getAllStorage
  getAllStorage() {
    let len = uni.getStorageInfoSync().length; // 获取长度
    let arr = new Array(); // 定义数据集
    for (let i = 0; i < len; i++) {
      // 获取key 索引从0开始
      let getKey = uni.getStorageInfoSync().key(i);
      // 获取key对应的值
      let getVal = uni.getStorageInfoSync().getItem(getKey);
      // 放进数组
      arr[i] = { key: getKey, val: getVal };
    }
    return arr;
  },

  // 删除 removeStorage
  removeStorage(key) {
    uni.removeStorageSync(key);
  },

  // 清空 clearStorage
  clearStorage() {
    uni.clearStorageSync();
  },
};
