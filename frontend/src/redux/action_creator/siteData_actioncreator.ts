import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action_types";
import { Action } from "../actions";

export const fetchData = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.PAGEDATA_REQUEST,
    });
    try {
      const { data } = await axios.get("/api/site-data");
      dispatch({
        type: ActionTypes.PAGEDATA_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: ActionTypes.PAGEDATA_FAIL,
        payload: err.message,
      });
    }
  };
};
