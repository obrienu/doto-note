import { ADD_TASK, GET_TASK, DELETE_TASK, SET_ERROR } from "./task.types";
import axios from "axios";

export const getTask = () => dispatch => {
  axios
    .get("api/todo")
    .then(res =>
      dispatch({
        type: GET_TASK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: SET_ERROR,
        payload: err
      })
    );
};

export const addTask = task => dispatch => {
  axios
    .post("/api/todo", task)
    .then(res =>
      dispatch({
        type: ADD_TASK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: SET_ERROR,
        payload: err
      })
    );
};

export const deleteTask = id => dispatch => {
  axios
    .delete("/api/todo/" + id)
    .then(res =>
      dispatch({
        type: DELETE_TASK,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: SET_ERROR,
        payload: err
      })
    );
};
