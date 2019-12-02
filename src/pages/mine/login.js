import { View, Text } from '@tarojs/components';
import LoginForm from '../../components/mine/LoginForm';
import './index.less';

function Login() {
  return (
  <View className="login">
     <LoginForm />
  </View>
  )
}

export default Login;