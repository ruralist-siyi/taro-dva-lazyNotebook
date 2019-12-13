import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import Index from './pages/index'
import dva from './utils/dva'
import models from './models'
import 'taro-ui/dist/style/index.scss'
import './app.less'
import { AtMessage } from 'taro-ui'

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
    // dispatch(action("sys/error", e));
  },
});

const store = dvaApp.getStore();


class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/mine/index',
      'pages/objective/index',
      'pages/mine/login',
      'pages/objective/add',
    ],
    window: {
      navigationBarTitleText: '懒得记',
      navigationBarBackgroundColor: '#0876e4',
      enablePullDownRefresh: true
    },
    tabBar: {
      backgroundColor: '#fafafa',
      position: 'bottom',
      borderStyle: 'white',
      color: '#8499a5',
      selectedColor: '#007afb',
      list: [
        {
          pagePath: 'pages/objective/index',
          iconPath: './assets/icons/-maotouying.png',
          selectedIconPath: './assets/icons/-maotouying.png',
          text: '小目标'
        },
        {
          pagePath: 'pages/index/index',
          iconPath: './assets/icons/jiqimao.png',
          selectedIconPath: './assets/icons/jiqimao.png',
          text: '小本本'
        },
        {
          pagePath: 'pages/mine/index',
          iconPath: './assets/icons/Artboard.png',
          selectedIconPath: './assets/icons/Artboard.png',
          text: '本宝宝'
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
         <Index />
         <AtMessage />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
