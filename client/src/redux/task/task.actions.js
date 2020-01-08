import { ADD_TASK, GET_TASK, DELETE_TASK, SET_ERROR } from "./task.types";
import axios from "axios";
import { getHeaderConfig } from "../user/user.utils";
import { getError } from "../errors/error.action";

export const getTask = () => (dispatch, getState) => {
  axios
    .get("api/todo", getHeaderConfig(getState))
    .then(res =>
      dispatch({
        type: GET_TASK,
        payload: res.data
      })
    )
    .catch(err => {
      getError(err.response.data.msg, err.response.status);
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    });
};

export const addTask = task => (dispatch, getState) => {
  axios
    .post("/api/todo", task, getHeaderConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_TASK,
        payload: res.data
      })
    )
    .catch(err => {
      getError(err.response.data.msg, err.response.status);
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    });
};

export const deleteTask = id => (dispatch, getState) => {
  axios
    .delete("/api/todo/" + id, getHeaderConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_TASK,
        payload: id
      })
    )
    .catch(err => {
      getError(err.response.data.msg, err.response.status);
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    });
};
