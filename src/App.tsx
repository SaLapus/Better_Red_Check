import React from "react";
import "./App.css";
import { useAppSelector } from "./app/hooks";
import { selectScene } from "./features/scenes/sceneSlice";
import { Menu } from "./features/scenes/Menu/Menu";
import { RedLastUpdate } from "./features/scenes/RedLastUpdate/RedLastUpdate";

function App() {
  const scene = useAppSelector(selectScene);
  let component: JSX.Element;

  switch (scene) {
    case "menu":
      component = <Menu sceneName="menu" />;
      break;
    case "red_last_update":
      component = <RedLastUpdate sceneName="red_last_update" />;
      break;
    default:
      component = <Menu sceneName="menu" />;
  }

  return <div>{component}</div>;
}

export default App;
