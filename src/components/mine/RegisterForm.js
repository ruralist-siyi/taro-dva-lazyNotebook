import Taro, { useState } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton, AtToast } from "taro-ui";
import request from '../../utils/request';
import {dispatch} from "../../utils/dva";
import "./index.less";

function LoginForm() {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [toastOpenStatus, setOpenStatus] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [toastIcon, setToastIcon] = useState(null);

  const createUser = () => {
    request('/user/create', {
      userName,
      userPassword: password,
      email,
      phone
    }, 'POST', true).then((result) => {
      if(result) {
        setToastMsg('创建成功，前去登录');
        setToastIcon('check');
        setOpenStatus(true);
        dispatch({
          type: 'global/changeLoginState',
          payload: true
        })
        setTimeout(() => {
          Taro.navigateTo({url: '../mine/login'})
        }, 2000)
      }
    })
  }

  return (
    <View className="login-form">
      <AtForm onSubmit={createUser}>
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
        <AtInput
          name="password"
          title="邮箱"
          type="text"
          placeholder="请输入邮箱"
          value={email}
          onChange={setEmail}
        />
        <AtInput
          name="phone"
          title="手机号"
          type="phone"
          placeholder="请输入手机号"
          value={phone}
          onChange={setPhone}
        />
        <AtButton className="primary-btn login-btn" circle={true} formType="submit">
          注册
        </AtButton>
      </AtForm>
      <AtToast isOpened={toastOpenStatus} text={toastMsg} icon={toastIcon}></AtToast>
    </View>
  );
}

export default LoginForm;
