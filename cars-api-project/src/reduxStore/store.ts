import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./slices/carsSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
