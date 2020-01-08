import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  ADD_NOTE,
  LOADING_NOTE,
  NOTES_LOADED
} from "./user.type";

import axios from "axios";
import { getError, clearError } from "../errors/error.action";
import { getHeaderConfig } from "./user.utils";

export const getUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  });

  //const config = getHeaderConfig(getState);
  axios
    .get("/api/user", getHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      getError(err.response.data, err.response.status);

      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const registerUser = ({ password, cpassword, email, name }) => (
  dispatch,
  getState
) => {
  const config = getHeaderConfig(getState);
  const body = {
    name,
    email,
    password,
    cpassword
  };
  axios
    .post("/api/user/register", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(clearError());
    })
    .catch(err => {
      dispatch(
        getError(err.response.data, err.response.status, "Registration Failed")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const userLogin = ({ email, password }) => (dispatch, getState) => {
  const config = getHeaderConfig(getState);
  const body = { email, password };

  axios
    .post("/api/user/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(clearError());
    })
    .catch(err => {
      dispatch(
        getError(err.response.data.msg, err.response.status, "Login Failed")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const userLogout = () => dispatch => {
  dispatch(clearError());
  dispatch({
    type: LOGOUT_SUCCESS
  });
};

export const addNote = task => (dispatch, getState) => {
  dispatch({
    type: LOADING_NOTE
  });
  axios
    .post(`/api/user/posts`, task, getHeaderConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_NOTE,
        payload: res.data
      })
    )
    .catch(err => {
      getError(err.response.data.msg, err.response.status, "ADD NOTE ERROR");
    });
};

export const getNotes = () => (dispatch, getState) => {
  dispatch({
    type: LOADING_NOTE
  });
  axios
    .get(`/api/user/posts`, getHeaderConfig(getState))
    .then(res =>
      dispatch({
        type: NOTES_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      getError(err, 400, "GET NOTE ERROR");
    });
};

export const deleteNotes = noteId => (dispatch, getState) => {
  dispatch({
    type: LOADING_NOTE
  });
  axios
    .delete(`/api/user/posts/` + noteId, getHeaderConfig(getState))
    .then(res =>
      dispatch({
        type: NOTES_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      getError(err.response.data.msg, err.response.status, "DELETE NOTE ERROR");
    });
};

export const editNote = (noteId, note) => (dispatch, getState) => {
  dispatch({
    type: LOADING_NOTE
  });
  axios
    .patch(`/api/user/posts/` + noteId, note, getHeaderConfig(getState))
    .then(res =>
      dispatch({
        type: NOTES_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      getError(err.response.data.msg, err.response.status, "EDIT NOTE ERROR");
    });
};
