import Taro, { useState, useEffect } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtFab, AtMessage } from "taro-ui";
import ObjectiveList from "../../components/objective/ObjectiveList";
import request from "../../utils/request";

function Objective() {
  const [data, setData] = useState({
    count: 0,
    rows: []
  });

  const addObjective = () => {
    Taro.navigateTo({ url: "add" });
  };

  const fetchData = () => {
    request("/objective/queryForPage", { page: 1, size: 10 }, "GET").then(data => {
      if (data) {
        setData(data);
      }
    });
  };

  useEffect(() => {
    const userInfo = Taro.getStorageSync("userInfo");
    if (userInfo) {
      fetchData();
    }
  }, []);

  return (
    <View className="objective">
      {data.rows && data.rows.length > 0 ? (
        <ObjectiveList data={data} fetchData={fetchData}/>
      ) : (
        <View className="no-content-wrap">
          <Image
            style="width: 100%;background: #fff;"
            src={require("../../assets/icons/no-content.jpg")}
          ></Image>
        </View>
      )}

      <View className="float-btn-wrap">
        <AtFab onClick={addObjective}>
          <Text className="at-fab__icon at-icon at-icon-add"></Text>
        </AtFab>
      </View>
      <AtMessage />
    </View>
  );
}

Objective.config = {
  navigationBarTitleText: "小目标"
};

export default Objective;
