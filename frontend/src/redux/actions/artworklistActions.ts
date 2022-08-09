import { ArtWork } from "../../types/art_work";
import { ActionTypes } from "../action_types";

export interface artworkListRequestAction {
  type: ActionTypes.ARTWORKLIST_REQUEST;
}
export interface artworkListSuccessAction {
  type: ActionTypes.ARTWORKLIST_SUCCESS;
  payload: Array<ArtWork>;
}
export interface artworkListFailAction {
  type: ActionTypes.ARTWORKLIST_FAIL;
  payload: string;
}
