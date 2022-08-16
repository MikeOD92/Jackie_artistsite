import { ArtWork } from "../../types/art_work";
import { ActionTypes } from "../action_types";

/// get single artwork
export interface artworkGetAction {
  type: ActionTypes.ARTWORK_GET_REQUEST;
}
export interface artworkGetActionSuccess {
  type: ActionTypes.ARTWORK_GET_SUCCESS;
  payload: ArtWork;
}
export interface artworkGetActionFail {
  type: ActionTypes.ARTWORK_GET_FAIL;
  payload: string;
}
