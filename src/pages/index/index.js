import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtGrid } from "taro-ui";
import "./index.less";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "小目标"
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="home">
        <AtGrid
        hasBorder={true}
        columnNum={2}
          data={[
            // {
            //   image: require("../../assets/icons/task.png"),
            //   value: "流水账"
            // },
            // {
            //   image: require("../../assets/icons/bill.png"),
            //   value: "账本"
            // },
            {
              image: require("../../assets/icons/think.png"),
              value: "开发中"
            },
            {
              image: require("../../assets/icons/think.png"),
              value: "开发中"
            },
          ]}
        />
      </View>
    );
  }
}
