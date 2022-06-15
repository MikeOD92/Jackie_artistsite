import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action_types";
import { Action } from "../actions";

export const upload = (token: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.UPLOAD_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  };
};
