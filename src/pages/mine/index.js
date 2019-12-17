import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtMessage } from "taro-ui";
import { connect } from "@tarojs/redux";
import UserInfo from "../../components/mine/UserInfo";
import ActionList from "../../components/mine/ActionList";
import request from "../../utils/request";

@connect(({ global }) => ({
  global
}))
export default class Mine extends Component {
  state = {};

  componentDidShow() {
    const userInfo = Taro.getStorageSync("userInfo");
    if (userInfo) {
      request("/user/queryDetail", { userId: userInfo.userId }, "GET");
    } else {
      this.props.dispatch({
        type: "global/changeLoginState",
        payload: false
      });
    }
  }

  render() {
    return (
      <View className="mine">
        <UserInfo isLogin={this.props.global.isLogin} />
        <ActionList />
        <AtMessage />
      </View>
    );
  }
}
