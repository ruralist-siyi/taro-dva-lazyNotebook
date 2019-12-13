import Taro, { useState } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtFab } from "taro-ui";

function Objective() {

  const addObjective = () => {
    Taro.navigateTo({url: 'add'})
  }

  return (
    <View className="objective">
      <View className="no-content-wrap">
        <Image style='width: 100%;background: #fff;' src={require("../../assets/icons/no-content.jpg")}></Image>
      </View>
      <View className="float-btn-wrap">
        <AtFab onClick={addObjective}>
          <Text className="at-fab__icon at-icon at-icon-add"></Text>
        </AtFab>
      </View>
    </View>
  );
}

Objective.config = {
  navigationBarTitleText: "小目标"
};

export default Objective;
