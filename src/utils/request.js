import Taro from "@tarojs/taro";

const baseUrl = "http://localhost:3000";


function checkSaveToken(header) {
  const { authorization } = header;
  if (authorization && authorization !== Taro.getStorageSync("token")) {
    Taro.setStorageSync("token", authorization);
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
      "authorization": checkToken ? "Bearer " + Taro.getStorageSync("token") : null
    }
  }).then(res => {
    if(res.statusCode === 401) {
      Taro.removeStorageSync("token");
      Taro.removeStorageSync("userInfo");
    }
    console.log('request =>', res);
    checkSaveToken(res.header);
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
