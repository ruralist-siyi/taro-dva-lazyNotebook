import { View, Text } from '@tarojs/components';
import RegisterForm from '../../components/mine/RegisterForm';
import './index.less';
import { AtMessage } from 'taro-ui'

function Login() {
  return (
  <View className="login">
     <RegisterForm />
     <AtMessage />
  </View>
  )
}

export default Login;
