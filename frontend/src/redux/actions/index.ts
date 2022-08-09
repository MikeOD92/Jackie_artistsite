import {
  loginAction,
  loginActionSuccess,
  loginActionFail,
  logoutAction,
} from "./authActions";

import {
  pageDataRequestAction,
  pageDataSuccessAction,
  pageDataFailAction,
} from "./siteDataActions";

export type Action =
  | loginAction
  | loginActionFail
  | loginActionSuccess
  | logoutAction
  | pageDataRequestAction
  | pageDataSuccessAction
  | pageDataFailAction;
