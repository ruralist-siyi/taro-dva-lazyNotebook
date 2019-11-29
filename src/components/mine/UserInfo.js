import { useState } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtAvatar } from "taro-ui";
import "./index.less";

function UserInfo() {
  const [userName, setUserName] = useState("我才懒得记录");

  return (
    <View className="user-info">
      <View className="user-icon-wrap">
        <AtAvatar image={require("../../assets/icons/xiongmao.png")}></AtAvatar>
      </View>
      <View className="user-name-wrap">
        <Text className="user-name">{userName}</Text>
      </View>
    </View>
  );
}

export default UserInfo;
