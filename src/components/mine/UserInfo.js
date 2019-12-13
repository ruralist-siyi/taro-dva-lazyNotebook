import Taro,{ useState } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtAvatar, AtBadge } from "taro-ui";
import "./index.less";

function UserInfo() {
  const userInfo =  Taro.getStorageSync("userInfo");
  const [userName, setUserName] = useState("我才懒得记录");

  const handleClick = () => {
    if(userInfo) return;
    Taro.navigateTo({url: 'login'})
  }

  if(userInfo) {
    setUserName('懒宝-'+ userInfo.userName);
  }

  return (
    <View className="user-info">
      <View className="user-icon-wrap" onClick={handleClick}>
        {
          !userInfo ?
          <AtBadge value='点我登录'>
          <AtAvatar image={require("../../assets/icons/xiongmao.png")}></AtAvatar>
        </AtBadge> :  <AtAvatar image={require("../../assets/icons/xiongmao.png")}></AtAvatar>
        }
      </View>
      <View className="user-name-wrap">
        <Text className="user-name">{userName}</Text>
      </View>
    </View>
  );
}

export default UserInfo;
