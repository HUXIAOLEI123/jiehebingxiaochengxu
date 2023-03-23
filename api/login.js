import {request} from "@/util/request.js";

// 登录
export function login(data) {
    return request({
        url: "tokens/JWTToken3.0",
        headers: {
            isToken: false,
        },
        method: "GET",
        data
    });
}

// 获取用户信息权限等
export function getUserInfo() {
    return request({
        url: "tokens/getInfoByToken",
        method: "GET",
        params: {
            token: getToken()
        }
    });
}

// 验证码  
export function getValidateCode(guid) {
    return request({
        url: "tokens/getChsValidateCode",
        method: "GET",
        params: { guid }
    });
}

// 退出方法
export function logout() {
    return request({
        url: "/logout",
        method: "post",
    });
}

// 请求刷新Token（以旧换新） 
export function getRefreshToken(token) {
    return request({
        url: "tokens/RefreshToken?token=" + token,
        method: "GET"
    });
}

// 账户密码修改
export function password(data) {
  return request({
    url:
      'patientusers/password?oldPassword=' + data.oldPassword + '&newPassword=' + data.newPassword + '&patientUserId=' + data.patientUserId,
    method: 'POST'
  });
}

// 账户密码修改
export function doctorPassword(data) {
  return request({
    url:
      'organizationusers/password?oldPassword=' + data.oldPassword + '&newPassword=' + data.newPassword + '&userId=' + data.userId,
    method: 'POST'
  });
}
