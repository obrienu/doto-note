import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR
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
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(getError(err.response.data.msg, err.response.status));
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
      dispatch(clearError());
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
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
