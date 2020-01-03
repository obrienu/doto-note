import { ADD_TASK, GET_TASK, DELETE_TASK, SET_ERROR } from "./task.types";
import uuid from "uuid";

const INITIAL_STATE = {
  tasks: [],
  loading: true,
  error: ""
};

const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASK:
      return {
        ...state,
        tasks: [...action.payload],
        loading: false
      };
    case DELETE_TASK:
      const newTasks = state.tasks.filter(task => task._id !== action.payload);
      return {
        ...state,
        tasks: [...newTasks]
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [{ ...action.payload, id: uuid() }, ...state.tasks]
      };
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default taskReducer;
