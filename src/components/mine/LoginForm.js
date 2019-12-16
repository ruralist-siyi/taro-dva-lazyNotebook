import Taro, { useState } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton, AtToast } from "taro-ui";
import request from '../../utils/request';
import {dispatch} from "../../utils/dva";
import "./index.less";

function LoginForm() {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [toastOpenStatus, setOpenStatus] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [toastIcon, setToastIcon] = useState(null);

  const login = () => {
    request('/user/login', {
      userName,
      userPassword: password
    }, 'POST', false).then((result) => {
      if(result) {
        setToastMsg('登录成功');
        setToastIcon('check');
        setOpenStatus(true);
        Taro.setStorageSync("userInfo", result);
        dispatch({
          type: 'global/changeLoginState',
          payload: true
        })
        Taro.reLaunch({url: '/pages/mine/index'})
      }
    })
  }

  return (
    <View className="login-form">
      <AtForm onSubmit={login}>
        <AtInput
          name="userName"
          title="用户名"
          type="text"
          placeholder="请输入用户名"
          value={userName}
          onChange={setUserName}
        />
        <AtInput
          name="password"
          title="密码"
          type="password"
          placeholder="请输入密码"
          value={password}
          onChange={setPassword}
        />
        <AtButton className="primary-btn login-btn" circle={true} formType="submit">
          登录
        </AtButton>
        <AtButton className="register-btn" circle={true}>
          注册
        </AtButton>
      </AtForm>
      <AtToast isOpened={toastOpenStatus} text={toastMsg} icon={toastIcon}></AtToast>
    </View>
  );
}

export default LoginForm;
