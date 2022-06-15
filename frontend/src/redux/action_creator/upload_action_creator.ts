import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action_types";
import { Action } from "../actions";

export const upload = (token: string, files: FileList) => {
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
    try {
      if (!files) return;
      let fileList = new FormData();

      for (let i = 0; i < files.length; i++) {
        fileList.append("image", files[i]);
      }
      const { data } = await axios.post("/api/upload", fileList, config);
      dispatch({
        type: ActionTypes.UPLOAD_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      console.error(err);
      dispatch({
        type: ActionTypes.UPLOAD_FAIL,
        payload: err.message,
      });
    }
  };
};
