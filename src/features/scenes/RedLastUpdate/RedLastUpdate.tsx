import React from "react";

import { useAppSelector } from "../../../app/hooks";
import { ConverterTypesTable } from "../../../api/converter/converterTypes";
import { selectData } from "../sceneSlice";
import ContentTable from "../../ContentTable/ContentTable";

interface ComponentProps {
  sceneName: "red_last_update";
}

export function RedLastUpdate(props: ComponentProps) {
  const data = useAppSelector(
    selectData
  ) as ConverterTypesTable[ComponentProps["sceneName"]][];

  return (
    data && (
      <div>
        <ContentTable
          columns={[
            { title: "Никнейм", field: "nickname" },
            { title: "Проект", field: "project_title" },
            { title: "Том", field: "volume_title" },
            { title: "Роль", field: "activityName" },
            {
              title: "Последнее обновление",
              field: "date",
              sorting: true,
              defaultSort: "desc",
              cellDataConverter: (time) => new Date(time).toLocaleDateString(),
            },
          ]}
          data={data}
        />
      </div>
    )
  );
}
