import { combineReducers } from "redux";
import taskReducer from "./task/task.reducer";

const rootReducer = combineReducers({
  task: taskReducer
});

export default rootReducer;
