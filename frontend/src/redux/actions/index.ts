import {
  loginAction,
  loginActionSuccess,
  loginActionFail,
  logoutAction,
} from "./authActions";

<<<<<<< HEAD
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

=======
>>>>>>> parent of 9a4e4fa... setting up redux for siteData
export type Action =
  | loginAction
  | loginActionFail
  | loginActionSuccess
<<<<<<< HEAD
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
=======
  | logoutAction;
>>>>>>> parent of 9a4e4fa... setting up redux for siteData
