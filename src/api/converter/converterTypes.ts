import { IProjectContent, IVolumeContent } from "../request/requestResponses";
import {
  RedactorLastUpdates,
  RedactorProjects,
  ProjectLastUpdate,
  ProjectInfo,
} from "./dataTypes";

export type ConverterTypesTable = {
  red_last_update: RedactorLastUpdates;
  red_projects: RedactorProjects;
  project_last_update: ProjectLastUpdate;
  project_info: ProjectInfo;
};

export type DataTypes = keyof ConverterTypesTable;

export type Converter<T extends DataTypes> = (
  dataMap: Map<string, ConverterTypesTable[T]>,
  p: IProjectContent,
  v: IVolumeContent
) => void;

export type ConverterTypes<T extends DataTypes> = {
  [K in T]: Converter<K>;
};

export type IData = ConverterTypesTable[DataTypes][] | undefined;
