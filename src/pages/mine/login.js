import { View, Text } from '@tarojs/components';
import LoginForm from '../../components/mine/LoginForm';
import './index.less';
import { AtMessage } from 'taro-ui'

function Login() {
  return (
  <View className="login">
     <LoginForm />
     <AtMessage />
  </View>
  )
}

export default Login;
