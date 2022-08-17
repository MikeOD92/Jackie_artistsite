import {
  loginAction,
  loginActionSuccess,
  loginActionFail,
  logoutAction,
} from "./authActions";

export type Action =
  | loginAction
  | loginActionFail
  | loginActionSuccess
  | logoutAction;
