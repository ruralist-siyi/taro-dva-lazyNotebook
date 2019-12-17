import { useState } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import "./index.less";

function ActionList() {

  const goCreateObjective = () => {
    Taro.redirectTo({url: '../objective/add'})
  }

  return (
    <View className="action-list">
      <AtList hasBorder={false}>
        <AtListItem onClick={goCreateObjective} thumb={require('../../assets/icons/regou.png')} arrow='right' title="创建小目标" />
        <AtListItem thumb={require('../../assets/icons/hb.png')} arrow='right' title="记小本本去" />
        <AtListItem thumb={require('../../assets/icons/happy.png')} arrow='right' title="一起来打卡" />
      </AtList>
    </View>
  );
}

export default ActionList;
