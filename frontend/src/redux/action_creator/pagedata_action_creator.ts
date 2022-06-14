import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../action_types";
import { Action } from "../actions";
import { SiteData } from "../../types/site_data";

export const getPageData = (pageName: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.PAGEDATA_GET_REQUEST,
    });
    try {
      const { data } = await axios.get("/api/site-data");
      const pageData = data.filter((item: SiteData) => item.name === pageName);
      dispatch({
        type: ActionTypes.PAGEDATA_GET_SUCCESS,
        payload: pageData,
      });
    } catch (err: any) {
      console.error(err);
      dispatch({
        type: ActionTypes.PAGEDATA_GET_FAIL,
        payload: err.message,
      });
    }
  };
};

export const editPageData = (
  token: string,
  id: string,
  text: string,
  splash: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.PAGEDATA_EDIT_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const updatedBody: SiteData = await axios.put(
        `/api/site-data/edit/${id}`,
        { text: text, splash: splash },
        config
      );
      dispatch({
        type: ActionTypes.PAGEDATA_EDIT_SUCCESS,
        payload: updatedBody,
      });
    } catch (err: any) {
      console.error(err);
      dispatch({
        type: ActionTypes.PAGEDATA_EDIT_FAIL,
        payload: err.message,
      });
    }
  };
};
