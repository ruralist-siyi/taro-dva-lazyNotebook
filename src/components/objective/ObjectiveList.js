import Taro, { useState } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import {
  AtList,
  AtModal
} from "taro-ui";
import ObjectiveListItem from "./ObjectiveListItem";

import "./index.less";

function ObjectiveList() {
  const [modalVisible, setModalVisible] = useState(false);

  const deleteObjective = () => {
    setModalVisible(true);
  }
  return (
    <View>
      <AtList>
        <ObjectiveListItem
          deleteObjective={deleteObjective}
        />
      </AtList>
      <AtModal
        isOpened={modalVisible}
        title="标题"
        cancelText="取消"
        confirmText="确认"
        // onClose={ this.handleClose }
        // onCancel={ this.handleCancel }
        // onConfirm={ this.handleConfirm }
        content="欢迎加入京东凹凸实验室\n\r欢迎加入京东凹凸实验室"
      />
    </View>
  );
}

export default ObjectiveList;
