export default {
  namespace: "global",
  state: {
    isLogin: true
  },
  reducers: {
    changeLoginState(state, { payload }) {
      return { ...state, isLogin: payload };
    }
  },
  effects: {
    *test({ payload }, { all, call, put }) {
      console.log("payload", payload);
    }
  }
};
