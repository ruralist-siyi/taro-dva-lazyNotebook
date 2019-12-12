import Taro from "@tarojs/taro";

const baseUrl = "http://47.98.40.154:3000";


function checkSaveToken(header) {
  const { authorization } = header;
  if (authorization && authorization !== Taro.getStorageSync({ key: "token" })) {
    Taro.setStorageSync({ key: "token", data: authorization });
  }
}

export default function createApiRequest(url, data = {}, method = "POST", checkToken = true) {
  return Taro.request({
    url: baseUrl + url,
    method: method,
    data: {
      ...data
    },
    header: {
      "Content-Type": "application/json;charset=UTF-8",
      "authorization": "Bearer " + Taro.getStorageSync({ key: "token" })
    }
  }).then(res => {
    checkSaveToken(res.header);
    console.log(res);
    const result = res.data;
    if (result.code !== "000000") {
      Taro.atMessage({
        message: result.msg || "请求错误",
        type: "error"
      });
    } else {
      return result.data;
    }
  });
}
