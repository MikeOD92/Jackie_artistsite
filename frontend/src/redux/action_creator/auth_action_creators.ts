import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action_types";
import { Action } from "../actions";

export const login = (user: string, pass: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.LOGIN_REQUEST,
    });
    try {
      const { data } = await axios.post("/api/auth/login", {
        username: user,
        password: pass,
      });
      localStorage.setItem("access_key", `${data.access}`);
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: data.token,
      });
    } catch (err: any) {
      console.error(err);
      dispatch({
        type: ActionTypes.LOGIN_FAIL,
        payload: err.message,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<Action>) => {
    localStorage.removeItem("access_key");
    dispatch({
      type: ActionTypes.LOGOUT,
    });
  };
};
