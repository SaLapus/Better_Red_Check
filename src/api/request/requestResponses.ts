export interface IProjectMetaRequestResponse {
  data: {
    projects: {
      totalPages: number;
      totalElements: number;
    };
  };
}

export interface IProjectRequestResponse {
  data: {
    projects: IProjects;
  };
}

export interface IProjects {
  totalPages: number;
  totalElements: number;
  content: IProjectContent[];
}

export interface IProjectContent {
  id: number;
  title: string;

  translationStatus: string;

  volumes: {
    content: IVolumeContent[];
  };
}

export interface IVolumeContent {
  id: number;
  title: string;
  shortName: string;

  fullUrl: string;

  chapters: Array<{
    id: string;
    volumeId: number;
    title: string;
    publishDate: string;
  }>;

  staff: Array<{
    nickname: string;
    activityName: string;
  }>;
}
