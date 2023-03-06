import { store } from "../app/store";
import { selectScene, setData } from "../features/scenes/sceneSlice";
import { convertToType } from "./converter/convert";
import { DataTypes } from "./converter/converterTypes";
import getProjects from "./request/request";
import { IProjects } from "./request/requestResponses";

class UpdateListener {
  private listeners: Array<() => void> = [];

  on(event: "update", cb: () => void) {
    this.listeners.push(cb);
  }

  emit(_event: "update") {
    this.listeners.forEach((cb) => cb());
  }
}

class DataWatcher extends UpdateListener {
  data?: IProjects;

  constructor() {
    super();
    this.uploadData();

    setInterval(() => this.uploadData(), 5 * 60_000);
  }

  async uploadData() {
    const data = await getProjects();

    if (data) {
      this.data = data;
      this.emit("update");
    }
  }
}

export const DataManager = (() => {
  const watcher = new DataWatcher();

  watcher.on("update", () => {
    const currentScene = selectScene(store.getState());

    if (currentScene === "menu") return;

    store.dispatch(setData(convertToType(currentScene, watcher.data)));
  });

  return {
    get(type: DataTypes) {
      return convertToType(type, watcher.data);
    },
  };
})();
