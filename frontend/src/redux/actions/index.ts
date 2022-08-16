import {
  loginAction,
  loginActionSuccess,
  loginActionFail,
  logoutAction,
} from "./authActions";
import {
  createUserAction,
  createUserActionFail,
  createUserActionSuccess,
  passwordUpdateAction,
  passwordUpdateActionFail,
  passwordUpdateActionSuccess,
} from "./userActions";
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
  | logoutAction
  | createUserAction
  | createUserActionFail
  | createUserActionSuccess
  | passwordUpdateAction
  | passwordUpdateActionFail
  | passwordUpdateActionSuccess
  | pageDataRequestAction
  | pageDataSuccessAction
  | pageDataFailAction
  | artworkListRequestAction
  | artworkListSuccessAction
  | artworkListFailAction
  | artworkEditRequestAction
  | artworkEditSuccessAction
  | artworkEditFailAction;
