import {useState, useEffect} from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtMessage } from 'taro-ui'
import UserInfo from '../../components/mine/UserInfo';
import ActionList from '../../components/mine/ActionList';
import request from '../../utils/request';

function Mine() {

  useEffect(() => {
    const userInfo =  Taro.getStorageSync("userInfo");
    if(userInfo) {
      request('/user/queryDetail', {userId: userInfo.userId}, 'GET');
    }
  }, [])

  return (
  <View className="mine">
    <UserInfo />
    <ActionList />
    <AtMessage />
  </View>
  )
}

export default Mine;
