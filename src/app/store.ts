import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import sceneReducer from "../features/scenes/sceneSlice";

export const store = configureStore({
  reducer: {
    scenes: sceneReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
