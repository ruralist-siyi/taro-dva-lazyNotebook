import request from '../utils/request';

export default {
  namespace: "user",
  state: {
    userInfo: null
  },
  reducers: {
    setUserInfo(state, { payload }) {
      return { ...state, userInfo: payload };
    }
  },
  effects: {
    *login({ payload }, { all, call, put }) {
      const data = yield call(request, '/user/login', payload, 'POST', false);
    }
  }
};
