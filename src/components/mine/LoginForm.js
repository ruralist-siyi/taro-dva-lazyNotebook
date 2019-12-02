import Taro,{ useState } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from 'taro-ui'
import "./index.less";

function LoginForm() {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  console.log(userName);
  console.log(password);
  return (
    <View className="login-form">
        <AtForm
      >
        <AtInput
          name='userName'
          title='用户名'
          type='text'
          placeholder='用户名'
          value={userName}
          onChange={setUserName}
        />
        <AtInput
          name='password'
          title='密码'
          type='password'
          placeholder='密码'
          value={password}
          onChange={setPassword}
        />
        <AtButton circle={true} style={{marginTop: '50px'}} formType='submit'>登录</AtButton>
        <AtButton circle={true}>注册</AtButton>
      </AtForm>
    </View>
  );
}

export default LoginForm;