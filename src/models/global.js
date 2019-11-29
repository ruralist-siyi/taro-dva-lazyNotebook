export default {
  namespace: "global",
  state: {},
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *test({ payload }, { all, call, put }) {
      console.log("payload", payload);
    }
  }
};
