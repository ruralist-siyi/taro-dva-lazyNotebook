import { useState } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtList, AtListItem, AtToast, AtModal } from "taro-ui";
import {dispatch} from "../../utils/dva";
import request from "../../utils/request";
import "./index.less";

function ActionList() {
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  const [toastOpenStatus, setOpenStatus] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [toastIcon, setToastIcon] = useState(null);

  const goCreateObjective = () => {
    Taro.redirectTo({ url: "../objective/add" });
  };

  const logout = () => {
    request("/user/logout", {}, "DELETE", true).then(() => {
      setToastMsg("退出成功");
      setToastIcon("check");
      setOpenStatus(true);
      Taro.setStorageSync("userInfo", null);
      dispatch({
        type: "global/changeLoginState",
        payload: false
      });
      Taro.reLaunch({ url: "/pages/mine/index" });
    });
  };

  const openLogoutConfirm = () => {
    const userInfo = Taro.getStorageSync("userInfo");
    if (!userInfo) {
      setToastMsg("您还未登录");
      setToastIcon(null);
      setOpenStatus(true);
      return;
    }
    setModalOpenStatus(true);
  };

  const handleConfirm = () => {
    logout();
    setModalOpenStatus(false);
  };

  return (
    <View className="action-list">
      <AtList hasBorder={false}>
        <AtListItem
          onClick={goCreateObjective}
          thumb={require("../../assets/icons/target.png")}
          arrow="right"
          title="建小目标"
        />
        <AtListItem thumb={require("../../assets/icons/notebook.png")} arrow="right" title="记小本本" />
        <AtListItem
          onClick={openLogoutConfirm}
          thumb={require("../../assets/icons/exit.png")}
          arrow="right"
          title="退出登录"
        />
      </AtList>
      <AtToast
        duration={1500}
        isOpened={toastOpenStatus}
        text={toastMsg}
        icon={toastIcon}
      ></AtToast>
      <AtModal
        isOpened={modalOpenStatus}
        title="退出登录"
        cancelText="取消"
        confirmText="确认"
        // onClose={this.handleClose}
        // onCancel={this.handleCancel}
        onConfirm={handleConfirm}
        content="确认要退出登录？"
      />
    </View>
  );
}

export default ActionList;
