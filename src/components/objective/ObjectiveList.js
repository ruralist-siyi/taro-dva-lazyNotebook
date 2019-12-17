import { useState } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtModal, AtToast } from "taro-ui";
import ObjectiveListItem from "./ObjectiveListItem";
import request from "../../utils/request";
import dayjs from 'dayjs';

import "./index.less";

function ObjectiveList({ data, fetchData }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [handleType, setHandleType] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [toastStatus, setToastStatus] = useState(false);
  const [toastContent, setToastContent] = useState('');
  const [toastIcon, setToastIcon] = useState('check');
  const [confirmContent, setConfirmContent] = useState('');

  const deleteObjective = id => {
    setCurrentId(id);
    setConfirmContent("确认是否删除此目标 ？");
    setModalVisible(true);
    setHandleType('delete');
  };

  const setTop = id => {
    setCurrentId(id);
    setConfirmContent("确认是否置顶此目标 ？");
    setModalVisible(true);
    setHandleType('setTop');
  }

  const handleConfirm = () => {
    console.log(11111);
    if(handleType === 'delete') {
      request("/objective/delete", { objectiveId: currentId }, "DELETE").then(() => {
        setModalVisible(false);
        setToastStatus(true);
        setToastContent('删除成功');
        fetchData();
      });
    }else if(handleType === 'setTop') {
      request("/objective/setTop", { objectiveId: currentId }, "POST").then(() => {
        setModalVisible(false);
        setToastStatus(true);
        setToastContent('置顶成功');
        fetchData();
      });
    }
  };

  const toastClose = () => {
    setToastStatus(false);
  }

  return (
    <View>
      <AtList>
        {data &&
          data.rows &&
          data.rows.map(item => {
            return (
              <ObjectiveListItem
                key={item.objectiveId}
                info={{
                  title: item.content,
                  note: '持续时间:  ' + dayjs(item.startTime).format("YYYY-MM-DD") + ' ~ ' + dayjs(item.endTime).format("YYYY-MM-DD"),
                  id: item.objectiveId,
                  weight: item.weight,
                  isTop: item.isTop
                }}
                deleteObjective={deleteObjective}
                setTop={setTop}
              />
            );
          })}
      </AtList>
      <AtModal
        isOpened={modalVisible}
        cancelText="取消"
        confirmText="确认"
        onCancel={() => setModalVisible(false)}
        onConfirm={handleConfirm}
        content={confirmContent}
      />
       <AtToast onClose={toastClose} duration={1500} isOpened={toastStatus} text={toastContent} icon={toastIcon}></AtToast>
    </View>
  );
}

export default ObjectiveList;
