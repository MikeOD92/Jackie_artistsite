import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  reducers,
  {
    // user: { loading: false, error: null, access_key: "" },
    // register: { loading: false, error: null, success: "" },
    // update: { loading: false, error: null, success: "" },
    // artworkList: { loading: false, error: null, data: [] },
    // artwork: { loading: false, error: null, data: null },
    // siteData: {
    //   loading: false,
    //   error: null,
    //   data: undefined,
    // },
  },
  composeWithDevTools(applyMiddleware(thunk))
);
