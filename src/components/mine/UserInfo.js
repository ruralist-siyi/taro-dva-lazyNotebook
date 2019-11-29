import Taro,{ useState } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtAvatar, AtBadge } from "taro-ui";
import "./index.less";

function UserInfo() {
  const [userName, setUserName] = useState("我才懒得记录");

  const handleClick = () => {
    Taro.navigateTo({url: 'login'})
  }

  return (
    <View className="user-info">
      <View className="user-icon-wrap" onClick={handleClick}>
        <AtBadge value='点我登录'>
          <AtAvatar image={require("../../assets/icons/xiongmao.png")}></AtAvatar>
        </AtBadge>
      </View>
      <View className="user-name-wrap">
        <Text className="user-name">{userName}</Text>
      </View>
    </View>
  );
}

export default UserInfo;
