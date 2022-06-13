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
  | passwordUpdateActionSuccess;
