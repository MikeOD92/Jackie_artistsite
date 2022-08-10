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

import {
  artworkListRequestAction,
  artworkListSuccessAction,
  artworkListFailAction,
  artworkEditRequestAction,
  artworkEditSuccessAction,
  artworkEditFailAction,
} from "./artworklistActions";

export type Action =
  | loginAction
  | loginActionFail
  | loginActionSuccess
  | logoutAction
  | pageDataRequestAction
  | pageDataSuccessAction
  | pageDataFailAction
  | artworkListRequestAction
  | artworkListSuccessAction
  | artworkListFailAction
  | artworkEditRequestAction
  | artworkEditSuccessAction
  | artworkEditFailAction;
