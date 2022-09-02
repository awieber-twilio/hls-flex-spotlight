import { combineReducers } from "redux";
import { reduce as CustomPanel2Reducer } from "./CustomPanel2State";
import { reduce as VideoButtonReducer } from "./VideoButtonState";
import { reduce as TaskReducer } from "./TaskState";
// Register your redux store under a unique namespace
export const namespace = "hls-emr";

export const fetchingState = {
  fetching: false,
  fetchingFailed: false,
  fetchingSuccess: false,
};

// Combine the reducers
export default combineReducers({
  customPanel2: CustomPanel2Reducer,
  taskState: TaskReducer,
  videoButton: VideoButtonReducer,
});
