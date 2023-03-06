import { IProjects } from "../request/requestResponses";
import type {
  DataTypes,
  Converter,
  ConverterTypes,
  ConverterTypesTable,
  IData,
} from "./converterTypes";

export function convertToType(
  type: DataTypes,
  data: IProjects | undefined
): IData {
  const converters: ConverterTypes<DataTypes> = {
    red_last_update(redLU, project, volume) {
      for (const { nickname, activityName } of volume.staff) {
        if (activityName !== "Редактура" && activityName !== "Вычитка")
          continue;

        const datesOfChapters = volume.chapters
          .map((ch) => new Date(ch.publishDate))
          .filter((ch) => ch.getTime() > 0);

        if (datesOfChapters.length === 0) continue;

        // Date of last update of volume

        const dateVolumeLU = datesOfChapters
          .reduce((prev, cur) => {
            return prev > cur ? prev : cur;
          })
          .getTime();

        const red = redLU.get(nickname);

        if (!red) {
          // init redactor entry

          redLU.set(nickname, {
            nickname,
            key: `${nickname}_${project.id}_${volume.id}`,
            project_title: project.title,
            volume_title: volume.shortName,
            activityName: activityName,
            date: dateVolumeLU,
          });
        } else {
          if (red.date < dateVolumeLU) {
            Object.assign(red, {
              key: `${nickname}_${project.id}_${volume.id}`,
              project_title: project.title,
              volume_title: volume.title,
              activityName: activityName,
              date: dateVolumeLU,
            });
          }
        }
      }

      return;
    },

    red_projects: (p, v) => {
      return;
    },
    project_last_update: (p, v) => {
      return;
    },
    project_info: (p, v) => {
      return;
    },
  };

  if (!data) return;

  const convert = converters[type];

  const dataMap: Map<string, ConverterTypesTable[typeof type]> = new Map();

  for (const project of data.content) {
    for (const volume of project.volumes.content) {
      (convert as Converter<typeof type>)(dataMap, project, volume);
    }
  }

  return [...dataMap.values()];
}
