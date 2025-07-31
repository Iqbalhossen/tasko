import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AllMiddleware, rootReducers } from "./rootReducers";

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...AllMiddleware),
  devTools: true,
});

setupListeners(store.dispatch);
