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
  getPageDataAction,
  getPageDataActionFail,
  getPageDataActionSuccess,
  editPageDataAction,
  editPageDataActionFail,
  editPageDataActionSuccess,
} from "./pageDataActions";

export type Action =
  | loginAction
  | loginActionFail
  | loginActionSuccess
  | logoutAction
  | createUserAction
  | createUserActionFail
  | createUserActionSuccess
  | passwordUpdateAction
  | passwordUpdateActionFail
  | passwordUpdateActionSuccess
  | getPageDataAction
  | getPageDataActionFail
  | getPageDataActionSuccess
  | editPageDataAction
  | editPageDataActionFail
  | editPageDataActionSuccess;
