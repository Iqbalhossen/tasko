import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/slices/authSlice/authSlice";
import { UserAuthApi } from "./services/UserAuthApi/UserAuthApi";
import { TaskApi } from "./services/TaskApi/TaskApi";

export const rootReducers = combineReducers({
  auth: authReducer,

  ////// User Auth api call
  [UserAuthApi.reducerPath]: UserAuthApi.reducer,

  // //////Task api call
  [TaskApi.reducerPath]: TaskApi.reducer,
 
});

export const AllMiddleware = [
  UserAuthApi.middleware,
  TaskApi.middleware,
];
