import { CLEAR_ERRORS, GET_ERRORS } from "./error.types";

const INITIAL_STATE = {
  msg: {},
  status: null,
  id: null
};

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
};

export default errorReducer;
