import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { changeTo } from "../sceneSlice";

interface MenuProps {
  sceneName: "menu";
}

export function Menu(props: MenuProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="Menu">
      <header className="Menu-header">
        <h1>Редакторы RuRanobe</h1>
        <span>
          <span>Вход: </span>
          <input type={"text"} />
        </span>

        <div>
          <button onClick={() => dispatch(changeTo("red_last_update"))}>Редакторы</button>
          <button>Проекты</button>
          <button>Статистика</button>
        </div>
      </header>
    </div>
  );
}
