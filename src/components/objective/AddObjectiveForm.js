import Taro, { useState } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtForm, AtButton, AtToast, AtRate, AtTextarea } from "taro-ui";
import dayjs from "dayjs";
import request from "../../utils/request";

import "./index.less";

function AddObjectiveForm() {
  const [startTime, setStartTime] = useState(dayjs().format("YYYY-MM-DD"));
  const [endTime, setEndTime] = useState("");
  const [grade, setGrade] = useState(1);
  const [content, setContent] = useState("");
  const [toastOpenStatus, setOpenStatus] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [toastIcon, setToastIcon] = useState(null);

  const addObjective = () => {

  };

  return (
    <View className="add-objective-form">
      <AtForm onSubmit={addObjective}>
        <View className="form-item">
          <Text className="left">选择开始时间</Text>
          <View>
            <Picker
              mode="date"
              onChange={e => {
                setStartTime(e.target.value);
              }}
            >
              <View className="right picker">{startTime}</View>
            </Picker>
          </View>
        </View>
        <View className="form-item">
          <Text className="left">选择结束时间</Text>
          <View>
            <Picker
              mode="date"
              onChange={e => {
                setEndTime(e.target.value);
              }}
            >
              <View className="right picker">{endTime || "请选择"}</View>
            </Picker>
          </View>
        </View>
        <View className="form-item">
          <Text className="left">重要程度</Text>
          <AtRate className="right" value={grade} onChange={setGrade} />
        </View>
        <View className="content">
          <Text className="content-title">小目标</Text>
          <View className="content-write">
          <AtTextarea
            value={content}
            onChange={setContent}
            maxLength={200}
            placeholder='懒东西，留下你的小目标...'
          />
          </View>
        </View>
        <AtButton className="primary-btn save-btn" circle={true} formType="submit">
          保存
        </AtButton>
      </AtForm>
      <AtToast isOpened={toastOpenStatus} text={toastMsg} icon={toastIcon}></AtToast>
    </View>
  );
}

export default AddObjectiveForm;
