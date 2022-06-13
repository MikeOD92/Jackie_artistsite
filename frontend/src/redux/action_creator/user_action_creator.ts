import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action_types";
import { Action } from "../actions";

export const createUser = (
  email: string,
  newuserpass: string,
  token: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.USER_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post(
        "/api/register",
        {
          email: email,
          password: newuserpass,
        },
        config
      );
      dispatch({
        type: ActionTypes.USER_CREATE_SUCCESS,
        payload: "Success",
      });
    } catch (err: any) {
      console.error(err);
      dispatch({
        type: ActionTypes.USER_CREATE_FAIL,
        payload: err.message,
      });
    }
  };
};

export const updatePassword = (
  password: string,
  confirm_password: string,
  token: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.USER_EDIT_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.put(
        "/api/auth/password",
        {
          password: password,
          password_confirm: confirm_password,
        },
        config
      );
      dispatch({
        type: ActionTypes.USER_EDIT_SUCCESS,
        payload: "Success",
      });
    } catch (err: any) {
      console.error(err);
      dispatch({
        type: ActionTypes.USER_EDIT_FAIL,
        payload: err.message,
      });
    }
  };
};
