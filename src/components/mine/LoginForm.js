import Taro, { useState } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import request from '../../utils/request';

import "./index.less";

function LoginForm() {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  const login = () => {
    request('/user/login', {
      userName,
      userPassword: password
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
        <AtButton onClick={login} className="primary-btn login-btn" circle={true} formType="submit">
          登录
        </AtButton>
        <AtButton className="register-btn" circle={true}>
          注册
        </AtButton>
      </AtForm>
    </View>
  );
}

export default LoginForm;
