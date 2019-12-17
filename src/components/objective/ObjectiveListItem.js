import Taro, { useState } from "@tarojs/taro";
import { AtListItem, AtSwipeAction, AtRate } from "taro-ui";

function ObjectiveListItem({deleteObjective, setTop, info}) {

  const handleClick = (e) => {
    if(e.text === '删除') {
      deleteObjective(e.id);
    }
    if(e.text === '置顶') {
      setTop(e.id);
    }
  };

  return (
    <AtSwipeAction
      onClick={handleClick}
      autoClose={true}
      options={[
        {
          text: "删除",
          id: info && info.id,
          style: {
            backgroundColor: "#FF4949"
          },
        },
        {
          text: "置顶",
          id: info && info.id,
          style: {
            backgroundColor: "#6190E8"
          }
        }
      ]}
    >
      <AtListItem
        arrow="right"
        note={info && info.note}
        title={info && info.title}
        thumb={(info && info.isTop) ? require("../../assets/icons/top-lindang.png"):require("../../assets/icons/lindang-colorful.png")}
      />
    </AtSwipeAction>
  );
}

export default ObjectiveListItem;
