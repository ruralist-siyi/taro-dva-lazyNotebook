import { create } from "dva-core";
import { createLogger } from "redux-logger";
import createLoading from "dva-loading";
import models from "../models";


let app;
let store;
let dispatch;

function createApp(opt) {
  opt.onAction = [createLogger()];
  app = create(opt);
  app.use(createLoading({}));

  if (!global.registered) opt.models.forEach(model => app.model(model));
  global.registered = true;
  app.start();
  store = app._store;
  app.getStore = () => store;

  dispatch = store.dispatch;

  app.dispatch = dispatch;
  console.log(app);
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  }
};

export {store, dispatch};
// const dvaApp = createApp({
//   initialState: {},
//   models: models,
//   onError(e, dispatch) {
//     console.log(e);
//     // dispatch(action("sys/error", e));
//   }
// });

// dvaApp.getDispatch = function() {
//   return app.dispatch;
// }

// export default dvaApp;
