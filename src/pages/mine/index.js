import {useState} from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import UserInfo from '../../components/mine/UserInfo';
import ActionList from '../../components/mine/ActionList';

function Mine() {
  const [userName, setUserName] = useState('zhangsiyi');

  return (
  <View className="mine">
    <UserInfo />
    <ActionList />
  </View>
  )
}

export default Mine;