import { ArtWork } from "../../types/art_work";
import { ActionTypes } from "../action_types";

export interface artworkListAction {
  type: ActionTypes.ARTWORKLIST_GET_REQUEST;
}
export interface artworkListActionSuccess {
  type: ActionTypes.ARTWORKLIST_GET_SUCCESS;
  payload: ArtWork[];
}
export interface artworkListActionFail {
  type: ActionTypes.ARTWORKLIST_GET_FAIL;
  payload: string;
}
