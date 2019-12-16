import Taro, { useState } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtList, AtListItem, AtSwipeAction } from "taro-ui";

function ObjectiveListItem({deleteObjective}) {
  const deleteItem = (e) => {
    if(e.text === '删除') {
      this.props.deleteObjective();
    }
  };

  return (
    <AtSwipeAction
      onClick={deleteItem}
      autoClose={true}
      options={[
        {
          text: "取消",
          style: {
            backgroundColor: "#FF4949"
          },
        },
        {
          text: "删除",
          style: {
            backgroundColor: "#6190E8"
          }
        }
      ]}
    >
      <AtListItem
        arrow="right"
        note="描述信息"
        title="标题文字标题文字标题文字标题文字标题文字"
        extraText="详细信息详细信息详细信息详细信息"
        thumb={require("../../assets/icons/lindang-colorful.png")}
      />
    </AtSwipeAction>
  );
}

export default ObjectiveListItem;
