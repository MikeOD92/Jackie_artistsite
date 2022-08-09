import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action_types";
import { Action } from "../actions";

export const getArtworkList = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.ARTWORKLIST_REQUEST,
    });
    try {
      const { data } = await axios.get("/api/artwork");
      dispatch({
        type: ActionTypes.ARTWORKLIST_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: ActionTypes.ARTWORKLIST_FAIL,
        payload: err.message,
      });
    }
  };
};
