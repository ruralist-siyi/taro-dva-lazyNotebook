import { View, Text } from '@tarojs/components';
import AddObjectiveForm from '../../components/objective/AddObjectiveForm';
import './index.less';
import { AtMessage } from 'taro-ui'

function AddObjective() {
  return (
  <View className="add-objective">
     <AddObjectiveForm />
     <AtMessage />
  </View>
  )
}

export default AddObjective;
