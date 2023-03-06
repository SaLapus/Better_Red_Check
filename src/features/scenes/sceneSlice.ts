import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import { DataTypes, DataManager, IData } from "../../api";

type Scenes = DataTypes | "menu";

// редусер изменения сцены
// асинхронный редусер изменения данных

export interface SceneState {
  name: Scenes;
  data: IData;
}

const initialState: SceneState = {
  name: "menu",
  data: undefined,
};

export const sceneSlice = createSlice({
  name: "scenes",
  initialState,
  reducers: {
    changeTo: (state, action: PayloadAction<Scenes>) => {
      state.name = action.payload;
      if (action.payload === "menu") return;
      state.data = DataManager.get(action.payload);
    },
    setData: (state, action: PayloadAction<IData>) => {
      state.data = action.payload;
    },
  },
});

export const { changeTo, setData } = sceneSlice.actions;

export const selectScene = (state: RootState) => state.scenes.name;
export const selectData = (state: RootState) => state.scenes.data;

export default sceneSlice.reducer;
