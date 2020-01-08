import { combineReducers } from "redux";
import taskReducer from "./task/task.reducer";
import userReducer from "./user/user.reducer";
import errorReducer from "./errors/error.reducer";

const rootReducer = combineReducers({
  task: taskReducer,
  user: userReducer,
  error: errorReducer
});

export default rootReducer;
