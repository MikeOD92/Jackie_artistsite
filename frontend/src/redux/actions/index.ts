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
  artworkListAction,
  artworkListActionSuccess,
  artworkListActionFail,
} from "./artworkListActions";
import {
  artworkGetAction,
  artworkGetActionSuccess,
  artworkGetActionFail,
  artworkCreateAction,
  artworkCreateActionSuccess,
  artworkCreateActionFail,
  artworkEditAction,
  artworkEditActionSuccess,
  artworkEditActionFail,
  artworkDeleteAction,
  artworkDeleteActionSuccess,
  artworkDeleteActionFail,
} from "./artworkActions";

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
  | artworkListAction
  | artworkListActionSuccess
  | artworkListActionFail
  | artworkGetAction
  | artworkGetActionSuccess
  | artworkGetActionFail
  | artworkCreateAction
  | artworkCreateActionSuccess
  | artworkCreateActionFail
  | artworkEditAction
  | artworkEditActionSuccess
  | artworkEditActionFail
  | artworkDeleteAction
  | artworkDeleteActionSuccess
  | artworkDeleteActionFail;
